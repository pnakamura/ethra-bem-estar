import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export function OfflineBanner() {
  const { isOnline, wasOffline } = useNetworkStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-[100] safe-top"
        >
          <div className="mx-4 mt-2 flex items-center gap-3 px-4 py-3 bg-destructive text-destructive-foreground rounded-xl shadow-lg">
            <WifiOff className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Você está offline</p>
              <p className="text-xs opacity-90 truncate">
                Algumas funcionalidades podem estar limitadas
              </p>
            </div>
            <RefreshCw 
              className="w-4 h-4 animate-spin-slow opacity-75"
              aria-hidden="true"
            />
          </div>
        </motion.div>
      )}

      {wasOffline && isOnline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-[100] safe-top"
        >
          <div className="mx-4 mt-2 flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground rounded-xl shadow-lg">
            <Wifi className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">Conexão restaurada!</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
