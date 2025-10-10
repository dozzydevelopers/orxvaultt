
import type { Nft } from '../types';

const STORAGE_KEY = 'orxvault_auctions';

interface AuctionStateItem {
  id: string;
  currentBidEth: number;
  auctionEnd?: string;
}

interface AuctionState {
  items: Record<string, AuctionStateItem>;
}

function loadState(): AuctionState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: {} };
    const parsed = JSON.parse(raw) as AuctionState;
    return parsed && parsed.items ? parsed : { items: {} };
  } catch {
    return { items: {} };
  }
}

function saveState(state: AuctionState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getAuctionOverlay(nfts: Nft[]): Record<string, Partial<Nft>> {
  const state = loadState();
  const overlay: Record<string, Partial<Nft>> = {};
  for (const nft of nfts) {
    const item = state.items[nft.id];
    if (item) {
      overlay[nft.id] = {
        currentBidEth: item.currentBidEth,
        auctionEnd: item.auctionEnd,
        isAuction: !!item.auctionEnd && new Date(item.auctionEnd) > new Date(),
      };
    }
  }
  return overlay;
}

export function upsertAuction(nftId: string, data: { currentBidEth?: number; auctionEnd?: string }) {
  const state = loadState();
  const existing = state.items[nftId] || { id: nftId, currentBidEth: 0 };
  const updated: AuctionStateItem = {
    ...existing,
    ...data,
    currentBidEth: data.currentBidEth ?? existing.currentBidEth ?? 0,
  };
  state.items[nftId] = updated;
  saveState(state);
}

export function placeBid(nft: Nft, bidEth: number): { accepted: boolean; reason?: string; newBid?: number } {
  const now = new Date();
  if (!nft.isAuction || !nft.auctionEnd) {
    return { accepted: false, reason: 'This item is not in auction.' };
  }
  if (new Date(nft.auctionEnd) <= now) {
    return { accepted: false, reason: 'Auction has ended.' };
  }
  const minBid = Math.max(nft.currentBidEth || 0, nft.priceEth);
  if (isNaN(bidEth) || bidEth <= minBid) {
    return { accepted: false, reason: `Bid must be greater than ${minBid.toFixed(4)} ETH.` };
  }
  const newBid = parseFloat(bidEth.toFixed(6));
  upsertAuction(nft.id, { currentBidEth: newBid });
  return { accepted: true, newBid };
}
