import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Play,
  Pause,
  RotateCcw,
  Settings2,
  X,
  Sparkles,
  Droplets,
  Snowflake,
  Globe,
  Zap,
  Cloud,
} from 'lucide-react';

// Types
type BreathPhase = 'idle' | 'inhale' | 'holdFull' | 'exhale' | 'holdEmpty' | 'complete';
type VisualMode = 'starDust' | 'fluid' | 'crystal' | 'topography' | 'bio' | 'atmosphere';

interface BreathConfig {
  inhaleTime: number;
  holdFullTime: number;
  exhaleTime: number;
  holdEmptyTime: number;
  cycles: number;
  visualMode: VisualMode;
  primaryColor: string;
  backgroundColor: string;
  complexity: number;
}

interface BreathVisualizationEngineProps {
  onClose?: () => void;
  onComplete?: (durationSeconds: number) => void;
  fullscreen?: boolean;
}

const defaultConfig: BreathConfig = {
  inhaleTime: 4,
  holdFullTime: 4,
  exhaleTime: 4,
  holdEmptyTime: 4,
  cycles: 4,
  visualMode: 'starDust',
  primaryColor: '#4ECDC4',
  backgroundColor: '#0a0a0f',
  complexity: 50,
};

const phaseNames: Record<BreathPhase, string> = {
  idle: 'PREPARAR',
  inhale: 'INSPIRE',
  holdFull: 'SEGURE',
  exhale: 'EXPIRE',
  holdEmpty: 'PAUSE',
  complete: 'COMPLETO',
};

const modeInfo: Record<VisualMode, { name: string; icon: React.ReactNode; description: string }> = {
  starDust: { name: 'Pó de Estrela', icon: <Sparkles className="w-4 h-4" />, description: 'Partículas com gravidade invertida' },
  fluid: { name: 'Fluido Viscoso', icon: <Droplets className="w-4 h-4" />, description: 'Tinta se dissolvendo na água' },
  crystal: { name: 'Cristalização', icon: <Snowflake className="w-4 h-4" />, description: 'Ordem emergindo do caos' },
  topography: { name: 'Topografia 3D', icon: <Globe className="w-4 h-4" />, description: 'Malha esférica elástica' },
  bio: { name: 'Bioluminescência', icon: <Zap className="w-4 h-4" />, description: 'Rede neural pulsante' },
  atmosphere: { name: 'Atmosfera', icon: <Cloud className="w-4 h-4" />, description: 'Eclipse e nevoeiro' },
};

// Easing functions
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

export function BreathVisualizationEngine({
  onClose,
  onComplete,
  fullscreen = true,
}: BreathVisualizationEngineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const phaseStartTimeRef = useRef<number>(0);

  const [config, setConfig] = useState<BreathConfig>(defaultConfig);
  const [phase, setPhase] = useState<BreathPhase>('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [breathIntensity, setBreathIntensity] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Visualization state
  const visualStateRef = useRef<any>({
    particles: [],
    initialized: false,
  });

  // Initialize visualization
  const initVisualization = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;
    const state = visualStateRef.current;

    state.particles = [];
    state.connections = [];
    state.nodes = [];
    state.fogLayers = [];
    state.vertices = [];
    state.crystalPoints = [];

    const count = config.complexity * 3;

    switch (config.visualMode) {
      case 'starDust':
        for (let i = 0; i < count; i++) {
          state.particles.push({
            x: Math.random() * width,
            y: height + Math.random() * 50,
            vx: 0,
            vy: 0,
            size: Math.random() * 4 + 2,
            brightness: Math.random() * 0.7 + 0.3,
          });
        }
        break;

      case 'fluid':
        state.noiseOffset = Math.random() * 1000;
        break;

      case 'crystal':
        // Crystal points
        const sides = 6;
        const layers = 3;
        for (let l = 0; l < layers; l++) {
          const radius = 50 + l * 40;
          for (let i = 0; i < sides; i++) {
            const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
            state.crystalPoints.push({
              homeX: width / 2 + Math.cos(angle) * radius,
              homeY: height / 2 + Math.sin(angle) * radius,
            });
          }
        }
        // Particles
        for (let i = 0; i < config.complexity * 2; i++) {
          state.particles.push({
            x: width / 2,
            y: height / 2,
            vx: 0,
            vy: 0,
            size: Math.random() * 5 + 3,
            crystallized: true,
          });
        }
        break;

      case 'topography':
        const res = 20;
        for (let i = 0; i <= res; i++) {
          state.vertices[i] = [];
          for (let j = 0; j <= res; j++) {
            const theta = (i / res) * Math.PI;
            const phi = (j / res) * Math.PI * 2;
            state.vertices[i][j] = {
              baseX: Math.sin(theta) * Math.cos(phi),
              baseY: Math.sin(theta) * Math.sin(phi),
              baseZ: Math.cos(theta),
              displacement: 0,
              targetDisp: 0,
              radius: Math.min(width, height) * 0.25,
            };
          }
        }
        break;

      case 'bio':
        // Central node
        state.nodes.push({
          x: width / 2,
          y: height / 2,
          brightness: 1,
          isCenter: true,
          depth: 0,
        });

        // Create branching structure
        const createBranches = (x: number, y: number, parentIndex: number, depth: number, length: number) => {
          if (depth <= 0) return;

          const branches = depth > 3 ? 5 : 3;
          const baseAngle = Math.random() * Math.PI * 2;

          for (let i = 0; i < branches; i++) {
            const angle = baseAngle + (i / branches) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
            const len = length * (0.6 + Math.random() * 0.4);
            const newX = x + Math.cos(angle) * len;
            const newY = y + Math.sin(angle) * len;

            if (newX < 50 || newX > width - 50 || newY < 50 || newY > height - 50) continue;

            const nodeIndex = state.nodes.length;
            state.nodes.push({
              x: newX,
              y: newY,
              brightness: 0,
              isCenter: false,
              depth: 5 - depth,
            });

            state.connections.push({
              from: parentIndex,
              to: nodeIndex,
              progress: 0,
              depth: 5 - depth,
            });

            createBranches(newX, newY, nodeIndex, depth - 1, length * 0.7);
          }
        };

        createBranches(width / 2, height / 2, 0, 5, 150);
        break;

      case 'atmosphere':
        for (let i = 0; i < 8; i++) {
          state.fogLayers.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 300 + 200,
            density: Math.random() * 0.5 + 0.3,
            speed: Math.random() * 0.3 + 0.2,
            angle: Math.random() * Math.PI * 2,
          });
        }
        state.lightIntensity = 0;
        break;
    }

    state.initialized = true;
  }, [config.visualMode, config.complexity]);

  // Update visualization
  const updateVisualization = useCallback((intensity: number, currentPhase: BreathPhase, frameCount: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const state = visualStateRef.current;

    // Clear
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Parse primary color
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      } : { r: 78, g: 205, b: 196 };
    };

    const rgb = hexToRgb(config.primaryColor);

    switch (config.visualMode) {
      case 'starDust':
        // Update particles
        const gravity = currentPhase === 'inhale' ? -0.15 :
                       currentPhase === 'exhale' ? 0.1 : 0;

        for (const p of state.particles) {
          if (currentPhase === 'inhale') {
            p.vy += gravity;
            p.vy *= 0.98;
            p.vx += (Math.random() - 0.5) * 0.6;
            p.vx *= 0.95;
          } else if (currentPhase === 'holdFull') {
            p.vx += (Math.random() - 0.5);
            p.vy += (Math.random() - 0.5) * 0.6;
            p.vx *= 0.92;
            p.vy *= 0.92;
          } else if (currentPhase === 'exhale') {
            p.vy += gravity;
            p.vy *= 0.99;
            p.vx *= 0.98;
          } else if (currentPhase === 'holdEmpty') {
            p.vy += 0.02;
            p.vy *= 0.9;
            p.vx *= 0.9;
            if (p.y > height - 10) {
              p.y = height - 10;
              p.vy = 0;
            }
          }

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          p.y = Math.max(0, Math.min(height, p.y));
        }

        // Draw particles
        for (const p of state.particles) {
          let alpha = p.brightness;
          let size = p.size;

          if (currentPhase === 'holdFull') {
            alpha *= 0.8 + 0.2 * Math.sin(frameCount * 0.1 + p.x * 0.01);
            size *= 1.2;
          } else if (currentPhase === 'holdEmpty') {
            alpha *= 0.2;
            size *= 0.7;
          } else {
            alpha *= 0.3 + intensity * 0.7;
          }

          // Glow
          for (let i = 3; i > 0; i--) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.2 / i})`;
            ctx.arc(p.x, p.y, size * i * 2, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        break;

      case 'fluid':
        // Inject particles on inhale
        if (currentPhase === 'inhale' && frameCount % 3 === 0) {
          const count = Math.floor(intensity * 5) + 1;
          for (let i = 0; i < count; i++) {
            state.particles.push({
              x: width / 2 + (Math.random() - 0.5) * 100,
              y: height / 2 + (Math.random() - 0.5) * 100,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              size: Math.random() * 30 + 10,
              life: 1,
              hue: (Math.random() - 0.5) * 40,
            });
          }
        }

        const turbulence = currentPhase === 'inhale' ? 0.03 :
                          currentPhase === 'holdFull' ? 0.01 :
                          currentPhase === 'exhale' ? 0.005 : 0;

        // Update fluid particles
        for (let i = state.particles.length - 1; i >= 0; i--) {
          const p = state.particles[i];

          // Simple noise-like movement
          const angle = (Math.sin(p.x * 0.01 + state.noiseOffset) + Math.cos(p.y * 0.01)) * Math.PI;
          p.vx += Math.cos(angle) * turbulence;
          p.vy += Math.sin(angle) * turbulence;

          if (currentPhase === 'exhale') {
            const dx = width / 2 - p.x;
            const dy = height / 2 - p.y;
            p.vx += dx * 0.001 * (1 - intensity);
            p.vy += dy * 0.001 * (1 - intensity);
            p.life -= 0.008;
          } else if (currentPhase === 'holdEmpty') {
            p.life -= 0.02;
          }

          p.vx *= 0.99;
          p.vy *= 0.99;
          p.x += p.vx;
          p.y += p.vy;

          if (p.life <= 0) {
            state.particles.splice(i, 1);
          }
        }

        state.noiseOffset += 0.005;

        // Draw fluid
        for (const p of state.particles) {
          for (let i = 4; i > 0; i--) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.life * 0.1 / i})`;
            ctx.arc(p.x, p.y, p.size * i, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        break;

      case 'crystal':
        // Update crystal particles
        for (const p of state.particles) {
          if (currentPhase === 'inhale') {
            p.crystallized = false;
            p.vx += (Math.random() - 0.5);
            p.vy += (Math.random() - 0.5);
          } else if (currentPhase === 'holdFull') {
            p.vx += (Math.random() - 0.5) * 0.6;
            p.vy += (Math.random() - 0.5) * 0.6;
          } else if (currentPhase === 'exhale') {
            const crystal = state.crystalPoints[Math.floor(Math.random() * state.crystalPoints.length)];
            if (crystal) {
              const dx = crystal.homeX + (Math.random() - 0.5) * 40 - p.x;
              const dy = crystal.homeY + (Math.random() - 0.5) * 40 - p.y;
              p.vx += dx * 0.02 * (1 - intensity);
              p.vy += dy * 0.02 * (1 - intensity);
            }
          } else if (currentPhase === 'holdEmpty') {
            p.crystallized = true;
            p.vx *= 0.85;
            p.vy *= 0.85;
          }

          p.vx *= 0.95;
          p.vy *= 0.95;
          p.x += p.vx;
          p.y += p.vy;
        }

        // Draw crystal structure
        if (currentPhase === 'holdEmpty' || (currentPhase === 'exhale' && intensity < 0.3)) {
          ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`;
          ctx.lineWidth = 1;

          for (let i = 0; i < state.crystalPoints.length; i++) {
            for (let j = i + 1; j < state.crystalPoints.length; j++) {
              const p1 = state.crystalPoints[i];
              const p2 = state.crystalPoints[j];
              const d = Math.hypot(p2.homeX - p1.homeX, p2.homeY - p1.homeY);
              if (d < 100) {
                ctx.beginPath();
                ctx.moveTo(p1.homeX, p1.homeY);
                ctx.lineTo(p2.homeX, p2.homeY);
                ctx.stroke();
              }
            }
          }
        }

        // Draw particles
        for (const p of state.particles) {
          let alpha = p.crystallized ? 0.8 : 0.4 + intensity * 0.4;

          if (currentPhase === 'holdFull') {
            alpha *= 0.6 + 0.4 * Math.sin(frameCount * 0.05 + p.x * 0.02);
          }

          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;

          if (p.crystallized && currentPhase === 'holdEmpty') {
            // Hexagon
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
              const x = p.x + Math.cos(angle) * p.size;
              const y = p.y + Math.sin(angle) * p.size;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        break;

      case 'topography':
        const res = 20;
        const time = frameCount * 0.02;
        const centerX = width / 2;
        const centerY = height / 2;
        const rotY = frameCount * 0.005;

        // Update vertices
        for (let i = 0; i <= res; i++) {
          for (let j = 0; j <= res; j++) {
            const v = state.vertices[i]?.[j];
            if (!v) continue;

            if (currentPhase === 'inhale') {
              const noiseVal = Math.sin(v.baseX * 2 + time) * Math.cos(v.baseY * 2 + time);
              v.targetDisp = Math.abs(noiseVal) * intensity * 80;
            } else if (currentPhase === 'holdFull') {
              v.targetDisp += (Math.random() - 0.5) * 10;
            } else if (currentPhase === 'exhale') {
              v.targetDisp = v.targetDisp * intensity;
            } else if (currentPhase === 'holdEmpty') {
              v.targetDisp *= 0.9;
            }

            v.displacement += (v.targetDisp - v.displacement) * 0.1;
          }
        }

        // Project and draw
        const getProjected = (i: number, j: number) => {
          const v = state.vertices[i]?.[j];
          if (!v) return null;

          const r = v.radius + v.displacement;
          let x = v.baseX * r;
          let y = v.baseY * r;
          let z = v.baseZ * r;

          // Rotate Y
          const tempX = x * Math.cos(rotY) - z * Math.sin(rotY);
          z = x * Math.sin(rotY) + z * Math.cos(rotY);
          x = tempX;

          return { x: centerX + x, y: centerY + y, glow: v.displacement / 80 };
        };

        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${currentPhase === 'holdEmpty' ? 0.3 : 0.4 + intensity * 0.5})`;
        ctx.lineWidth = currentPhase === 'holdFull' ? 1.5 : 1;

        for (let i = 0; i < res; i++) {
          for (let j = 0; j < res; j++) {
            const p1 = getProjected(i, j);
            const p2 = getProjected(i + 1, j);
            const p3 = getProjected(i, j + 1);

            if (!p1 || !p2 || !p3) continue;

            if (currentPhase === 'holdFull' && p1.glow > 0.3) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 + p1.glow * 0.6})`;
            } else {
              ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.3 + intensity * 0.5})`;
            }

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.stroke();
          }
        }
        break;

      case 'bio':
        // Update bioluminescence
        if (currentPhase === 'inhale') {
          for (const c of state.connections) {
            const targetProgress = Math.min(1, Math.max(0, intensity * 5 - c.depth));
            c.progress += (targetProgress - c.progress) * 0.1;
          }
          for (const n of state.nodes) {
            if (n.isCenter) {
              n.brightness = 0.3 + intensity * 0.7;
            } else {
              const targetBright = Math.min(1, Math.max(0, intensity * 5 - n.depth));
              n.brightness += (targetBright - n.brightness) * 0.1;
            }
          }
        } else if (currentPhase === 'holdFull') {
          for (const n of state.nodes) {
            n.brightness = 0.8 + 0.2 * Math.sin(frameCount * 0.1 + n.x * 0.01);
          }
          for (const c of state.connections) {
            c.progress = 1;
          }
        } else if (currentPhase === 'exhale') {
          for (const c of state.connections) {
            const targetProgress = Math.min(1, Math.max(0, (1 - intensity) * 5 - (4 - c.depth)));
            c.progress += (targetProgress - c.progress) * 0.1;
          }
          for (const n of state.nodes) {
            if (n.isCenter) {
              n.brightness = 0.3 + (1 - intensity) * 0.7;
            } else {
              const targetBright = Math.min(1, Math.max(0, (1 - intensity) * 5 - (4 - n.depth)));
              n.brightness += (targetBright - n.brightness) * 0.1;
            }
          }
        } else if (currentPhase === 'holdEmpty') {
          for (const n of state.nodes) {
            if (n.isCenter) {
              n.brightness = 0.15 + 0.1 * Math.sin(frameCount * 0.05);
            } else {
              n.brightness *= 0.95;
            }
          }
          for (const c of state.connections) {
            c.progress *= 0.95;
          }
        }

        // Draw connections
        for (const c of state.connections) {
          const from = state.nodes[c.from];
          const to = state.nodes[c.to];
          if (!from || !to) continue;

          const alpha = c.progress;

          for (let i = 3; i > 0; i--) {
            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.6 / i})`;
            ctx.lineWidth = i * 2;
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
          }
        }

        // Draw nodes
        for (const n of state.nodes) {
          const size = n.isCenter ? 15 : 8;
          const alpha = n.brightness;

          for (let i = 4; i > 0; i--) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.2 / i})`;
            ctx.arc(n.x, n.y, size * i * 2, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.arc(n.x, n.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        break;

      case 'atmosphere':
        // Update atmosphere
        if (currentPhase === 'inhale') {
          state.lightIntensity = intensity;
          for (const f of state.fogLayers) {
            f.density = 0.8 - intensity * 0.7;
          }
        } else if (currentPhase === 'holdFull') {
          state.lightIntensity = 1;
          for (const f of state.fogLayers) {
            f.density = 0.1;
          }
        } else if (currentPhase === 'exhale') {
          state.lightIntensity = 1 - intensity;
          for (const f of state.fogLayers) {
            f.density = 0.1 + intensity * 0.7;
          }
        } else if (currentPhase === 'holdEmpty') {
          state.lightIntensity *= 0.95;
          for (const f of state.fogLayers) {
            f.density = 0.9;
          }
        }

        // Move fog
        for (const f of state.fogLayers) {
          f.x += Math.cos(f.angle) * f.speed;
          f.y += Math.sin(f.angle) * f.speed;

          if (f.x < -f.size) f.x = width + f.size;
          if (f.x > width + f.size) f.x = -f.size;
          if (f.y < -f.size) f.y = height + f.size;
          if (f.y > height + f.size) f.y = -f.size;
        }

        // Draw light
        const lightSize = 100 + state.lightIntensity * 300;

        ctx.globalCompositeOperation = 'lighter';
        for (let i = 8; i > 0; i--) {
          const rayAlpha = state.lightIntensity * 0.15 / i;
          ctx.beginPath();
          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rayAlpha})`;
          ctx.arc(width / 2, height / 2, lightSize * i, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${state.lightIntensity * 0.8})`;
        ctx.arc(width / 2, height / 2, lightSize * 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

        // Draw fog
        for (const f of state.fogLayers) {
          for (let i = 3; i > 0; i--) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(30, 30, 40, ${f.density * 0.3 / i})`;
            ctx.arc(f.x, f.y, f.size * i, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Vignette
        if (currentPhase === 'exhale' || currentPhase === 'holdEmpty') {
          const shadowIntensity = currentPhase === 'holdEmpty' ? 0.9 : intensity;

          for (let i = 0; i < 10; i++) {
            const alpha = shadowIntensity * 0.1 * (10 - i) / 10;
            ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
            ctx.lineWidth = 50;
            ctx.strokeRect(-25 + i * 15, -25 + i * 15, width + 50 - i * 30, height + 50 - i * 30);
          }
        }
        break;
    }
  }, [config.visualMode, config.primaryColor, config.backgroundColor]);

  // Main animation loop
  const animate = useCallback((frameCount: number) => {
    if (!isRunning) return;

    const now = performance.now();
    const phaseElapsed = now - phaseStartTimeRef.current;

    // Get phase duration
    let duration = 0;
    switch (phase) {
      case 'inhale': duration = config.inhaleTime * 1000; break;
      case 'holdFull': duration = config.holdFullTime * 1000; break;
      case 'exhale': duration = config.exhaleTime * 1000; break;
      case 'holdEmpty': duration = config.holdEmptyTime * 1000; break;
    }

    const progress = Math.min(1, phaseElapsed / duration);
    setPhaseProgress(progress);

    // Calculate breath intensity
    let newIntensity = 0;
    switch (phase) {
      case 'inhale': newIntensity = easeInOutSine(progress); break;
      case 'holdFull': newIntensity = 1; break;
      case 'exhale': newIntensity = 1 - easeInOutSine(progress); break;
      case 'holdEmpty': newIntensity = 0; break;
    }
    setBreathIntensity(newIntensity);

    // Update visualization
    updateVisualization(newIntensity, phase, frameCount);

    // Phase transitions
    if (progress >= 1) {
      let nextPhase: BreathPhase = 'idle';
      let newCycle = currentCycle;

      switch (phase) {
        case 'inhale':
          nextPhase = config.holdFullTime > 0 ? 'holdFull' : 'exhale';
          break;
        case 'holdFull':
          nextPhase = 'exhale';
          break;
        case 'exhale':
          nextPhase = config.holdEmptyTime > 0 ? 'holdEmpty' : 'inhale';
          if (config.holdEmptyTime <= 0) newCycle++;
          break;
        case 'holdEmpty':
          newCycle++;
          nextPhase = 'inhale';
          break;
      }

      // Check if cycles complete
      if (newCycle > config.cycles) {
        setPhase('complete');
        setIsRunning(false);
        const duration = Math.round((now - startTimeRef.current) / 1000);
        onComplete?.(duration);
        return;
      }

      setCurrentCycle(newCycle);
      setPhase(nextPhase);
      phaseStartTimeRef.current = now;
    }

    animationRef.current = requestAnimationFrame(() => animate(frameCount + 1));
  }, [isRunning, phase, config, currentCycle, updateVisualization, onComplete]);

  // Start breathing
  const startBreathing = useCallback(async () => {
    // Countdown
    for (let i = 3; i > 0; i--) {
      setCountdown(i);
      await new Promise(r => setTimeout(r, 1000));
    }
    setCountdown(0);

    initVisualization();
    setPhase('inhale');
    setCurrentCycle(1);
    setIsRunning(true);
    startTimeRef.current = performance.now();
    phaseStartTimeRef.current = performance.now();
  }, [initVisualization]);

  // Stop
  const stopBreathing = useCallback(() => {
    setIsRunning(false);
    setPhase('idle');
    setCurrentCycle(0);
    setPhaseProgress(0);
    setBreathIntensity(0);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  // Canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      if (visualStateRef.current.initialized) {
        initVisualization();
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, [initVisualization]);

  // Animation loop
  useEffect(() => {
    if (isRunning) {
      animationRef.current = requestAnimationFrame(() => animate(0));
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, animate]);

  // Initialize on mode change
  useEffect(() => {
    if (visualStateRef.current.initialized) {
      initVisualization();
    }
  }, [config.visualMode, config.complexity, initVisualization]);

  const remainingTime = Math.ceil(
    ((phase === 'inhale' ? config.inhaleTime :
      phase === 'holdFull' ? config.holdFullTime :
      phase === 'exhale' ? config.exhaleTime :
      config.holdEmptyTime) * 1000 * (1 - phaseProgress)) / 1000
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        'bg-black flex flex-col',
        fullscreen ? 'fixed inset-0 z-50' : 'relative w-full h-full min-h-[600px]'
      )}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4">
        <div>
          <h2 className="text-xl font-semibold text-white/90">Motor de Respiração</h2>
          <p className="text-sm text-white/60">{modeInfo[config.visualMode].name}</p>
        </div>

        <div className="flex items-center gap-2">
          <Sheet open={showSettings} onOpenChange={setShowSettings}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10">
                <Settings2 className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-slate-900 border-slate-800 text-white overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-white">Configurações</SheetTitle>
              </SheetHeader>

              <div className="space-y-6 mt-6">
                {/* Timing */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-white/80">Tempos (segundos)</h3>

                  {[
                    { key: 'inhaleTime', label: 'Inspirar' },
                    { key: 'holdFullTime', label: 'Segurar (cheio)' },
                    { key: 'exhaleTime', label: 'Expirar' },
                    { key: 'holdEmptyTime', label: 'Segurar (vazio)' },
                  ].map(({ key, label }) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">{label}</span>
                        <Badge variant="secondary" className="bg-white/10">
                          {config[key as keyof BreathConfig]}s
                        </Badge>
                      </div>
                      <Slider
                        value={[config[key as keyof BreathConfig] as number]}
                        onValueChange={([v]) => setConfig(c => ({ ...c, [key]: v }))}
                        min={0}
                        max={10}
                        step={0.5}
                        className="[&_[role=slider]]:bg-teal-500"
                      />
                    </div>
                  ))}

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Ciclos</span>
                      <Badge variant="secondary" className="bg-white/10">{config.cycles}</Badge>
                    </div>
                    <Slider
                      value={[config.cycles]}
                      onValueChange={([v]) => setConfig(c => ({ ...c, cycles: v }))}
                      min={1}
                      max={10}
                      step={1}
                      className="[&_[role=slider]]:bg-teal-500"
                    />
                  </div>
                </div>

                {/* Visual Mode */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Modo Visual</label>
                  <Select
                    value={config.visualMode}
                    onValueChange={(v) => setConfig(c => ({ ...c, visualMode: v as VisualMode }))}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-800">
                      {Object.entries(modeInfo).map(([key, { name, icon, description }]) => (
                        <SelectItem key={key} value={key} className="text-white focus:bg-white/10">
                          <div className="flex items-center gap-2">
                            {icon}
                            <div>
                              <div>{name}</div>
                              <div className="text-xs text-white/50">{description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Presets */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Presets</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'Box', i: 4, hf: 4, e: 4, he: 4 },
                      { name: '4-7-8', i: 4, hf: 7, e: 8, he: 0 },
                      { name: 'Coerência', i: 5, hf: 0, e: 5, he: 0 },
                      { name: 'Energia', i: 4, hf: 0, e: 2, he: 0 },
                    ].map(preset => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10"
                        onClick={() => setConfig(c => ({
                          ...c,
                          inhaleTime: preset.i,
                          holdFullTime: preset.hf,
                          exhaleTime: preset.e,
                          holdEmptyTime: preset.he,
                        }))}
                      >
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Complexity */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Complexidade</span>
                    <Badge variant="secondary" className="bg-white/10">{config.complexity}</Badge>
                  </div>
                  <Slider
                    value={[config.complexity]}
                    onValueChange={([v]) => setConfig(c => ({ ...c, complexity: v }))}
                    min={10}
                    max={100}
                    step={5}
                    className="[&_[role=slider]]:bg-teal-500"
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white/80 hover:text-white hover:bg-white/10">
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Cycle indicator */}
      {isRunning && phase !== 'idle' && phase !== 'complete' && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {Array.from({ length: config.cycles }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-all',
                i < currentCycle - 1 ? 'bg-teal-500/50' :
                i === currentCycle - 1 ? 'bg-teal-500 shadow-[0_0_15px_rgba(78,205,196,0.8)]' :
                'bg-white/20'
              )}
            />
          ))}
        </div>
      )}

      {/* Phase indicator */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center z-10">
        <AnimatePresence mode="wait">
          {countdown > 0 ? (
            <motion.div
              key={`countdown-${countdown}`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="text-8xl font-thin text-white"
            >
              {countdown}
            </motion.div>
          ) : isRunning && phase !== 'complete' ? (
            <motion.div
              key={phase}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              <div className="text-4xl font-light text-white tracking-[0.3em] mb-3">
                {phaseNames[phase]}
              </div>
              <div className="text-6xl font-thin text-white/80">
                {remainingTime}
              </div>
            </motion.div>
          ) : phase === 'complete' ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-light text-teal-400"
            >
              COMPLETO
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl text-white/60"
            >
              Pressione iniciar
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      {isRunning && (
        <div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-100"
          style={{ width: `${phaseProgress * 100}%` }}
        />
      )}

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
        {!isRunning && phase !== 'complete' && (
          <Button
            onClick={startBreathing}
            size="lg"
            className="rounded-full w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 shadow-[0_0_40px_rgba(78,205,196,0.4)]"
          >
            <Play className="w-8 h-8 ml-1" />
          </Button>
        )}

        {isRunning && (
          <Button
            onClick={stopBreathing}
            size="lg"
            variant="outline"
            className="rounded-full w-16 h-16 border-white/30 text-white hover:bg-white/10"
          >
            <Pause className="w-6 h-6" />
          </Button>
        )}

        {phase === 'complete' && (
          <>
            <Button
              onClick={() => {
                stopBreathing();
              }}
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-white/30 text-white hover:bg-white/10"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Repetir
            </Button>
            {onClose && (
              <Button
                onClick={onClose}
                size="lg"
                className="rounded-full px-8 bg-gradient-to-br from-teal-500 to-cyan-500"
              >
                Concluir
              </Button>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
