import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { getBaseRepoPath } from '../utils/assetUrl';

export type AppRoute = 
  | '/'
  | '/rooms'
  | '/about'
  | '/trails'
  | '/gallery'
  | '/stories'
  | '/contact';

interface RouterContextType {
  currentPath: string;
  searchParams: URLSearchParams;
  navigate: (to: string, options?: { replace?: boolean; preserveScroll?: boolean; state?: any }) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export { getBaseRepoPath };

// Normalize path aliases
export const normalizePath = (pathname: string): string => {
  let clean = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const base = getBaseRepoPath();
  if (base && clean.startsWith(base)) {
    clean = clean.slice(base.length) || '/';
  }
  if (clean === '/suites' || clean === '/accommodations' || clean === '/booking') return '/rooms';
  if (clean === '/virtual-tour' || clean === '/estate') return '/about';
  if (clean === '/experiences' || clean === '/hikes') return '/trails';
  if (clean === '/blog' || clean === '/social') return '/stories';
  return clean;
};

interface RouterProviderProps {
  children: ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  const [searchParams, setSearchParams] = useState<URLSearchParams>(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
  });

  const navigate = useCallback((to: string, options: { replace?: boolean; preserveScroll?: boolean; state?: any } = {}) => {
    if (typeof window === 'undefined') return;

    try {
      // Parse target url or path
      const url = new URL(to, window.location.origin);
      const targetPath = normalizePath(url.pathname);
      const targetSearch = url.search;
      const base = getBaseRepoPath();
      const fullPath = base ? `${base}${targetPath}` : targetPath;

      if (options?.replace) {
        window.history.replaceState(options?.state ?? null, '', `${fullPath}${targetSearch}`);
      } else {
        window.history.pushState(options?.state ?? null, '', `${fullPath}${targetSearch}`);
      }

      setCurrentPath(targetPath);
      setSearchParams(new URLSearchParams(targetSearch));

      if (!options?.preserveScroll) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.warn('Navigation error, falling back to direct path set:', err);
      const fallbackPath = normalizePath(to.split('?')[0]);
      setCurrentPath(fallbackPath);
      if (!options?.preserveScroll) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <RouterContext.Provider value={{ currentPath, searchParams, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

export const usePathname = (): string => {
  return useRouter().currentPath;
};

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  replace?: boolean;
  preserveScroll?: boolean;
  children: ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({
  to,
  replace,
  preserveScroll,
  children,
  className,
  onClick,
  ...rest
}) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    // If cmd/ctrl click or external link, allow default browser behavior
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || rest.target === '_blank' || to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('tel:')) {
      return;
    }

    e.preventDefault();
    navigate(to, { replace, preserveScroll });
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
};
