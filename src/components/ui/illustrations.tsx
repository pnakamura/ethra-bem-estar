/**
 * ETHRA Hand-drawn Illustrations
 *
 * Minimalist illustrations with thin strokes for a refined,
 * hand-drawn aesthetic that matches the luxury feel of the app.
 */

import React from 'react';

interface IllustrationProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

const defaultProps = {
  size: 48,
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

export default {
  EmotionsIllustration,
  BreatheIllustration,
  MeditateIllustration,
  JourneyIllustration,
  JournalIllustration,
  NutritionIllustration,
  InsightsIllustration,
  StudioIllustration,
};
