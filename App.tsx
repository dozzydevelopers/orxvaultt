

import React, { useState, useEffect, useMemo } from 'react';
import type { Nft, User, Collection, SiteSettings, Category } from './types';
import { getCategories } from './services/categoryService';
import { getNfts } from './services/nftService';
import { getCollections } from './services/collectionService';
import { getUsers } from './services/userService';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import NftDetailPage from './pages/NftDetailPage';
import CreatePage from './pages/CreatePage';
import ProfilePage from './pages/ProfilePage';
import CreatorProfilePage from './pages/CreatorProfilePage';
import TeamPage from './pages/TeamPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import HelpPage from './pages/HelpPage';
import AuctionPage from './pages/AuctionPage';
import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminLayout';
import CollectionsPage from './pages/CollectionsPage';
import CollectionDetailPage from './pages/CollectionDetailPage';
import StatsPage from './pages/StatsPage';
import ExhibitionsPage from './pages/ExhibitionsPage';
import CreateSuccessPage from './pages/CreateSuccessPage';
import Notification from './components/Notification';
import { NotificationProvider, useNotification } from './contexts/NotificationContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { navigateTo } from './services/utils';
import CategoryPage from './pages/CategoryPage';
import HomePageSkeleton from './pages/HomePageSkeleton';
import MarketplacePageSkeleton from './pages/MarketplacePageSkeleton';
import DetailPageSkeleton from './pages/DetailPageSkeleton';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import ChatWidget from './components/ChatWidget';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import VerifyEmailPage from './pages/auth/VerifyEmailPage';

const AppContent: React.FC = () => {
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
      mintingFee: 0.05,
      listingFee: 0.02,
      salesFeePercent: 15,
      promoBanner: {
          title: "Secure & Trade Premier Digital Assets",
          subtitle: "Explore the vault of the most exclusive digital collections.",
          buttonText: "Get Started",
          link: "/marketplace",
          imageUrl: "web/images/banner/promo-banner.webp"
      },
      socialLinks: {
          twitter: "#",
          discord: "#"
      }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [route, setRoute] = useState(window.location.pathname);
  const { user: currentUser, logout } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [searchQuery, setSearchQuery] = useState('');
  const { showNotification } = useNotification();
  
  const [dataVersion, setDataVersion] = useState(0);
  const refreshData = () => setDataVersion(v => v + 1);

  useEffect(() => {
    const handlePopState = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch all data from API endpoints.
            const [fetchedNfts, fetchedCategories, fetchedCollections, fetchedUsers] = await Promise.all([
                getNfts(),
                getCategories(),
                getCollections(),
                getUsers(),
            ]);

            const userMap = new Map(fetchedUsers.map(u => [u.id.toLowerCase(), u]));
            const augmentedNfts = fetchedNfts.map(nft => {
                const creator = userMap.get(nft.creator.toLowerCase());
                const owner = userMap.get(nft.owner.toLowerCase());
                return {
                    ...nft,
                    creatorUsername: creator?.username,
                    creatorAvatar: creator?.avatarUrl,
                    ownerUsername: owner?.username,
                    isVerified: creator?.isVerified || nft.isVerified,
                };
            });

            setNfts(augmentedNfts);
            setCategories(fetchedCategories);
            setUsers(fetchedUsers);
            setCollections(fetchedCollections);

        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Failed to load app data from the server.';
            setError(errorMessage);
            showNotification(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };
    loadData();
  }, [dataVersion, showNotification]);
  
  useEffect(() => {
    const body = document.body;
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(theme === 'light' ? 'light-theme' : 'dark-theme');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));

  const onSignOut = () => {
    logout();
    navigateTo('/');
  };

  const onMintSuccess = () => {
    refreshData();
    navigateTo('/create-success');
  };

  const memoizedData = useMemo(() => {
      const searchFilteredNfts = searchQuery
          ? nfts.filter(nft =>
                nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (nft.creatorUsername || '').toLowerCase().includes(searchQuery.toLowerCase())
            )
          : nfts;
          
      const groupedNfts = searchFilteredNfts.reduce((acc, nft) => {
          (acc[nft.category] = acc[nft.category] || []).push(nft);
          return acc;
      }, {} as Record<string, Nft[]>);

      const auctionNfts = searchFilteredNfts.filter(nft => nft.isAuction);
      
      const userNfts = currentUser ? searchFilteredNfts.filter(nft => nft.owner.toLowerCase() === currentUser.id.toLowerCase()) : [];
      const userCreatedNfts = currentUser ? searchFilteredNfts.filter(nft => nft.creator.toLowerCase() === currentUser.id.toLowerCase()) : [];
      const userCollections = currentUser ? collections.filter(collection => collection.creator.toLowerCase() === currentUser.id.toLowerCase()) : [];
      
      const adminStats = {
          nfts: nfts.length,
          collections: collections.length,
          users: users.length,
          totalVolume: nfts.reduce((sum, nft) => sum + nft.priceEth, 0)
      };

      return { augmentedNfts: nfts, searchFilteredNfts, groupedNfts, auctionNfts, userNfts, userCreatedNfts, userCollections, adminStats };
  }, [nfts, users, collections, searchQuery, currentUser]);


  const renderContent = () => {
      if (loading) {
          if (route === '/') return <HomePageSkeleton />;
          if (route === '/marketplace') return <MarketplacePageSkeleton />;
          if (route.startsWith('/asset/')) return <DetailPageSkeleton />;
          return <div className="pt-20 text-center">Loading...</div>;
      }
      if (error && route !== '/signin' && route !== '/signup') return <div className="pt-20 text-center text-red-500">{error}</div>;
      
      // Handle Auth Routes
      if (route === '/signin') return <SignInPage />;
      if (route === '/signup') return <SignUpPage />;
      if (route.startsWith('/verify-email')) return <VerifyEmailPage />;


      if (route.startsWith('/admin')) {
          const isAdmin = currentUser?.role === 'Admin';
          if (!isAdmin) return <AdminLoginPage />;
          return <AdminLayout 
                    route={route} 
                    isAdmin={isAdmin} 
                    stats={memoizedData.adminStats}
                    allUsers={users}
                    allNfts={memoizedData.augmentedNfts}
                    allCollections={collections}
                    allCategories={categories}
                    siteSettings={siteSettings}
                    setSiteSettings={setSiteSettings}
                    onMintSuccess={refreshData}
                />;
      }

      const mainContent = (
           <>
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              {
                  (() => {
                      if (route === '/') return <HomePage groupedNfts={memoizedData.groupedNfts} promoBanner={siteSettings.promoBanner} nfts={memoizedData.searchFilteredNfts} categories={categories} />;
                      if (route === '/marketplace') return <MarketplacePage nfts={memoizedData.searchFilteredNfts} searchQuery={searchQuery} categories={categories}/>;
                      if (route.startsWith('/asset/')) {
                          const nftId = route.split('/')[2];
                          const nft = memoizedData.augmentedNfts.find(n => n.id === nftId);
                          return nft ? <NftDetailPage nft={nft} allNfts={memoizedData.augmentedNfts} onPurchaseSuccess={refreshData} /> : <div>NFT not found</div>;
                      }
                      if (route.startsWith('/category/')) {
                        const categoryName = decodeURIComponent(route.split('/')[2]);
                        const categoryNfts = memoizedData.searchFilteredNfts.filter(n => n.category === categoryName);
                        return <CategoryPage nfts={categoryNfts} categoryName={categoryName} />;
                      }
                      if (route === '/create') return <CreatePage isConnected={!!currentUser} categories={categories} onMintSuccess={onMintSuccess} siteSettings={siteSettings}/>;
                      if (route === '/create-success') return <CreateSuccessPage />;
                      if (route === '/profile') return <ProfilePage isConnected={!!currentUser} user={currentUser} userNfts={memoizedData.userNfts} userCreatedNfts={memoizedData.userCreatedNfts}/>;
                      if (route.startsWith('/creator/')) {
                        const creatorId = route.split('/')[2];
                        const creatorNfts = memoizedData.augmentedNfts.filter(n => n.creator.toLowerCase() === creatorId.toLowerCase());
                        const creator = users.find(u => u.id.toLowerCase() === creatorId.toLowerCase()) || (currentUser?.id.toLowerCase() === creatorId.toLowerCase() ? currentUser : undefined);
                        return <CreatorProfilePage creatorAddress={creatorId} creatorNfts={creatorNfts} creator={creator} />;
                      }
                      if (route === '/auctions') return <AuctionPage nfts={memoizedData.auctionNfts} isConnected={!!currentUser} onUpdateBid={() => {}} />;
                      if (route === '/collections') return <CollectionsPage collections={collections} />;
                       if (route.startsWith('/collection/')) {
                        const collectionId = route.split('/')[2];
                        const collection = collections.find(c => c.id === collectionId);
                        const collectionNfts = collection ? memoizedData.augmentedNfts.filter(n => n.collectionId === collectionId) : [];
                        return collection ? <CollectionDetailPage collection={collection} nfts={collectionNfts} /> : <div>Collection not found</div>;
                      }
                      if (route === '/exhibitions') return <ExhibitionsPage collections={collections} />;
                      if (route === '/stats') return <StatsPage nfts={nfts} collections={collections} users={users}/>;
                      if (route === '/team') return <TeamPage />;
                      if (route === '/privacy') return <PrivacyPage />;
                      if (route === '/terms') return <TermsPage />;
                      if (route === '/help') return <HelpPage />;
                      if (route.startsWith('/dashboard')) return <DashboardLayout route={route} user={currentUser} collections={memoizedData.userCollections} userNfts={memoizedData.userCreatedNfts}/>;
                      if (route === '/signout') { onSignOut(); return null; }
                      return <HomePage groupedNfts={memoizedData.groupedNfts} promoBanner={siteSettings.promoBanner} nfts={memoizedData.searchFilteredNfts} categories={categories} />;
                  })()
              }
          </>
      );

      const showFooter = !route.startsWith('/dashboard') && !route.startsWith('/admin') && route !== '/signin' && route !== '/signup' && !route.startsWith('/verify-email');


      return (
          <>
            <Header user={currentUser} onSignIn={() => navigateTo('/signin')} onSignOut={onSignOut} theme={theme} onToggleTheme={toggleTheme}/>
            <main className="pt-20 px-4 pb-28">
              {mainContent}
            </main>
            {showFooter && <Footer route={route} />}
            <ChatWidget />
          </>
      );
  };
  
  return renderContent();
};

const App: React.FC = () => (
  <NotificationProvider>
    <AuthProvider>
       <AppContent />
       <Notification />
    </AuthProvider>
  </NotificationProvider>
);

export default App;