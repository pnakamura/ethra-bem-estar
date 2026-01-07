import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePWAInstall } from '@/hooks/usePWAInstall';

export function PWAInstallPrompt() {
  const { isInstallable, isIOS, promptInstall, dismissPrompt } = usePWAInstall();

  if (!isInstallable) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full max-w-sm mx-auto mb-6"
      >
        <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-4 shadow-lg">
          {/* Close button */}
          <button
            onClick={dismissPrompt}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted/50 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* Icon */}
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
            >
              <Download className="w-5 h-5 text-primary" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">
                Instale o ETHRA
              </h3>
              <p className="text-xs text-muted-foreground">
                Acesse direto da sua tela inicial
              </p>
            </div>
          </div>

          {isIOS ? (
            // iOS Instructions
            <div className="space-y-2 text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium">
                  1
                </span>
                <span className="flex items-center gap-1">
                  Toque em <Share className="w-3.5 h-3.5 text-primary" /> (Compartilhar)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium">
                  2
                </span>
                <span>Toque em "Adicionar à Tela de Início"</span>
              </div>
            </div>
          ) : (
            // Android/Desktop Install Button
            <Button
              onClick={promptInstall}
              className="w-full mb-2"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Instalar Aplicativo
            </Button>
          )}

          {/* Dismiss link */}
          <button
            onClick={dismissPrompt}
            className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
          >
            {isIOS ? 'Entendi' : 'Agora não'}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
