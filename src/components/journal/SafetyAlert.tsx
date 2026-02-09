import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Phone, AlertTriangle } from 'lucide-react';
import type { SafetyCheck } from '@/lib/journalSafety';

interface SafetyAlertProps {
  safety: SafetyCheck;
}

export function SafetyAlert({ safety }: SafetyAlertProps) {
  if (safety.level === 'safe') return null;

  const isRisk = safety.level === 'risk';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10 }}
        className={`p-4 rounded-2xl border-l-4 space-y-3 ${
          isRisk
            ? 'bg-destructive/10 border-l-destructive'
            : 'bg-primary/10 border-l-primary'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
            isRisk ? 'bg-destructive/20' : 'bg-primary/20'
          }`}>
            {isRisk ? (
              <AlertTriangle className="w-5 h-5 text-destructive" />
            ) : (
              <Heart className="w-5 h-5 text-primary" />
            )}
          </div>
          <div className="space-y-1">
            <p className={`text-sm font-semibold ${isRisk ? 'text-destructive' : 'text-foreground'}`}>
              {isRisk ? 'Você não está sozinho(a)' : 'Cuidado com você'}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {safety.message}
            </p>
          </div>
        </div>

        {safety.contacts && safety.contacts.length > 0 && (
          <div className="space-y-2 pl-12">
            {safety.contacts.map((contact) => (
              <a
                key={contact.number}
                href={`tel:${contact.number.replace(/[^0-9]/g, '')}`}
                className={`flex items-center gap-2.5 p-2.5 rounded-xl transition-colors ${
                  isRisk
                    ? 'bg-destructive/10 hover:bg-destructive/20'
                    : 'bg-primary/10 hover:bg-primary/20'
                }`}
              >
                <Phone className={`w-4 h-4 ${isRisk ? 'text-destructive' : 'text-primary'}`} />
                <div>
                  <span className="text-sm font-semibold text-foreground">
                    {contact.name} — {contact.number}
                  </span>
                  <p className="text-xs text-muted-foreground">{contact.description}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
