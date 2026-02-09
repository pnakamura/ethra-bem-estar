import { Shield, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export function PrivacyBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-accent/10 border border-accent/20"
    >
      <div className="flex items-center gap-1.5">
        <Shield className="w-4 h-4 text-accent" />
        <Lock className="w-3 h-3 text-accent" />
      </div>
      <p className="text-xs text-accent font-medium">
        Seus dados são privados e protegidos
      </p>
    </motion.div>
  );
}
