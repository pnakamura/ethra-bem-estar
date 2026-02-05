import { useRef, useLayoutEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  HomeIcon,
  BookOpenIcon,
  UserIcon,
  HeartIcon,
  ChatIcon,
} from '@/components/ui/icons';

const navItems = [
  { path: '/', label: 'Início', icon: HomeIcon },
  { path: '/guide', label: 'Guia', icon: ChatIcon },
  { path: '/favorites', label: 'Favoritos', icon: HeartIcon },
  { path: '/journal', label: 'Diário', icon: BookOpenIcon },
  { path: '/profile', label: 'Perfil', icon: UserIcon },
];

export function BottomNavigation() {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  // Measure and expose nav height as CSS variable for other components
  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const updateHeight = () => {
      const height = nav.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--bottom-nav-height', `${height}px`);
    };

    // Initial measurement
    updateHeight();

    // Observe size changes (font scaling, safe-area updates, etc.)
    const observer = new ResizeObserver(updateHeight);
    observer.observe(nav);

    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('--bottom-nav-height');
    };
  }, []);

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bottom-nav fixed bottom-0 left-0 right-0 z-50 safe-bottom"
    >
      {/* Elegant glass background with enhanced dark mode */}
      <div className="bottom-nav-bg absolute inset-0 bg-card/90 backdrop-blur-xl border-t border-border/50 shadow-[0_-8px_32px_hsl(var(--foreground)/0.04)] dark:bg-card/95 dark:border-border/60" />

      {/* Nav content */}
      <div className="relative flex items-center justify-around px-2 py-3">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="relative"
              aria-label={`Ir para ${item.label}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05, duration: 0.5 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'flex flex-col items-center gap-1 min-w-[4rem] min-h-[56px] px-3 py-2 rounded-xl transition-all duration-300',
                  isActive ? 'bg-primary/10 dark:bg-primary/15' : 'hover:bg-muted/50'
                )}
              >
                {/* Active indicator line with glow */}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="section-indicator absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <Icon
                  size={26}
                  weight={isActive ? 'regular' : 'light'}
                  className={cn(
                    'transition-all duration-300',
                    isActive
                      ? 'text-primary nav-icon-active'
                      : 'text-muted-foreground'
                  )}
                />
                <span
                  className={cn(
                    'text-xs font-medium transition-colors duration-300',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </span>
              </motion.div>
            </NavLink>
          );
        })}
      </div>
    </motion.nav>
  );
}
