
export const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
};

export const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

// API helpers
const getEnv = () => ((import.meta as any).env || {}) as Record<string, string | undefined>;

export const getDefaultApiBase = (): string => '/api';

export const getExternalApiBase = (): string | undefined => {
  const env = getEnv();
  return (env.VITE_EXTERNAL_API_BASE_URL as string) || (env.VITE_API_BASE_URL as string) || undefined;
};

export const apiFetchWithFallback = async (path: string, init?: RequestInit, bases?: (string | undefined)[]): Promise<Response> => {
  const candidates = (bases && bases.filter(Boolean) as string[]) || [];
  if (!candidates.length) {
    const external = getExternalApiBase();
    if (external) candidates.push(external);
    candidates.push(getDefaultApiBase());
  }
  const normalizedPath = path.startsWith('http') ? path : path.startsWith('/') ? path : `/${path}`;

  let lastError: any = null;
  for (const base of candidates) {
    const url = normalizedPath.startsWith('http') ? normalizedPath : `${base}${normalizedPath}`;
    try {
      const res = await fetch(url, init);
      if (res.ok) return res;
      lastError = new Error(`Request failed: ${res.status} ${res.statusText}`);
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError || new Error('All API endpoints failed');
};
