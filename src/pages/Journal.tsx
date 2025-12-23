import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bold, Italic, List, Sparkles, Save, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BottomNavigation } from '@/components/BottomNavigation';
import { toast } from 'sonner';

export default function Journal() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [detectedEmotions, setDetectedEmotions] = useState<string[]>([]);

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  const handleSave = () => {
    if (!text.trim()) {
      toast.error('Escreva algo antes de salvar');
      return;
    }
    toast.success('Entrada salva com sucesso!');
    setText('');
    setDetectedEmotions([]);
  };

  const detectEmotions = () => {
    if (text.length > 20) {
      setDetectedEmotions(['Reflexivo', 'Calmo']);
    }
  };

  const today = new Date();
  const dateString = today.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-[100dvh] flex flex-col pb-28">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 glass"
      >
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-muted/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Diário Emocional</h1>
          <div className="w-9" />
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 px-5 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          {/* Date Card */}
          <div className="card-elevated p-4 text-center">
            <p className="text-sm font-medium text-foreground capitalize">
              {dateString}
            </p>
          </div>

          {/* Formatting Bar */}
          <div className="flex items-center gap-1 p-2 rounded-xl bg-muted/50">
            <button className="p-2.5 rounded-lg hover:bg-muted transition-colors">
              <Bold className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="p-2.5 rounded-lg hover:bg-muted transition-colors">
              <Italic className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="p-2.5 rounded-lg hover:bg-muted transition-colors">
              <List className="w-4 h-4 text-muted-foreground" />
            </button>
            <div className="flex-1" />
            <button className="p-2.5 rounded-lg hover:bg-muted transition-colors">
              <Mic className="w-4 h-4 text-muted-foreground" />
            </button>
            <span className="text-xs text-muted-foreground px-2 font-medium">
              {wordCount} {wordCount === 1 ? 'palavra' : 'palavras'}
            </span>
          </div>

          {/* Text Area */}
          <div className="card-elevated p-1">
            <Textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                detectEmotions();
              }}
              placeholder="Como você está se sentindo hoje? Escreva livremente sobre suas emoções, pensamentos e experiências..."
              className="min-h-[280px] resize-none border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 rounded-xl p-4 text-base leading-relaxed"
            />
          </div>

          {/* AI Detection Tag */}
          {detectedEmotions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-elevated p-4 border-l-4 border-l-primary flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">IA detectou</p>
                <p className="text-sm font-semibold text-foreground">
                  {detectedEmotions.join(', ')}
                </p>
              </div>
            </motion.div>
          )}

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-lg shadow-primary/20 btn-glow"
          >
            <Save className="w-5 h-5 mr-2" />
            Salvar e Analisar
          </Button>
        </motion.div>
      </main>

      <BottomNavigation />
    </div>
  );
}