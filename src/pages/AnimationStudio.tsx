import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BreathVisualizationEngine } from '@/components/breath-engine';
import {
  WaveVisualizer,
  FluidParticles,
  MandalaVisualizer,
  CurveEditor,
} from '@/components/animation-studio';
import { breathEquations } from '@/lib/math-animations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Play,
  Sparkles,
  Waves,
  Flower2,
  Droplets,
  Snowflake,
  Globe,
  Zap,
  Cloud,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const visualModes = [
  {
    id: 'starDust',
    name: 'Pó de Estrela',
    description: 'Partículas com gravidade invertida que flutuam durante a inspiração',
    icon: Sparkles,
    color: 'from-yellow-500/20 to-amber-500/20',
    borderColor: 'border-yellow-500/30',
  },
  {
    id: 'fluid',
    name: 'Fluido Viscoso',
    description: 'Tinta se dissolvendo na água com turbulência dinâmica',
    icon: Droplets,
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
  },
  {
    id: 'crystal',
    name: 'Cristalização',
    description: 'Ordem emergindo do caos - cristais se formando na expiração',
    icon: Snowflake,
    color: 'from-violet-500/20 to-purple-500/20',
    borderColor: 'border-violet-500/30',
  },
  {
    id: 'topography',
    name: 'Topografia 3D',
    description: 'Malha esférica elástica que responde à respiração',
    icon: Globe,
    color: 'from-teal-500/20 to-emerald-500/20',
    borderColor: 'border-teal-500/30',
  },
  {
    id: 'bio',
    name: 'Bioluminescência',
    description: 'Rede neural pulsante com luz viajando pelos filamentos',
    icon: Zap,
    color: 'from-green-500/20 to-lime-500/20',
    borderColor: 'border-green-500/30',
  },
  {
    id: 'atmosphere',
    name: 'Atmosfera',
    description: 'Eclipse e nevoeiro - luz revelada na inspiração',
    icon: Cloud,
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/30',
  },
];

export default function AnimationStudio() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'engine' | 'editor' | 'preview'>('engine');
  const [showEngine, setShowEngine] = useState(false);
  const [selectedMode, setSelectedMode] = useState('starDust');

  const handleEngineComplete = (duration: number) => {
    toast.success('Sessão concluída!', {
      description: `Você praticou por ${Math.floor(duration / 60)}min ${duration % 60}s`,
    });
    setShowEngine(false);
  };

  const openStandaloneEngine = () => {
    window.open('/breath-engine.html', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
                Animation Studio
              </h1>
              <p className="text-xs text-muted-foreground">
                Motor de Visualização de Respiração
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={openStandaloneEngine}
            className="gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Abrir em Nova Aba
          </Button>
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-6">
            <TabsTrigger value="engine" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Motor
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2">
              <Waves className="w-4 h-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="editor" className="gap-2">
              <Flower2 className="w-4 h-4" />
              Editor
            </TabsTrigger>
          </TabsList>

          {/* Engine Tab */}
          <TabsContent value="engine" className="space-y-6">
            {/* Hero Section */}
            <Card className="border-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 overflow-hidden">
              <CardContent className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-[0_0_60px_rgba(78,205,196,0.4)]">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Motor de Visualização de Respiração
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    6 modos visuais abstratos baseados em física e metáforas naturais.
                    State Machine de 4 fases: Inspirar, Segurar Cheio, Expirar, Segurar Vazio.
                  </p>
                  <Button
                    size="lg"
                    onClick={() => setShowEngine(true)}
                    className="rounded-full px-10 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 shadow-lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Iniciar Experiência
                  </Button>
                </motion.div>
              </CardContent>
            </Card>

            {/* Visual Modes Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Modos Visuais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visualModes.map((mode, index) => (
                  <motion.div
                    key={mode.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={cn(
                        'cursor-pointer transition-all hover:scale-[1.02] border',
                        `bg-gradient-to-br ${mode.color}`,
                        mode.borderColor,
                        selectedMode === mode.id && 'ring-2 ring-teal-500'
                      )}
                      onClick={() => setSelectedMode(mode.id)}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-xl bg-white/10">
                            <mode.icon className="w-6 h-6 text-foreground" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{mode.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {mode.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Features */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Características</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: '4 Fases', desc: 'State Machine completa' },
                    { label: '6 Modos', desc: 'Visualizações únicas' },
                    { label: 'Tempo Real', desc: 'Animações fluidas' },
                    { label: 'Personalizável', desc: 'Cores e tempos' },
                  ].map((feature) => (
                    <div
                      key={feature.label}
                      className="text-center p-4 rounded-xl bg-muted/30"
                    >
                      <div className="text-xl font-bold text-teal-400">{feature.label}</div>
                      <div className="text-xs text-muted-foreground">{feature.desc}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Presets */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Padrões de Respiração</CardTitle>
                <CardDescription>
                  Clique para iniciar com um preset configurado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { name: 'Box Breathing', pattern: '4-4-4-4', desc: 'Equilíbrio' },
                    { name: '4-7-8', pattern: '4-7-8-0', desc: 'Relaxamento' },
                    { name: 'Coerência', pattern: '5-0-5-0', desc: 'Harmonia' },
                    { name: 'Energizante', pattern: '4-0-2-0', desc: 'Vitalidade' },
                  ].map((preset) => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      className="h-auto py-4 flex-col gap-1"
                      onClick={() => setShowEngine(true)}
                    >
                      <span className="font-semibold">{preset.name}</span>
                      <span className="text-xs text-muted-foreground">{preset.pattern}</span>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {preset.desc}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Wave Preview */}
              <Card className="border-border/50 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Waves className="w-5 h-5 text-teal-400" />
                    Visualizador de Ondas
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <WaveVisualizer
                    equation={breathEquations[0]}
                    params={{ amplitude: 1, frequency: 0.5, phase: 0 }}
                    currentTime={0.5}
                    showGrid={true}
                    colorScheme="calm"
                    height={200}
                  />
                </CardContent>
              </Card>

              {/* Particles Preview */}
              <Card className="border-border/50 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-400" />
                    Partículas Fluidas
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 h-[250px]">
                  <FluidParticles
                    breathPhase="inhale"
                    progress={0.5}
                    colorScheme="calm"
                    particleCount={60}
                  />
                </CardContent>
              </Card>

              {/* Mandala Preview */}
              <Card className="border-border/50 overflow-hidden md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Flower2 className="w-5 h-5 text-violet-400" />
                    Mandala Visualizer
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 h-[350px]">
                  <MandalaVisualizer
                    breathPhase="inhale"
                    progress={0.5}
                    colorScheme="cosmic"
                    layers={5}
                    petalsPerLayer={8}
                    rotationSpeed={0.3}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Editor Tab */}
          <TabsContent value="editor">
            <CurveEditor
              onSave={(config) => {
                toast.success('Configuração salva!');
                console.log('Saved config:', config);
              }}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Fullscreen Engine */}
      <AnimatePresence>
        {showEngine && (
          <BreathVisualizationEngine
            onClose={() => setShowEngine(false)}
            onComplete={handleEngineComplete}
            fullscreen={true}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
