import { forwardRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { GuideAvatar, type AvatarState } from './GuideAvatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { formatRelativeTime, formatFullDateTime } from '@/lib/formatTime';
import { detectResponseTone } from '@/lib/emotionDetection';
import type { ChatMessage } from '@/hooks/useGuideChat';

interface MessageBubbleProps {
  message: ChatMessage;
  guideEmoji?: string;
  guideName?: string;
  isStreaming?: boolean;
  isEmpathic?: boolean;
  /** Whether this is a continuation chunk (hides guide name) */
  isChunk?: boolean;
  /** Whether this is the first chunk in a series (shows guide name) */
  isFirstChunk?: boolean;
  /** Whether the guide has "read" this user message */
  wasRead?: boolean;
}

// Patterns that indicate the guide is recalling conversation history
const memoryPatterns = [
  'como você mencionou',
  'como voce mencionou',
  'você disse',
  'voce disse',
  'lembro que',
  'anteriormente',
  'você comentou',
  'voce comentou',
  'na nossa conversa',
  'você falou',
  'voce falou',
  'como conversamos',
];

function hasMemoryReference(content: string): boolean {
  const lowerContent = content.toLowerCase();
  return memoryPatterns.some(pattern => lowerContent.includes(pattern));
}

// Map response tone to avatar state
function toneToAvatarState(tone: ReturnType<typeof detectResponseTone>): AvatarState {
  switch (tone) {
    case 'empathic': return 'empathic';
    case 'curious': return 'curious';
    case 'encouraging': return 'encouraging';
    case 'reflective': return 'reflective';
    default: return 'idle';
  }
}

export const MessageBubble = forwardRef<HTMLDivElement, MessageBubbleProps>(
  function MessageBubble(
    {
      message,
      guideEmoji = '🧘',
      guideName = 'Guia',
      isStreaming = false,
      isEmpathic = false,
      isChunk = false,
      isFirstChunk = true,
      wasRead = false,
    },
    ref
  ) {
    const isUser = message.role === 'user';
    const relativeTime = formatRelativeTime(message.createdAt);
    const fullDateTime = formatFullDateTime(message.createdAt);
    const showMemoryIndicator = !isUser && hasMemoryReference(message.content);

    // Detect tone for avatar state (only for assistant messages)
    const responseTone = useMemo(() => 
      !isUser ? detectResponseTone(message.content) : 'neutral',
      [isUser, message.content]
    );

    // Determine avatar state
    const avatarState: AvatarState = isStreaming 
      ? 'speaking' 
      : isEmpathic 
        ? 'empathic' 
        : toneToAvatarState(responseTone);

    // Hide guide name and avatar for continuation chunks
    const showGuideHeader = !isUser && (!isChunk || isFirstChunk);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 22, scale: 0.92, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1] as const,
          delay: isUser ? 0 : 0.15,
        }}
        className={cn(
          'flex gap-3 max-w-[85%]',
          isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
        )}
      >
      {/* Avatar - only for assistant, hidden on continuation chunks */}
      {!isUser && showGuideHeader && (
        <GuideAvatar
          emoji={guideEmoji}
          state={avatarState}
        />
      )}
      {/* Spacer for continuation chunks to maintain alignment */}
      {!isUser && !showGuideHeader && (
        <div className="w-10 flex-shrink-0" />
      )}

      {/* Message content */}
      <div className="flex flex-col gap-1">
        <div
          className={cn(
            'rounded-2xl px-4 py-3 text-sm leading-relaxed font-body backdrop-blur-sm',
            isUser
              ? 'rounded-br-md user-bubble'
              : 'guide-bubble text-foreground rounded-bl-md',
            isEmpathic && !isUser && 'ring-1 ring-primary/30 dark:ring-primary/20'
          )}
        >
          {showGuideHeader && (
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-xs font-medium text-muted-foreground font-body">
                {guideName}
              </span>
              {showMemoryIndicator && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  title="Seu guia lembrou de algo que você disse antes"
                  className="text-primary dark:icon-glow"
                >
                  <Sparkles className="w-3 h-3" />
                </motion.div>
              )}
            </div>
          )}
          
          {/* Render content - markdown for assistant, plain text for user */}
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-p:leading-relaxed prose-strong:text-foreground prose-em:text-muted-foreground">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}

          {/* Streaming indicator */}
          {isStreaming && !isUser && (
            <motion.span
              className="inline-block w-1.5 h-4 ml-0.5 rounded-sm bg-secondary/50"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </div>

        {/* Timestamp with read indicator and tooltip */}
        <div className={cn(
          'flex items-center gap-1',
          isUser ? 'justify-end' : 'justify-start'
        )}>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <span
                className={cn(
                  'text-xs font-body cursor-default select-none transition-opacity duration-200 hover:opacity-100',
                  'text-muted-foreground opacity-70'
                )}
              >
                {relativeTime}
              </span>
            </TooltipTrigger>
            <TooltipContent
              side={isUser ? 'left' : 'right'}
              className="bg-popover border-border text-popover-foreground font-body text-xs"
            >
              {fullDateTime}
            </TooltipContent>
          </Tooltip>
          
          {/* Read indicator for user messages */}
          {isUser && wasRead && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
              className="text-secondary"
              title="Mensagem lida"
            >
              <CheckCheck className="w-3.5 h-3.5" />
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
});

MessageBubble.displayName = 'MessageBubble';
