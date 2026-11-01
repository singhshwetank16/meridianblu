/**
 * Asset URL resolver for GitHub Pages subfolder hosting (/meridianblu) and local dev
 */

export const getBaseRepoPath = (): string => {
  if (typeof window === 'undefined') return '';
  const p = window.location.pathname.toLowerCase();
  if (p.startsWith('/meridianblu')) {
    return '/meridianblu';
  }
  return '';
};

export const getAssetUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const clean = url.startsWith('/') ? url.slice(1) : url;
  const base = getBaseRepoPath();
  const full = base ? `${base}/${clean}` : `/${clean}`;
  return encodeURI(full);
};

