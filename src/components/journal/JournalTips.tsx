import { motion } from 'framer-motion';
import { BookOpen, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const tips = [
  { title: 'Sem julgamento', text: 'Escreva sem se preocupar com gramática ou coerência. O diário é seu espaço seguro.' },
  { title: 'Consistência > Quantidade', text: 'Poucos minutos por dia são mais valiosos que textos longos esporádicos.' },
  { title: 'Nomeie suas emoções', text: 'Pesquisas mostram que nomear emoções reduz sua intensidade.' },
  { title: 'Procure padrões', text: 'Com o tempo, revise suas entradas e observe padrões recorrentes.' },
  { title: 'Profissional qualificado', text: 'O diário é uma ferramenta complementar. Para questões intensas, procure um psicólogo ou psiquiatra.' },
];

export function JournalTips() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="card-elevated overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-secondary" />
          <span className="text-sm font-semibold text-foreground">Dicas para seu diário</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="px-4 pb-4 space-y-3"
        >
          {tips.map((tip, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-xs font-bold text-primary mt-0.5">{i + 1}</span>
              <div>
                <p className="text-sm font-medium text-foreground">{tip.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{tip.text}</p>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
