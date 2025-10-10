import { apiFetchWithFallback } from './utils';

export interface SiteSettingsDto {
  mintFeeEth: number;
  commissionPercent: number;
  platformAccountId: string;
}

export interface LedgerEntryDto {
  id: number;
  accountId: string;
  amountEth: number;
  nftId: string | null;
  createdAt: string;
}

// Admin: get platform ledger (recent)
export async function getLedger(limit = 50): Promise<LedgerEntryDto[]> {
  const res = await apiFetchWithFallback(`/admin/ledger?limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch ledger');
  return await res.json();
}

// Admin: update site settings
export async function updateSiteSettings(settings: SiteSettingsDto): Promise<SiteSettingsDto> {
  const res = await apiFetchWithFallback('/admin/site-settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
    body: JSON.stringify(settings),
  });
  if (!res.ok) throw new Error('Failed to update site settings');
  return await res.json();
}

// Admin: list deposit pool status
export async function listDepositPool(): Promise<{ address: string; assignedTo: string | null; assignedUntil: string | null; isActive: boolean }[]> {
  const res = await apiFetchWithFallback('/admin/deposit-pool');
  if (!res.ok) throw new Error('Failed to fetch deposit pool');
  return await res.json();
}

// Admin: toggle pool entry
export async function setDepositActive(address: string, isActive: boolean): Promise<{ success: boolean }> {
  const res = await apiFetchWithFallback('/admin/deposit-pool/toggle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
    body: JSON.stringify({ address, isActive }),
  });
  if (!res.ok) throw new Error('Failed to toggle deposit address');
  return await res.json();
}