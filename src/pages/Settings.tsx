import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { BottomNavigation } from '@/components/BottomNavigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { useAccessibility, FontScale } from '@/hooks/useAccessibility';
import {
  ArrowLeftIcon,
  MoonLightIcon,
  SunIcon,
  DesktopIcon,
  LockIcon,
  InfoIcon,
  ChevronRightIcon,
  PaletteIcon,
  ShieldIcon,
  SmartphoneIcon,
  DownloadIcon,
  CheckIcon,
  EyeIcon,
} from '@/components/ui/icons';

type ThemeOption = 'light' | 'dark' | 'system';

export default function Settings() {
  const navigate = useNavigate();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isInstallable, isInstalled, isIOS, promptInstall } = usePWAInstall();
  const { fontScale, setFontScale, mounted: accessibilityMounted } = useAccessibility();

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeOptions: { value: ThemeOption; label: string; icon: React.ElementType; description: string }[] = [
    { value: 'light', label: 'Claro', icon: SunIcon, description: 'Tema claro elegante' },
    { value: 'dark', label: 'Escuro', icon: MoonLightIcon, description: 'Tema escuro sofisticado' },
    { value: 'system', label: 'Sistema', icon: DesktopIcon, description: 'Segue seu dispositivo' },
  ];

  const fontScaleOptions: { value: FontScale; label: string; size: string }[] = [
    { value: 'normal', label: 'Normal', size: '125%' },
    { value: 'large', label: 'Grande', size: '140%' },
    { value: 'xlarge', label: 'Extra', size: '156%' },
  ];

  const currentTheme = (theme as ThemeOption) || 'system';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col pb-28 bg-background">
      {/* Subtle Background Gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute bottom-32 left-0 w-[400px] h-[400px] rounded-full bg-secondary/3 blur-3xl" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative pt-12 px-6 pb-8"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-11 h-11 rounded-xl bg-card border border-border/50 flex items-center justify-center hover:bg-muted/50 hover:border-primary/20 transition-all duration-300"
          >
            <ArrowLeftIcon size={22} className="text-foreground" />
          </button>
          <div>
            <h1 className="font-display text-2xl font-medium text-foreground">Configurações</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Personalize sua experiência</p>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative flex-1 px-6 space-y-8"
      >
        {/* Theme Section */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-2.5 mb-4 px-1">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <PaletteIcon size={18} className="text-primary" />
            </div>
            <h2 className="text-base font-medium text-foreground">Tema</h2>
          </div>

          <div className="bg-card rounded-2xl border border-border/50 p-5 shadow-sm">
            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = currentTheme === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={cn(
                      "relative flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-300",
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "bg-muted/50 hover:bg-muted text-foreground border border-transparent hover:border-primary/10"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                      isSelected ? "bg-primary-foreground/20" : "bg-background"
                    )}>
                      <Icon size={22} />
                    </div>
                    <span className="text-sm font-medium">{option.label}</span>
                    {isSelected && (
                      <motion.div
                        layoutId="theme-indicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-foreground"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {mounted && (
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground text-center">
                  Tema atual: <span className="text-foreground font-medium">{resolvedTheme === 'dark' ? 'Escuro' : 'Claro'}</span>
                </p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Accessibility Section */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-2.5 mb-4 px-1">
            <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
              <EyeIcon size={18} className="text-secondary" />
            </div>
            <h2 className="text-base font-medium text-foreground">Acessibilidade</h2>
          </div>

          <div className="bg-card rounded-2xl border border-border/50 p-5 shadow-sm space-y-5">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-foreground">Tamanho do Texto</span>
                {accessibilityMounted && (
                  <span className="text-xs text-primary font-medium px-2 py-1 rounded-full bg-primary/10">
                    {fontScale === 'normal' ? '125%' : fontScale === 'large' ? '140%' : '156%'}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                {fontScaleOptions.map((option) => {
                  const isSelected = fontScale === option.value;

                  return (
                    <button
                      key={option.value}
                      onClick={() => setFontScale(option.value)}
                      className={cn(
                        "flex-1 py-3 rounded-xl transition-all duration-300 text-sm font-medium",
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/15"
                          : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preview */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Pré-visualização</p>
              <p className="text-sm text-foreground leading-relaxed">
                Este é um exemplo de como o texto aparecerá. Ajuste para melhor conforto.
              </p>
            </div>
          </div>
        </motion.section>

        {/* App Installation Section */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-2.5 mb-4 px-1">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <SmartphoneIcon size={18} className="text-accent" />
            </div>
            <h2 className="text-base font-medium text-foreground">Aplicativo</h2>
          </div>

          <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
            {isInstalled ? (
              <div className="flex items-center gap-4 p-5">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <CheckIcon size={22} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground block">Instalado</span>
                  <span className="text-xs text-muted-foreground">
                    ETHRA está na sua tela inicial
                  </span>
                </div>
              </div>
            ) : isIOS ? (
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                    <DownloadIcon size={22} className="text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Instalar no iOS</span>
                </div>
                <ol className="text-sm text-muted-foreground space-y-2 pl-16">
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium">1</span>
                    Toque em Compartilhar
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium">2</span>
                    "Adicionar à Tela de Início"
                  </li>
                </ol>
              </div>
            ) : (
              <button
                onClick={promptInstall}
                disabled={!isInstallable}
                className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-all duration-300 disabled:opacity-50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <DownloadIcon size={22} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-medium text-foreground block">Instalar Aplicativo</span>
                    <span className="text-xs text-muted-foreground">
                      {isInstallable ? 'Acesso rápido pela tela inicial' : 'Use um navegador compatível'}
                    </span>
                  </div>
                </div>
                <ChevronRightIcon size={22} className="text-muted-foreground" />
              </button>
            )}
          </div>
        </motion.section>

        {/* Privacy & Security Section */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-2.5 mb-4 px-1">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <LockIcon size={18} className="text-muted-foreground" />
            </div>
            <h2 className="text-base font-medium text-foreground">Privacidade</h2>
          </div>

          <div className="bg-card rounded-2xl border border-border/50 divide-y divide-border/30 overflow-hidden shadow-sm">
            <button
              onClick={() => navigate('/privacy')}
              className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">
                  <ShieldIcon size={18} className="text-muted-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  Política de Privacidade
                </span>
              </div>
              <ChevronRightIcon size={22} className="text-muted-foreground" />
            </button>

            <button
              onClick={() => navigate('/privacy#liability')}
              className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">
                  <InfoIcon size={18} className="text-muted-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  Termos de Uso
                </span>
              </div>
              <ChevronRightIcon size={22} className="text-muted-foreground" />
            </button>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-2.5 mb-4 px-1">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <InfoIcon size={18} className="text-muted-foreground" />
            </div>
            <h2 className="text-base font-medium text-foreground">Sobre</h2>
          </div>

          <div className="bg-card rounded-2xl border border-border/50 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="font-display text-primary font-medium text-sm">E</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground block">ETHRA</span>
                  <span className="text-xs text-muted-foreground">Bem-estar & Meditação</span>
                </div>
              </div>
              <span className="text-sm text-muted-foreground font-medium px-3 py-1.5 rounded-full bg-muted/50">v1.0.0</span>
            </div>
          </div>
        </motion.section>

        {/* Bottom spacing */}
        <div className="h-4" />
      </motion.main>

      <BottomNavigation />
    </div>
  );
}
