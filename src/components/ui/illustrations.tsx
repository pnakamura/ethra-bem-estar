/**
 * ETHRA Hand-drawn Illustrations
 *
 * Minimalist illustrations with thin strokes for a refined,
 * hand-drawn aesthetic that matches the luxury feel of the app.
 *
 * Responsive by default - uses larger sizes on bigger screens.
 */

import React from 'react';

interface IllustrationProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

const defaultProps = {
  size: 56, // Larger default size
  strokeWidth: 1.2,
};

/**
 * Emotions - A gentle smile with soft curves
 */
export const EmotionsIllustration: React.FC<IllustrationProps> = ({
  size = defaultProps.size,
  className = '',
  strokeWidth = defaultProps.strokeWidth,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Face circle */}
    <circle
      cx="24"
      cy="24"
      r="18"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* Left eye - gentle arc */}
    <path
      d="M16 20C16.5 18.5 17.5 18 19 18C20.5 18 21.5 18.5 22 20"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* Right eye - gentle arc */}
    <path
      d="M26 20C26.5 18.5 27.5 18 29 18C30.5 18 31.5 18.5 32 20"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* Smile - soft curve */}
    <path
      d="M16 28C18 32 22 34 24 34C26 34 30 32 32 28"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* Cheek blush left */}
    <circle cx="14" cy="26" r="2" fill="currentColor" opacity="0.15" />
    {/* Cheek blush right */}
    <circle cx="34" cy="26" r="2" fill="currentColor" opacity="0.15" />
  </svg>
);

/**
 * Breathe - Flowing wind/breath lines
 */
export const BreatheIllustration: React.FC<IllustrationProps> = ({
  size = defaultProps.size,
  className = '',
  strokeWidth = defaultProps.strokeWidth,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Lotus/meditation pose silhouette */}
    <path
      d="M24 38C24 38 18 34 16 30C14 26 15 22 18 20C21 18 24 20 24 20C24 20 27 18 30 20C33 22 34 26 32 30C30 34 24 38 24 38Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Head */}
    <circle
      cx="24"
      cy="14"
      r="5"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    {/* Breath flow left */}
    <path
      d="M8 22C10 20 12 21 14 20"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* Breath flow right */}
    <path
      d="M34 20C36 21 38 20 40 22"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* Upper breath line */}
    <path
      d="M10 16C12 14 14 15 16 14"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
      opacity="0.4"
    />
    <path
      d="M32 14C34 15 36 14 38 16"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
      opacity="0.4"
    />
  </svg>
);

/**
 * Meditate - Peaceful figure with aura
 */
export const MeditateIllustration: React.FC<IllustrationProps> = ({
  size = defaultProps.size,
  className = '',
  strokeWidth = defaultProps.strokeWidth,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Aura circles */}
    <circle
      cx="24"
      cy="24"
      r="20"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.6}
      strokeLinecap="round"
      strokeDasharray="2 4"
      opacity="0.3"
    />
    <circle
      cx="24"
      cy="24"
      r="16"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.6}
      strokeLinecap="round"
      strokeDasharray="2 4"
      opacity="0.5"
    />
    {/* Headphones ear cups */}
    <ellipse
      cx="12"
      cy="24"
      rx="3"
      ry="5"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    <ellipse
      cx="36"
      cy="24"
      rx="3"
      ry="5"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    {/* Headband */}
    <path
      d="M15 24C15 16 19 12 24 12C29 12 33 16 33 24"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* Sound waves */}
    <path
      d="M20 22C21 21 21 27 20 26"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M28 22C27 21 27 27 28 26"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* Musical notes */}
    <circle cx="22" cy="34" r="1.5" fill="currentColor" opacity="0.4" />
    <path d="M23.5 34V30" stroke="currentColor" strokeWidth={strokeWidth * 0.7} opacity="0.4" />
    <circle cx="26" cy="36" r="1.5" fill="currentColor" opacity="0.4" />
    <path d="M27.5 36V32" stroke="currentColor" strokeWidth={strokeWidth * 0.7} opacity="0.4" />
  </svg>
);

/**
 * Journey - Compass with path
 */
export const JourneyIllustration: React.FC<IllustrationProps> = ({
  size = defaultProps.size,
  className = '',
  strokeWidth = defaultProps.strokeWidth,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Compass circle */}
    <circle
      cx="24"
      cy="24"
      r="16"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    {/* Inner circle */}
    <circle
      cx="24"
      cy="24"
      r="3"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
    />
    {/* Compass needle - North */}
    <path
      d="M24 21L22 12L24 14L26 12L24 21Z"
      fill="currentColor"
      opacity="0.8"
    />
    {/* Compass needle - South */}
    <path
      d="M24 27L22 36L24 34L26 36L24 27Z"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      fill="none"
    />
    {/* Direction marks */}
    <line x1="24" y1="8" x2="24" y2="10" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <line x1="24" y1="38" x2="24" y2="40" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <line x1="8" y1="24" x2="10" y2="24" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <line x1="38" y1="24" x2="40" y2="24" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    {/* Path dots */}
    <circle cx="6" cy="42" r="1" fill="currentColor" opacity="0.3" />
    <circle cx="10" cy="40" r="1" fill="currentColor" opacity="0.4" />
    <circle cx="14" cy="38" r="1" fill="currentColor" opacity="0.5" />
  </svg>
);

/**
 * Journal - Open book with pen
 */
export const JournalIllustration: React.FC<IllustrationProps> = ({
  size = defaultProps.size,
  className = '',
  strokeWidth = defaultProps.strokeWidth,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Book left page */}
    <path
      d="M8 12C8 12 14 10 24 12V38C14 36 8 38 8 38V12Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    {/* Book right page */}
    <path
      d="M40 12C40 12 34 10 24 12V38C34 36 40 38 40 38V12Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    {/* Spine */}
    <line x1="24" y1="12" x2="24" y2="38" stroke="currentColor" strokeWidth={strokeWidth * 0.8} />
    {/* Writing lines left */}
    <line x1="12" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" opacity="0.5" />
    <line x1="12" y1="22" x2="18" y2="22" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" opacity="0.5" />
    <line x1="12" y1="26" x2="19" y2="26" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" opacity="0.5" />
    {/* Writing lines right */}
    <line x1="28" y1="18" x2="36" y2="18" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" opacity="0.5" />
    <line x1="28" y1="22" x2="34" y2="22" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" opacity="0.5" />
    {/* Pen */}
    <path
      d="M36 6L42 12L38 16L32 10L36 6Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <path
      d="M32 10L30 12"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Nutrition - Bowl with steam
 */
export const NutritionIllustration: React.FC<IllustrationProps> = ({
  size = defaultProps.size,
  className = '',
  strokeWidth = defaultProps.strokeWidth,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Bowl */}
    <path
      d="M8 24C8 24 8 36 24 36C40 36 40 24 40 24"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* Bowl rim */}
    <ellipse
      cx="24"
      cy="24"
      rx="16"
      ry="4"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    {/* Bowl base */}
    <ellipse
      cx="24"
      cy="40"
      rx="6"
      ry="2"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    <line x1="18" y1="36" x2="18" y2="38" stroke="currentColor" strokeWidth={strokeWidth} />
    <line x1="30" y1="36" x2="30" y2="38" stroke="currentColor" strokeWidth={strokeWidth} />
    {/* Steam waves */}
    <path
      d="M18 16C18 14 19 12 18 10"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
      opacity="0.5"
    />
    <path
      d="M24 14C24 12 25 10 24 8"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M30 16C30 14 31 12 30 10"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
      opacity="0.5"
    />
    {/* Leaf garnish */}
    <path
      d="M32 22C34 20 36 20 38 22C36 24 34 24 32 22Z"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      fill="currentColor"
      fillOpacity="0.15"
    />
  </svg>
);

/**
 * Insights - Chart with ascending trend
 */
export const InsightsIllustration: React.FC<IllustrationProps> = ({
  size = defaultProps.size,
  className = '',
  strokeWidth = defaultProps.strokeWidth,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Axis */}
    <path
      d="M10 8V38H40"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Trend line */}
    <path
      d="M14 32C18 30 20 28 24 24C28 20 30 16 36 12"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* Data points */}
    <circle cx="14" cy="32" r="2" fill="currentColor" opacity="0.8" />
    <circle cx="24" cy="24" r="2" fill="currentColor" opacity="0.8" />
    <circle cx="36" cy="12" r="2" fill="currentColor" opacity="0.8" />
    {/* Arrow at end */}
    <path
      d="M34 10L36 12L34 14"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M38 10L36 12L38 14"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Grid lines */}
    <line x1="10" y1="24" x2="40" y2="24" stroke="currentColor" strokeWidth={strokeWidth * 0.4} strokeDasharray="2 3" opacity="0.3" />
    <line x1="10" y1="16" x2="40" y2="16" stroke="currentColor" strokeWidth={strokeWidth * 0.4} strokeDasharray="2 3" opacity="0.3" />
  </svg>
);

/**
 * Studio - Magic wand with sparkles
 */
export const StudioIllustration: React.FC<IllustrationProps> = ({
  size = defaultProps.size,
  className = '',
  strokeWidth = defaultProps.strokeWidth,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Wand */}
    <path
      d="M12 36L34 14"
      stroke="currentColor"
      strokeWidth={strokeWidth * 1.5}
      strokeLinecap="round"
    />
    {/* Wand tip glow */}
    <circle
      cx="34"
      cy="14"
      r="4"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      fill="currentColor"
      fillOpacity="0.1"
    />
    {/* Main sparkle */}
    <path
      d="M34 8V10M34 18V20M28 14H30M38 14H40"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* Diagonal sparkles */}
    <path
      d="M30 10L31 11M37 17L38 18M30 18L31 17M37 11L38 10"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
      opacity="0.7"
    />
    {/* Additional sparkles */}
    <circle cx="20" cy="18" r="1" fill="currentColor" opacity="0.5" />
    <circle cx="24" cy="24" r="1.5" fill="currentColor" opacity="0.4" />
    <circle cx="18" cy="28" r="1" fill="currentColor" opacity="0.3" />
    {/* Star sparkle */}
    <path
      d="M42 26L43 28L45 28L43.5 29.5L44 32L42 30.5L40 32L40.5 29.5L39 28L41 28L42 26Z"
      fill="currentColor"
      opacity="0.6"
    />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// PLUTCHIK EMOTION ILLUSTRATIONS
// Abstract, artistic representations of the 8 primary emotions
// ═══════════════════════════════════════════════════════════════

/**
 * Joy (Alegria) - Radiating sunburst with uplifting curves
 */
export const JoyIllustration: React.FC<IllustrationProps> = ({
  size = defaultProps.size,
  className = '',
  strokeWidth = defaultProps.strokeWidth,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Central bloom */}
    <circle
      cx="24"
      cy="24"
      r="8"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    <circle
      cx="24"
      cy="24"
      r="4"
      fill="currentColor"
      opacity="0.2"
    />
    {/* Radiating petals/rays */}
    <path d="M24 6V12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M24 36V42" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M6 24H12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M36 24H42" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    {/* Diagonal rays */}
    <path d="M11 11L15 15" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" opacity="0.8" />
    <path d="M33 33L37 37" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" opacity="0.8" />
    <path d="M37 11L33 15" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" opacity="0.8" />
    <path d="M15 33L11 37" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" opacity="0.8" />
    {/* Gentle upward curves - like smiles of joy */}
    <path d="M16 18C18 16 22 16 24 16C26 16 30 16 32 18" stroke="currentColor" strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity="0.5" />
    <path d="M14 14C17 11 21 10 24 10C27 10 31 11 34 14" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" opacity="0.3" />
  </svg>
);

/**
 * Trust (Confiança) - Interlinked rings symbolizing connection
 */
export const TrustIllustration: React.FC<IllustrationProps> = ({
  size = defaultProps.size,
  className = '',
  strokeWidth = defaultProps.strokeWidth,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Left ring */}
    <circle
      cx="18"
      cy="24"
      r="10"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    {/* Right ring - interlocked */}
    <circle
      cx="30"
      cy="24"
      r="10"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    {/* Intersection highlight */}
    <path
      d="M24 16C26 18 27 21 27 24C27 27 26 30 24 32"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
      opacity="0.5"
    />
    {/* Connection dots */}
    <circle cx="24" cy="20" r="1.5" fill="currentColor" opacity="0.4" />
    <circle cx="24" cy="24" r="2" fill="currentColor" opacity="0.3" />
    <circle cx="24" cy="28" r="1.5" fill="currentColor" opacity="0.4" />
    {/* Gentle embrace curves */}
    <path d="M8 18C10 14 14 12 18 12" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" opacity="0.4" />
    <path d="M40 18C38 14 34 12 30 12" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" opacity="0.4" />
  </svg>
);

/**
 * Fear (Medo) - Shrinking, protective form
 */
export const FearIllustration: React.FC<IllustrationProps> = ({
  size = defaultProps.size,
  className = '',
  strokeWidth = defaultProps.strokeWidth,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Central huddled form */}
    <ellipse
      cx="24"
      cy="28"
      rx="10"
      ry="12"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    {/* Head/top - tucked in */}
    <circle
      cx="24"
      cy="16"
      r="6"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    {/* Protective shell lines */}
    <path
      d="M14 24C12 22 11 19 12 16"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M34 24C36 22 37 19 36 16"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* Trembling lines */}
    <path d="M8 32C9 31 10 32 11 31" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" opacity="0.4" />
    <path d="M37 32C38 31 39 32 40 31" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" opacity="0.4" />
    {/* Shrinking inward marks */}
    <path d="M6 24L10 24" stroke="currentColor" strokeWidth={strokeWidth * 0.5} strokeLinecap="round" opacity="0.3" />
    <path d="M38 24L42 24" stroke="currentColor" strokeWidth={strokeWidth * 0.5} strokeLinecap="round" opacity="0.3" />
    <path d="M6 24L8 22" stroke="currentColor" strokeWidth={strokeWidth * 0.5} strokeLinecap="round" opacity="0.3" />
    <path d="M42 24L40 22" stroke="currentColor" strokeWidth={strokeWidth * 0.5} strokeLinecap="round" opacity="0.3" />
  </svg>
);

/**
 * Surprise (Surpresa) - Starburst explosion
 */
export const SurpriseIllustration: React.FC<IllustrationProps> = ({
  size = defaultProps.size,
  className = '',
  strokeWidth = defaultProps.strokeWidth,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Central burst point */}
    <circle
      cx="24"
      cy="24"
      r="6"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    <circle cx="24" cy="24" r="2" fill="currentColor" opacity="0.3" />
    {/* Explosion rays - varying lengths */}
    <path d="M24 4V14" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M24 34V44" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M4 24H14" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M34 24H44" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    {/* Diagonal bursts */}
    <path d="M9 9L16 16" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M32 32L39 39" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M39 9L32 16" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M16 32L9 39" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    {/* Sparkle dots */}
    <circle cx="18" cy="10" r="1.5" fill="currentColor" opacity="0.5" />
    <circle cx="38" cy="18" r="1.5" fill="currentColor" opacity="0.5" />
    <circle cx="30" cy="38" r="1.5" fill="currentColor" opacity="0.5" />
    <circle cx="10" cy="30" r="1.5" fill="currentColor" opacity="0.5" />
  </svg>
);

/**
 * Sadness (Tristeza) - Drooping, wilting form with falling droplets
 */
export const SadnessIllustration: React.FC<IllustrationProps> = ({
  size = defaultProps.size,
  className = '',
  strokeWidth = defaultProps.strokeWidth,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Wilting flower/plant */}
    <path
      d="M24 42V26"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* Drooping head */}
    <path
      d="M24 26C24 26 28 24 30 20C32 16 30 12 26 10C22 8 18 10 16 14C14 18 16 24 24 26Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Drooping leaves */}
    <path
      d="M24 32C20 34 16 33 14 30"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
      opacity="0.7"
    />
    <path
      d="M24 36C28 38 32 36 34 32"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
      opacity="0.7"
    />
    {/* Falling droplets */}
    <path
      d="M10 18C10 16 11 14 12 14C13 14 14 16 14 18C14 20 13 21 12 21C11 21 10 20 10 18Z"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      opacity="0.5"
    />
    <path
      d="M36 24C36 22 37 20 38 20C39 20 40 22 40 24C40 26 39 27 38 27C37 27 36 26 36 24Z"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      opacity="0.4"
    />
    <circle cx="8" cy="28" r="1.5" fill="currentColor" opacity="0.3" />
  </svg>
);

/**
 * Disgust (Aversão) - Turning away, wave of repulsion
 */
export const DisgustIllustration: React.FC<IllustrationProps> = ({
  size = defaultProps.size,
  className = '',
  strokeWidth = defaultProps.strokeWidth,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Central form turning away */}
    <ellipse
      cx="20"
      cy="24"
      rx="10"
      ry="12"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      transform="rotate(-15 20 24)"
    />
    {/* Repulsion waves */}
    <path
      d="M32 16C36 18 38 21 38 24C38 27 36 30 32 32"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M36 14C40 17 42 20 42 24C42 28 40 31 36 34"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.6}
      strokeLinecap="round"
      opacity="0.4"
    />
    <path
      d="M40 12C44 16 46 20 46 24C46 28 44 32 40 36"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.4}
      strokeLinecap="round"
      opacity="0.2"
    />
    {/* Barrier/shield feeling */}
    <path
      d="M28 18V30"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
      strokeDasharray="2 2"
      opacity="0.5"
    />
    {/* Turning gesture marks */}
    <path d="M12 14L8 10" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" opacity="0.4" />
    <path d="M10 20L6 18" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" opacity="0.4" />
  </svg>
);

/**
 * Anger (Raiva) - Sharp angular explosion, heat waves
 */
export const AngerIllustration: React.FC<IllustrationProps> = ({
  size = defaultProps.size,
  className = '',
  strokeWidth = defaultProps.strokeWidth,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Central explosive core */}
    <polygon
      points="24,8 28,18 38,20 30,28 32,38 24,32 16,38 18,28 10,20 20,18"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.1"
    />
    {/* Inner intensity */}
    <polygon
      points="24,14 26,20 32,21 27,25 28,31 24,28 20,31 21,25 16,21 22,20"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      strokeLinejoin="round"
      opacity="0.6"
    />
    {/* Heat/pressure lines */}
    <path d="M6 12L10 16" stroke="currentColor" strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity="0.5" />
    <path d="M42 12L38 16" stroke="currentColor" strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity="0.5" />
    <path d="M6 36L10 32" stroke="currentColor" strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity="0.5" />
    <path d="M42 36L38 32" stroke="currentColor" strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity="0.5" />
    {/* Zigzag energy */}
    <path d="M4 24L7 22L4 20" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
    <path d="M44 24L41 22L44 20" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
  </svg>
);

/**
 * Anticipation (Antecipação) - Forward motion, horizon with path
 */
export const AnticipationIllustration: React.FC<IllustrationProps> = ({
  size = defaultProps.size,
  className = '',
  strokeWidth = defaultProps.strokeWidth,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Horizon line */}
    <path
      d="M4 32H44"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.6}
      strokeLinecap="round"
      opacity="0.4"
    />
    {/* Rising sun/goal on horizon */}
    <path
      d="M32 32C32 24 28 18 24 18C20 18 16 24 16 32"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* Sun rays */}
    <path d="M24 10V14" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M14 14L17 17" stroke="currentColor" strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity="0.7" />
    <path d="M34 14L31 17" stroke="currentColor" strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity="0.7" />
    {/* Path leading forward */}
    <path
      d="M20 42L24 36L28 42"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 38L24 34L26 38"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.6"
    />
    {/* Forward motion dots */}
    <circle cx="8" cy="38" r="1" fill="currentColor" opacity="0.3" />
    <circle cx="12" cy="36" r="1.5" fill="currentColor" opacity="0.4" />
    <circle cx="16" cy="34" r="2" fill="currentColor" opacity="0.5" />
    {/* Sparkle of possibility */}
    <circle cx="40" cy="20" r="2" fill="currentColor" opacity="0.3" />
    <path d="M40 16V18M40 22V24M36 20H38M42 20H44" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" opacity="0.4" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// CATEGORY ILLUSTRATIONS
// For breathing categories, nutrition, streaks, etc.
// ═══════════════════════════════════════════════════════════════

/**
 * Calming (Calmante) - Moon with gentle waves
 */
export const CalmingIllustration: React.FC<IllustrationProps> = ({
  size = defaultProps.size,
  className = '',
  strokeWidth = defaultProps.strokeWidth,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Crescent moon */}
    <path
      d="M28 8C22 10 18 16 18 24C18 32 22 38 28 40C20 40 14 33 14 24C14 15 20 8 28 8Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      fill="currentColor"
      fillOpacity="0.1"
    />
    {/* Gentle waves below */}
    <path d="M8 36C12 34 16 36 20 34C24 32 28 34 32 32C36 30 40 32 44 30" stroke="currentColor" strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity="0.5" />
    <path d="M6 40C10 38 14 40 18 38C22 36 26 38 30 36C34 34 38 36 42 34" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" opacity="0.3" />
    {/* Stars */}
    <circle cx="36" cy="12" r="1" fill="currentColor" opacity="0.6" />
    <circle cx="40" cy="18" r="1.5" fill="currentColor" opacity="0.4" />
    <circle cx="34" cy="20" r="1" fill="currentColor" opacity="0.5" />
  </svg>
);

/**
 * Energizing (Energizante) - Lightning bolt with radiating energy
 */
export const EnergizingIllustration: React.FC<IllustrationProps> = ({
  size = defaultProps.size,
  className = '',
  strokeWidth = defaultProps.strokeWidth,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Lightning bolt */}
    <path
      d="M28 4L16 22H24L20 44L36 22H26L28 4Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.1"
    />
    {/* Energy radiating */}
    <path d="M8 16L12 18" stroke="currentColor" strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity="0.5" />
    <path d="M6 24L10 24" stroke="currentColor" strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity="0.5" />
    <path d="M8 32L12 30" stroke="currentColor" strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity="0.5" />
    <path d="M40 16L36 18" stroke="currentColor" strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity="0.5" />
    <path d="M42 24L38 24" stroke="currentColor" strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity="0.5" />
    <path d="M40 32L36 30" stroke="currentColor" strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity="0.5" />
    {/* Sparkle dots */}
    <circle cx="10" cy="10" r="1.5" fill="currentColor" opacity="0.4" />
    <circle cx="38" cy="38" r="1.5" fill="currentColor" opacity="0.4" />
  </svg>
);

/**
 * Balancing (Equilibrante) - Yin-yang inspired balance
 */
export const BalancingIllustration: React.FC<IllustrationProps> = ({
  size = defaultProps.size,
  className = '',
  strokeWidth = defaultProps.strokeWidth,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer circle */}
    <circle
      cx="24"
      cy="24"
      r="18"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    />
    {/* S-curve divider */}
    <path
      d="M24 6C24 6 33 15 33 24C33 33 24 42 24 42C24 42 15 33 15 24C15 15 24 6 24 6Z"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
    />
    {/* Balance dots */}
    <circle cx="24" cy="15" r="3" fill="currentColor" opacity="0.3" />
    <circle cx="24" cy="33" r="3" stroke="currentColor" strokeWidth={strokeWidth * 0.8} />
    {/* Gentle equilibrium lines */}
    <path d="M8 24H12" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" opacity="0.4" />
    <path d="M36 24H40" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" opacity="0.4" />
  </svg>
);

/**
 * Growth/Streak (Crescimento) - Sprouting plant progression
 */
export const GrowthIllustration: React.FC<IllustrationProps> = ({
  size = defaultProps.size,
  className = '',
  strokeWidth = defaultProps.strokeWidth,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Ground line */}
    <path d="M4 40H44" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeLinecap="round" opacity="0.3" />
    {/* Main stem */}
    <path d="M24 40V16" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    {/* Leaves growing */}
    <path
      d="M24 30C20 30 16 28 16 24C16 20 20 18 24 20"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path
      d="M24 24C28 24 32 22 32 18C32 14 28 12 24 14"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      fill="currentColor"
      fillOpacity="0.1"
    />
    {/* Top bloom/bud */}
    <path
      d="M20 12C20 8 22 6 24 6C26 6 28 8 28 12"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <path
      d="M22 10C22 8 23 7 24 7C25 7 26 8 26 10"
      stroke="currentColor"
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* Growth sparkles */}
    <circle cx="12" cy="16" r="1" fill="currentColor" opacity="0.4" />
    <circle cx="36" cy="12" r="1.5" fill="currentColor" opacity="0.3" />
    <circle cx="8" cy="28" r="1" fill="currentColor" opacity="0.3" />
  </svg>
);

export default {
  // Quick Action illustrations
  EmotionsIllustration,
  BreatheIllustration,
  MeditateIllustration,
  JourneyIllustration,
  JournalIllustration,
  NutritionIllustration,
  InsightsIllustration,
  StudioIllustration,
  // Plutchik Emotion illustrations
  JoyIllustration,
  TrustIllustration,
  FearIllustration,
  SurpriseIllustration,
  SadnessIllustration,
  DisgustIllustration,
  AngerIllustration,
  AnticipationIllustration,
  // Category illustrations
  CalmingIllustration,
  EnergizingIllustration,
  BalancingIllustration,
  GrowthIllustration,
};
