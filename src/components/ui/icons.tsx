/**
 * ETHRA Icons - Phosphor Icons with Light weight
 *
 * This file exports Phosphor icons with a consistent light weight style
 * that matches the luxury minimalist aesthetic of the app.
 *
 * Usage:
 * import { HomeIcon, HeartIcon, ... } from '@/components/ui/icons';
 * <HomeIcon className="w-6 h-6" />
 */

import { IconProps } from '@phosphor-icons/react';
import {
  House,
  Heart,
  BookOpen,
  User,
  ChatCircle,
  Gear,
  ArrowLeft,
  Sun,
  Moon,
  Desktop,
  Eye,
  Palette,
  Lock,
  Shield,
  Info,
  CaretRight,
  Phone,
  DownloadSimple,
  Check,
  Sparkle,
  Play,
  Leaf,
  Wind,
  Headphones,
  Compass,
  SignIn,
  SignOut,
  Plus,
  ChartBar,
  ForkKnife,
  Smiley,
  MagicWand,
  CircleNotch,
  X,
  CaretDown,
  CaretUp,
  ArrowRight,
  Clock,
} from '@phosphor-icons/react';
import React from 'react';

// Default icon weight for the app
const DEFAULT_WEIGHT = 'light' as const;
const DEFAULT_SIZE = 24;

// Type for our custom icon props
type EthraIconProps = Omit<IconProps, 'weight'> & {
  weight?: IconProps['weight'];
};

// Helper to create icons with default light weight
const createIcon = (PhosphorIcon: React.ComponentType<IconProps>) => {
  const Icon = React.forwardRef<SVGSVGElement, EthraIconProps>(
    ({ weight = DEFAULT_WEIGHT, size = DEFAULT_SIZE, ...props }, ref) => (
      <PhosphorIcon ref={ref} weight={weight} size={size} {...props} />
    )
  );
  Icon.displayName = PhosphorIcon.displayName || 'EthraIcon';
  return Icon;
};

// ═══════════════════════════════════════════════════════════════
// NAVIGATION ICONS
// ═══════════════════════════════════════════════════════════════
export const HomeIcon = createIcon(House);
export const HeartIcon = createIcon(Heart);
export const BookOpenIcon = createIcon(BookOpen);
export const UserIcon = createIcon(User);
export const ChatIcon = createIcon(ChatCircle);
export const SettingsIcon = createIcon(Gear);
export const ArrowLeftIcon = createIcon(ArrowLeft);
export const ArrowRightIcon = createIcon(ArrowRight);
export const ChevronRightIcon = createIcon(CaretRight);
export const ChevronDownIcon = createIcon(CaretDown);
export const ChevronUpIcon = createIcon(CaretUp);

// ═══════════════════════════════════════════════════════════════
// THEME & APPEARANCE ICONS
// ═══════════════════════════════════════════════════════════════
export const SunIcon = createIcon(Sun);
export const MoonLightIcon = createIcon(Moon);
export const DesktopIcon = createIcon(Desktop);
export const EyeIcon = createIcon(Eye);
export const PaletteIcon = createIcon(Palette);

// ═══════════════════════════════════════════════════════════════
// SECURITY & PRIVACY ICONS
// ═══════════════════════════════════════════════════════════════
export const LockIcon = createIcon(Lock);
export const ShieldIcon = createIcon(Shield);
export const InfoIcon = createIcon(Info);

// ═══════════════════════════════════════════════════════════════
// APP & DEVICE ICONS
// ═══════════════════════════════════════════════════════════════
export const SmartphoneIcon = createIcon(Phone);
export const DownloadIcon = createIcon(DownloadSimple);
export const CheckIcon = createIcon(Check);
export const XIcon = createIcon(X);

// ═══════════════════════════════════════════════════════════════
// WELLNESS & MEDITATION ICONS
// ═══════════════════════════════════════════════════════════════
export const SparkleIcon = createIcon(Sparkle);
export const LeafIcon = createIcon(Leaf);
export const WindIcon = createIcon(Wind);
export const HeadphonesIcon = createIcon(Headphones);
export const CompassIcon = createIcon(Compass);

// ═══════════════════════════════════════════════════════════════
// ACTION ICONS
// ═══════════════════════════════════════════════════════════════
export const PlayIcon = createIcon(Play);
export const PlusIcon = createIcon(Plus);
export const SignInIcon = createIcon(SignIn);
export const SignOutIcon = createIcon(SignOut);

// ═══════════════════════════════════════════════════════════════
// DASHBOARD & ANALYTICS ICONS
// ═══════════════════════════════════════════════════════════════
export const ChartIcon = createIcon(ChartBar);
export const SmileyIcon = createIcon(Smiley);
export const MagicWandIcon = createIcon(MagicWand);

// ═══════════════════════════════════════════════════════════════
// NUTRITION ICONS
// ═══════════════════════════════════════════════════════════════
export const UtensilsIcon = createIcon(ForkKnife);

// ═══════════════════════════════════════════════════════════════
// STATUS ICONS
// ═══════════════════════════════════════════════════════════════
export const LoadingIcon = createIcon(CircleNotch);
export const ClockIcon = createIcon(Clock);

// ═══════════════════════════════════════════════════════════════
// RE-EXPORT PHOSPHOR TYPES
// ═══════════════════════════════════════════════════════════════
export type { IconProps };
