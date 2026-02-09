import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { getRandomPrompt } from '@/lib/journalSafety';

interface WritingPromptCardProps {
  onUsePrompt: (prompt: string) => void;
}

export function WritingPromptCard({ onUsePrompt }: WritingPromptCardProps) {
  const [prompt, setPrompt] = useState(() => getRandomPrompt());

  const refresh = useCallback(() => {
    let next = getRandomPrompt();
    while (next === prompt) next = getRandomPrompt();
    setPrompt(next);
  }, [prompt]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-elevated p-4 space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Sugestão para começar
          </span>
        </div>
        <button
          onClick={refresh}
          className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
          aria-label="Nova sugestão"
        >
          <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </div>
      <button
        onClick={() => onUsePrompt(prompt)}
        className="w-full text-left text-sm text-foreground italic leading-relaxed hover:text-primary transition-colors"
      >
        "{prompt}"
      </button>
    </motion.div>
  );
}
