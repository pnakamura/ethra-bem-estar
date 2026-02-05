import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BreathVisualizationEngine } from '@/components/breath-engine';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { BottomNavigation } from '@/components/BottomNavigation';
import {
  ArrowLeftIcon,
  PlayIcon,
  SparkleIcon,
  SettingsIcon,
  ClockIcon,
} from '@/components/ui/icons';
import {
  Droplets,
  Snowflake,
  Globe,
  Zap,
  Cloud,
  Circle,
  Waves,
  Target,
  RotateCw,
  Square,
  Sparkles,
  Repeat,
  ChevronRight,
  Info,
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
  lightColor: string;
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
  lightGradient: string;
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
    lightGradient: 'from-amber-100 via-orange-50 to-yellow-100',
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
    lightGradient: 'from-slate-100 via-gray-50 to-zinc-100',
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
    lightGradient: 'from-blue-100 via-cyan-50 to-teal-100',
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
    lightGradient: 'from-pink-100 via-rose-50 to-red-100',
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
    lightGradient: 'from-purple-100 via-violet-50 to-indigo-100',
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
    lightGradient: 'from-amber-100 via-yellow-50 to-orange-100',
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
    lightGradient: 'from-cyan-100 via-blue-50 to-indigo-100',
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
    lightGradient: 'from-violet-100 via-purple-50 to-fuchsia-100',
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
    lightGradient: 'from-teal-100 via-emerald-50 to-green-100',
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
    lightGradient: 'from-lime-100 via-green-50 to-emerald-100',
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
    lightGradient: 'from-orange-100 via-red-50 to-rose-100',
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
    lightColor: 'from-amber-400 to-orange-500',
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
    lightColor: 'from-blue-400 to-indigo-500',
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
    lightColor: 'from-emerald-400 to-teal-500',
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
    lightColor: 'from-amber-400 to-orange-500',
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
    lightColor: 'from-cyan-400 to-blue-500',
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
    lightColor: 'from-indigo-400 to-purple-500',
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col pb-32 bg-background relative overflow-hidden">
      {/* Subtle Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-violet-500/5 dark:bg-violet-500/10 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 15, repeat: Infinity, delay: 2, ease: 'easeInOut' }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative pt-12 px-6 pb-6 z-10"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="w-11 h-11 rounded-xl bg-card border border-border/50 flex items-center justify-center hover:bg-muted/50 hover:border-primary/20 transition-all duration-300"
          >
            <ArrowLeftIcon size={22} className="text-foreground" />
          </button>
          <div>
            <h1 className="font-display text-2xl font-medium text-foreground">Animation Studio</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Visualizações de Respiração</p>
          </div>
        </div>
      </motion.header>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 px-6 space-y-8 relative z-10"
      >
        {/* Hero Section */}
        <motion.section variants={itemVariants} className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20 mb-4">
              <SparkleIcon size={36} className="text-white" weight="regular" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-medium text-foreground mb-2">
              Experiências Visuais
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto text-sm">
              11 modos visuais abstratos baseados em física e metáforas naturais.
            </p>
          </motion.div>
        </motion.section>

        {/* Visual Modes Selector */}
        <motion.section variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Modo Visual
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowModeDetails(!showModeDetails)}
              className="text-muted-foreground hover:text-foreground gap-1.5 text-xs"
            >
              <Info className="w-3.5 h-3.5" />
              {showModeDetails ? 'Menos' : 'Detalhes'}
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {visualModes.map((mode, index) => (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card
                  className={cn(
                    'relative cursor-pointer transition-all duration-300 overflow-hidden group',
                    'border bg-card hover:shadow-md',
                    selectedMode === mode.id
                      ? 'ring-2 ring-primary border-primary/30 shadow-md'
                      : 'border-border/50 hover:border-primary/20'
                  )}
                  onClick={() => setSelectedMode(mode.id)}
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start gap-3">
                      <div className={cn('p-2 rounded-xl shrink-0', mode.iconBg)}>
                        <mode.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm truncate">{mode.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-1">{mode.description}</p>
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
                          <div className="mt-3 pt-3 border-t border-border/50 space-y-1.5">
                            {Object.entries(mode.phases).map(([phase, desc]) => (
                              <div key={phase} className="flex gap-2 text-xs">
                                <Badge
                                  variant="outline"
                                  className="shrink-0 border-border text-muted-foreground text-[10px] px-1.5"
                                >
                                  {phase === 'inhale' ? 'Inspire' :
                                   phase === 'holdFull' ? 'Segure' :
                                   phase === 'exhale' ? 'Expire' : 'Pause'}
                                </Badge>
                                <span className="text-muted-foreground line-clamp-1">{desc}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Breath Presets */}
        <motion.section variants={itemVariants} className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            Padrões de Respiração
          </h3>

          <div className="grid gap-3">
            {breathPresets.map((preset, index) => (
              <motion.div
                key={preset.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className="bg-card border-border/50 hover:border-primary/20 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => handleStartWithPreset(preset)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={cn('w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-sm', preset.lightColor)}>
                      <PlayIcon size={20} className="text-white" weight="fill" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="font-medium text-foreground">{preset.name}</h4>
                        <Badge variant="outline" className="border-border text-muted-foreground text-[10px]">
                          {preset.inhale}-{preset.holdFull}-{preset.exhale}-{preset.holdEmpty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{preset.description}</p>
                    </div>

                    <div className="hidden sm:flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1.5 text-xs">
                        <ClockIcon size={14} />
                        <span>{(preset.inhale + preset.holdFull + preset.exhale + preset.holdEmpty) * preset.cycles}s</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <Repeat className="w-3.5 h-3.5" />
                        <span>{preset.cycles}x</span>
                      </div>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Custom Configuration */}
        <motion.section variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Personalizado
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ClockIcon size={14} />
              {Math.floor(totalSessionTime / 60)}:{(totalSessionTime % 60).toString().padStart(2, '0')} total
            </div>
          </div>

          <Card className="bg-card border-border/50">
            <CardContent className="p-5 space-y-5">
              {/* Timing sliders */}
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { key: 'inhale', label: 'Inspirar', color: 'bg-teal-500' },
                  { key: 'holdFull', label: 'Segurar (cheio)', color: 'bg-blue-500' },
                  { key: 'exhale', label: 'Expirar', color: 'bg-orange-500' },
                  { key: 'holdEmpty', label: 'Segurar (vazio)', color: 'bg-purple-500' },
                ].map(({ key, label, color }) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={cn('w-2 h-2 rounded-full', color)} />
                        <span className="text-sm text-foreground">{label}</span>
                      </div>
                      <Badge variant="secondary" className="bg-muted text-foreground text-xs">
                        {customConfig[key as keyof typeof customConfig]}s
                      </Badge>
                    </div>
                    <Slider
                      value={[customConfig[key as keyof typeof customConfig]]}
                      onValueChange={([v]) => setCustomConfig(c => ({ ...c, [key]: v }))}
                      min={0}
                      max={10}
                      step={1}
                      className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-0"
                    />
                  </div>
                ))}
              </div>

              {/* Cycles */}
              <div className="pt-4 border-t border-border/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-foreground">Número de Ciclos</span>
                  <Badge variant="secondary" className="bg-muted text-foreground text-xs">
                    {customConfig.cycles} ciclos
                  </Badge>
                </div>
                <Slider
                  value={[customConfig.cycles]}
                  onValueChange={([v]) => setCustomConfig(c => ({ ...c, cycles: v }))}
                  min={1}
                  max={15}
                  step={1}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-0"
                />
              </div>

              {/* Timeline preview */}
              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-2">Visualização do ciclo</p>
                <div className="flex h-2.5 rounded-full overflow-hidden bg-muted">
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
                className="w-full rounded-xl h-12 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                <PlayIcon size={20} className="mr-2" weight="fill" />
                Iniciar com {modeDetails?.name}
              </Button>
            </CardContent>
          </Card>
        </motion.section>

        {/* Info Section */}
        <motion.section variants={itemVariants} className="pt-4 pb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: '4 Fases', desc: 'State Machine' },
              { label: '11 Modos', desc: 'Visualizações' },
              { label: '60 FPS', desc: 'Canvas HD' },
              { label: 'Custom', desc: 'Personalizável' },
            ].map((item) => (
              <div key={item.label} className="text-center p-3 rounded-xl bg-card border border-border/50">
                <div className="text-lg font-display font-medium text-primary">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
        </motion.section>
      </motion.main>

      <BottomNavigation />

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
