import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BreathVisualizationEngine } from '@/components/breath-engine';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  ArrowLeft,
  Play,
  Sparkles,
  Droplets,
  Snowflake,
  Globe,
  Zap,
  Cloud,
  Settings2,
  Clock,
  Repeat,
  ChevronRight,
  Info,
  Circle,
  Waves,
  Target,
  RotateCw,
  Square,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Types
type VisualMode = 'boxPath' | 'rings' | 'ringsWave' | 'ringsExpand' | 'ringsSpiral' | 'starDust' | 'fluid' | 'crystal' | 'topography' | 'bio' | 'atmosphere';

interface BreathPreset {
  id: string;
  name: string;
  description: string;
  inhale: number;
  holdFull: number;
  exhale: number;
  holdEmpty: number;
  cycles: number;
  recommendedMode: VisualMode;
  color: string;
}

// Visual modes data
const visualModes: {
  id: VisualMode;
  name: string;
  description: string;
  icon: React.ElementType;
  phases: {
    inhale: string;
    holdFull: string;
    exhale: string;
    holdEmpty: string;
  };
  gradient: string;
  iconBg: string;
}[] = [
  {
    id: 'boxPath',
    name: 'Box Breathing',
    description: 'Quadrado com indicador de progresso',
    icon: Square,
    phases: {
      inhale: 'Bolinha sobe pelo lado esquerdo',
      holdFull: 'Bolinha percorre o topo para direita',
      exhale: 'Bolinha desce pelo lado direito',
      holdEmpty: 'Bolinha percorre a base para esquerda',
    },
    gradient: 'from-amber-500/20 via-orange-500/10 to-yellow-500/20',
    iconBg: 'bg-gradient-to-br from-amber-400 to-orange-500',
  },
  {
    id: 'rings',
    name: 'Anéis',
    description: 'Anéis concêntricos que sobem e descem',
    icon: Circle,
    phases: {
      inhale: 'Anéis sobem formando um domo',
      holdFull: 'Empilhados no alto, flutuando',
      exhale: 'Descem e invertem para baixo',
      holdEmpty: 'Empilhados embaixo, em repouso',
    },
    gradient: 'from-slate-500/20 via-gray-500/10 to-zinc-500/20',
    iconBg: 'bg-gradient-to-br from-slate-400 to-gray-600',
  },
  {
    id: 'ringsWave',
    name: 'Anéis Onda',
    description: 'Onda propagando pelos anéis',
    icon: Waves,
    phases: {
      inhale: 'Onda propaga do centro para fora',
      holdFull: 'Ondulação suave no topo',
      exhale: 'Onda retorna de fora para o centro',
      holdEmpty: 'Leves ondulações em repouso',
    },
    gradient: 'from-blue-500/20 via-cyan-500/10 to-teal-500/20',
    iconBg: 'bg-gradient-to-br from-blue-400 to-cyan-500',
  },
  {
    id: 'ringsExpand',
    name: 'Anéis Expansão',
    description: 'Anéis expandem e contraem do centro',
    icon: Target,
    phases: {
      inhale: 'Anéis expandem do centro',
      holdFull: 'Pulsação suave no tamanho máximo',
      exhale: 'Anéis contraem para o centro',
      holdEmpty: 'Respiração sutil contraídos',
    },
    gradient: 'from-pink-500/20 via-rose-500/10 to-red-500/20',
    iconBg: 'bg-gradient-to-br from-pink-400 to-rose-500',
  },
  {
    id: 'ringsSpiral',
    name: 'Anéis Espiral',
    description: 'Anéis rotacionam em espiral',
    icon: RotateCw,
    phases: {
      inhale: 'Anéis sobem girando em espiral',
      holdFull: 'Rotação lenta no topo',
      exhale: 'Anéis descem girando ao contrário',
      holdEmpty: 'Rotação suave em repouso',
    },
    gradient: 'from-purple-500/20 via-violet-500/10 to-indigo-500/20',
    iconBg: 'bg-gradient-to-br from-purple-400 to-violet-500',
  },
  {
    id: 'starDust',
    name: 'Pó de Estrela',
    description: 'Partículas com gravidade invertida',
    icon: Sparkles,
    phases: {
      inhale: 'Partículas sobem e se dispersam',
      holdFull: 'Flutuam no topo, vibrando levemente',
      exhale: 'Caem suavemente de volta',
      holdEmpty: 'Assentadas no chão, brilho fraco',
    },
    gradient: 'from-amber-500/20 via-yellow-500/10 to-orange-500/20',
    iconBg: 'bg-gradient-to-br from-amber-500 to-yellow-500',
  },
  {
    id: 'fluid',
    name: 'Fluido Viscoso',
    description: 'Tinta se dissolvendo na água',
    icon: Droplets,
    phases: {
      inhale: 'Injeção de tinta, cores explodem',
      holdFull: 'Redemoinhos lentos ocupam a tela',
      exhale: 'Fluido sugado para o centro',
      holdEmpty: 'Água cristalina, sem movimento',
    },
    gradient: 'from-cyan-500/20 via-blue-500/10 to-indigo-500/20',
    iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-500',
  },
  {
    id: 'crystal',
    name: 'Cristalização',
    description: 'Ordem emergindo do caos',
    icon: Snowflake,
    phases: {
      inhale: 'Estrutura geométrica sublima (vira gás)',
      holdFull: 'Gás ocupa o espaço, etéreo',
      exhale: 'Condensa em formas geométricas',
      holdEmpty: 'Cristal perfeito, imóvel',
    },
    gradient: 'from-violet-500/20 via-purple-500/10 to-fuchsia-500/20',
    iconBg: 'bg-gradient-to-br from-violet-500 to-purple-500',
  },
  {
    id: 'topography',
    name: 'Topografia 3D',
    description: 'Malha esférica elástica',
    icon: Globe,
    phases: {
      inhale: 'Malha esticada, cria picos pontiagudos',
      holdFull: 'Vibra na tensão máxima, emite luz',
      exhale: 'Picos se suavizam',
      holdEmpty: 'Esfera lisa e escura',
    },
    gradient: 'from-teal-500/20 via-emerald-500/10 to-green-500/20',
    iconBg: 'bg-gradient-to-br from-teal-500 to-emerald-500',
  },
  {
    id: 'bio',
    name: 'Bioluminescência',
    description: 'Rede neural pulsante',
    icon: Zap,
    phases: {
      inhale: 'Pulso de luz do centro às extremidades',
      holdFull: 'Pontas brilham intensamente',
      exhale: 'Luz recua das pontas ao núcleo',
      holdEmpty: 'Ponto fraco pulsa no centro',
    },
    gradient: 'from-lime-500/20 via-green-500/10 to-emerald-500/20',
    iconBg: 'bg-gradient-to-br from-lime-500 to-green-500',
  },
  {
    id: 'atmosphere',
    name: 'Atmosfera',
    description: 'Eclipse e nevoeiro',
    icon: Cloud,
    phases: {
      inhale: 'Nevoeiro dissipa, luz revelada',
      holdFull: 'Luz máxima, brilho intenso',
      exhale: 'Sombras crescem das bordas',
      holdEmpty: 'Escuridão quase total',
    },
    gradient: 'from-orange-500/20 via-red-500/10 to-rose-500/20',
    iconBg: 'bg-gradient-to-br from-orange-500 to-red-500',
  },
];

// Breathing presets
const breathPresets: BreathPreset[] = [
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Equilíbrio e foco. Usado por Navy SEALs.',
    inhale: 4,
    holdFull: 4,
    exhale: 4,
    holdEmpty: 4,
    cycles: 4,
    recommendedMode: 'boxPath',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: '478',
    name: '4-7-8 Relaxante',
    description: 'Técnica do Dr. Weil para relaxamento profundo.',
    inhale: 4,
    holdFull: 7,
    exhale: 8,
    holdEmpty: 0,
    cycles: 4,
    recommendedMode: 'atmosphere',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'coherence',
    name: 'Coerência Cardíaca',
    description: 'Sincroniza respiração e batimentos cardíacos.',
    inhale: 5,
    holdFull: 0,
    exhale: 5,
    holdEmpty: 0,
    cycles: 10,
    recommendedMode: 'bio',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'energizing',
    name: 'Energizante',
    description: 'Aumenta energia e estado de alerta.',
    inhale: 4,
    holdFull: 0,
    exhale: 2,
    holdEmpty: 0,
    cycles: 6,
    recommendedMode: 'starDust',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'calm',
    name: 'Calmante',
    description: 'Expiração prolongada para acalmar.',
    inhale: 4,
    holdFull: 2,
    exhale: 6,
    holdEmpty: 2,
    cycles: 5,
    recommendedMode: 'fluid',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'sleep',
    name: 'Preparação p/ Sono',
    description: 'Induz relaxamento profundo antes de dormir.',
    inhale: 4,
    holdFull: 7,
    exhale: 8,
    holdEmpty: 4,
    cycles: 3,
    recommendedMode: 'atmosphere',
    color: 'from-indigo-500 to-purple-600',
  },
];

export default function AnimationStudio() {
  const navigate = useNavigate();
  const [showEngine, setShowEngine] = useState(false);
  const [selectedMode, setSelectedMode] = useState<VisualMode>('rings');
  const [selectedPreset, setSelectedPreset] = useState<BreathPreset | null>(null);
  const [showModeDetails, setShowModeDetails] = useState(false);
  const [customConfig, setCustomConfig] = useState({
    inhale: 4,
    holdFull: 4,
    exhale: 4,
    holdEmpty: 4,
    cycles: 4,
  });

  // Get selected mode details
  const modeDetails = visualModes.find(m => m.id === selectedMode);

  const handleStartWithPreset = (preset: BreathPreset) => {
    setSelectedPreset(preset);
    setSelectedMode(preset.recommendedMode);
    setCustomConfig({
      inhale: preset.inhale,
      holdFull: preset.holdFull,
      exhale: preset.exhale,
      holdEmpty: preset.holdEmpty,
      cycles: preset.cycles,
    });
    setShowEngine(true);
  };

  const handleStartCustom = () => {
    setSelectedPreset(null);
    setShowEngine(true);
  };

  const handleEngineComplete = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    toast.success('Sessão concluída!', {
      description: `Você praticou por ${minutes > 0 ? `${minutes}min ` : ''}${seconds}s. Excelente trabalho!`,
    });
    setShowEngine(false);
  };

  const totalCycleTime = customConfig.inhale + customConfig.holdFull + customConfig.exhale + customConfig.holdEmpty;
  const totalSessionTime = totalCycleTime * customConfig.cycles;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(78, 205, 196, 0.08) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Animation Studio</h1>
            <p className="text-sm text-white/50">Motor de Visualização de Respiração</p>
          </div>
        </div>
      </header>

      <main className="relative z-10 container max-w-5xl mx-auto px-4 py-8 space-y-10">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-[0_0_80px_rgba(78,205,196,0.3)] mb-6">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Experiências Visuais de Respiração
            </h2>
            <p className="text-white/60 max-w-xl mx-auto text-lg">
              11 modos visuais abstratos baseados em física e metáforas naturais.
              Cada modo reage de forma única às 4 fases do ciclo respiratório.
            </p>
          </motion.div>
        </section>

        {/* Visual Modes Selector */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white/90">Escolha o Modo Visual</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowModeDetails(!showModeDetails)}
              className="text-white/50 hover:text-white gap-2"
            >
              <Info className="w-4 h-4" />
              {showModeDetails ? 'Esconder detalhes' : 'Ver detalhes'}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {visualModes.map((mode, index) => (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={cn(
                    'relative cursor-pointer transition-all duration-300 border-0 overflow-hidden group',
                    `bg-gradient-to-br ${mode.gradient}`,
                    selectedMode === mode.id
                      ? 'ring-2 ring-white/50 scale-[1.02]'
                      : 'hover:scale-[1.02] ring-1 ring-white/10'
                  )}
                  onClick={() => setSelectedMode(mode.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={cn('p-2.5 rounded-xl', mode.iconBg)}>
                        <mode.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white truncate">{mode.name}</h4>
                        <p className="text-xs text-white/60 line-clamp-1">{mode.description}</p>
                      </div>
                    </div>

                    {/* Phase details - expandable */}
                    <AnimatePresence>
                      {showModeDetails && selectedMode === mode.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                            {Object.entries(mode.phases).map(([phase, desc]) => (
                              <div key={phase} className="flex gap-2 text-xs">
                                <Badge
                                  variant="outline"
                                  className="shrink-0 border-white/20 text-white/70 text-[10px] px-1.5"
                                >
                                  {phase === 'inhale' ? 'Inspire' :
                                   phase === 'holdFull' ? 'Segure' :
                                   phase === 'exhale' ? 'Expire' : 'Pause'}
                                </Badge>
                                <span className="text-white/50 line-clamp-1">{desc}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>

                  {/* Selection indicator */}
                  {selectedMode === mode.id && (
                    <motion.div
                      layoutId="mode-indicator"
                      className="absolute inset-0 border-2 border-white/30 rounded-xl pointer-events-none"
                    />
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Breath Presets */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-white/90">Padrões de Respiração</h3>

          <div className="grid gap-3">
            {breathPresets.map((preset, index) => (
              <motion.div
                key={preset.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className="bg-white/5 border-white/10 hover:bg-white/[0.07] transition-all cursor-pointer group"
                  onClick={() => handleStartWithPreset(preset)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={cn('w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0', preset.color)}>
                      <Play className="w-5 h-5 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-white">{preset.name}</h4>
                        <Badge variant="outline" className="border-white/20 text-white/60 text-[10px]">
                          {preset.inhale}-{preset.holdFull}-{preset.exhale}-{preset.holdEmpty}
                        </Badge>
                      </div>
                      <p className="text-sm text-white/50 line-clamp-1">{preset.description}</p>
                    </div>

                    <div className="flex items-center gap-4 text-white/40">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{(preset.inhale + preset.holdFull + preset.exhale + preset.holdEmpty) * preset.cycles}s</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <Repeat className="w-3.5 h-3.5" />
                        <span>{preset.cycles}x</span>
                      </div>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Custom Configuration */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white/90">Configuração Personalizada</h3>
            <div className="flex items-center gap-3 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {Math.floor(totalSessionTime / 60)}:{(totalSessionTime % 60).toString().padStart(2, '0')} total
              </span>
            </div>
          </div>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6 space-y-6">
              {/* Timing sliders */}
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { key: 'inhale', label: 'Inspirar', color: 'bg-teal-500' },
                  { key: 'holdFull', label: 'Segurar (cheio)', color: 'bg-blue-500' },
                  { key: 'exhale', label: 'Expirar', color: 'bg-orange-500' },
                  { key: 'holdEmpty', label: 'Segurar (vazio)', color: 'bg-purple-500' },
                ].map(({ key, label, color }) => (
                  <div key={key} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={cn('w-2 h-2 rounded-full', color)} />
                        <span className="text-sm text-white/70">{label}</span>
                      </div>
                      <Badge variant="secondary" className="bg-white/10 text-white">
                        {customConfig[key as keyof typeof customConfig]}s
                      </Badge>
                    </div>
                    <Slider
                      value={[customConfig[key as keyof typeof customConfig]]}
                      onValueChange={([v]) => setCustomConfig(c => ({ ...c, [key]: v }))}
                      min={0}
                      max={10}
                      step={1}
                      className="[&_[role=slider]]:bg-white [&_[role=slider]]:border-0"
                    />
                  </div>
                ))}
              </div>

              {/* Cycles */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-white/70">Número de Ciclos</span>
                  <Badge variant="secondary" className="bg-white/10 text-white">
                    {customConfig.cycles} ciclos
                  </Badge>
                </div>
                <Slider
                  value={[customConfig.cycles]}
                  onValueChange={([v]) => setCustomConfig(c => ({ ...c, cycles: v }))}
                  min={1}
                  max={15}
                  step={1}
                  className="[&_[role=slider]]:bg-white [&_[role=slider]]:border-0"
                />
              </div>

              {/* Timeline preview */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-white/50 mb-2">Visualização do ciclo</p>
                <div className="flex h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-500 transition-all"
                    style={{ width: `${(customConfig.inhale / totalCycleTime) * 100}%` }}
                  />
                  <div
                    className="bg-blue-500 transition-all"
                    style={{ width: `${(customConfig.holdFull / totalCycleTime) * 100}%` }}
                  />
                  <div
                    className="bg-orange-500 transition-all"
                    style={{ width: `${(customConfig.exhale / totalCycleTime) * 100}%` }}
                  />
                  <div
                    className="bg-purple-500 transition-all"
                    style={{ width: `${(customConfig.holdEmpty / totalCycleTime) * 100}%` }}
                  />
                </div>
              </div>

              {/* Start button */}
              <Button
                size="lg"
                onClick={handleStartCustom}
                className="w-full rounded-xl h-14 text-lg font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 border-0"
              >
                <Play className="w-5 h-5 mr-2" />
                Iniciar com {modeDetails?.name}
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Info Section */}
        <section className="pt-6 border-t border-white/10">
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { label: '4 Fases', desc: 'State Machine completa' },
              { label: '11 Modos', desc: 'Visualizações únicas' },
              { label: 'Tempo Real', desc: 'Canvas 60fps' },
              { label: 'Personalizável', desc: 'Tempos e cores' },
            ].map((item) => (
              <div key={item.label} className="text-center p-4 rounded-xl bg-white/5">
                <div className="text-xl font-bold text-teal-400">{item.label}</div>
                <div className="text-xs text-white/50">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Fullscreen Engine */}
      <AnimatePresence>
        {showEngine && (
          <BreathVisualizationEngine
            onClose={() => setShowEngine(false)}
            onComplete={handleEngineComplete}
            fullscreen={true}
            initialConfig={{
              inhaleTime: customConfig.inhale,
              holdFullTime: customConfig.holdFull,
              exhaleTime: customConfig.exhale,
              holdEmptyTime: customConfig.holdEmpty,
              cycles: customConfig.cycles,
              visualMode: selectedMode,
              primaryColor: selectedMode === 'boxPath' ? '#FFFBEB' : selectedMode.startsWith('rings') ? '#FFFFFF' : '#4ECDC4',
              secondaryColor: selectedMode === 'boxPath' ? '#FFFFFF' : '#4ECDC4',
              backgroundColor: '#000000',
              complexity: 50,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
