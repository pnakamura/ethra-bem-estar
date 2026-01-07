import { useRef, useCallback } from 'react';

interface PacerOptions {
  onUpdate: (displayedText: string) => void;
  onComplete: () => void;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Hook to control the pacing of streamed text display
 * Creates a human-like typing rhythm with pauses at punctuation
 */
export function useStreamingPacer() {
  const bufferRef = useRef('');
  const displayedRef = useRef('');
  const isRunningRef = useRef(false);
  const abortRef = useRef(false);
  const optionsRef = useRef<PacerOptions | null>(null);
  const totalCharsRef = useRef(0);

  const getDelay = (char: string, displayedLength: number): number => {
    // Slower start - first 150 chars are slower for more human feel
    const startSlowdown = displayedLength < 150 ? 1.5 : 1;
    
    // Progressive acceleration after 500 chars to avoid being too slow
    const accelerationFactor = displayedLength > 500 
      ? Math.max(0.35, 1 - (displayedLength - 500) / 800)
      : 1;

    let baseDelay = 0;

    // End of sentence - longer pause
    if (char === '.' || char === '!' || char === '?') {
      baseDelay = 180 + Math.random() * 180; // 180-360ms
    }
    // Paragraph break - longest pause
    else if (char === '\n') {
      // Check if it's a double newline (paragraph)
      const recentText = displayedRef.current.slice(-3);
      if (recentText.endsWith('\n')) {
        baseDelay = 450 + Math.random() * 350; // 450-800ms for paragraph
      } else {
        baseDelay = 220 + Math.random() * 150; // 220-370ms for line break
      }
    }
    // Comma, semicolon - medium pause
    else if (char === ',' || char === ';' || char === ':') {
      baseDelay = 80 + Math.random() * 70; // 80-150ms
    }
    // Ellipsis indicator
    else if (char === '…' || (char === '.' && displayedRef.current.endsWith('..'))) {
      baseDelay = 280 + Math.random() * 200; // 280-480ms for "..."
    }
    // Regular character - natural typing speed
    else {
      baseDelay = 12 + Math.random() * 18; // 12-30ms
    }

    return baseDelay * accelerationFactor * startSlowdown;
  };

  const processBuffer = useCallback(async () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    while (bufferRef.current.length > displayedRef.current.length && !abortRef.current) {
      const nextIndex = displayedRef.current.length;
      const nextChar = bufferRef.current[nextIndex];
      
      // Process in small chunks - smaller at start for more deliberate feel
      let chunkSize = 1;
      if (nextChar && !/[.!?,;:\n…]/.test(nextChar)) {
        // Look ahead for non-punctuation chars
        const remaining = bufferRef.current.slice(nextIndex);
        const punctuationMatch = remaining.match(/[.!?,;:\n…]/);
        const charsUntilPunctuation = punctuationMatch?.index || remaining.length;
        
        // Smaller chunks at the start (1-2), larger later (1-5)
        const maxChunk = displayedRef.current.length < 100 ? 2 : 5;
        chunkSize = Math.min(
          Math.floor(1 + Math.random() * (maxChunk - 1)),
          charsUntilPunctuation
        );
      }

      const chunk = bufferRef.current.slice(nextIndex, nextIndex + chunkSize);
      displayedRef.current += chunk;
      
      optionsRef.current?.onUpdate(displayedRef.current);

      // Get delay based on last char of chunk
      const lastChar = chunk[chunk.length - 1];
      const delay = getDelay(lastChar, displayedRef.current.length);
      
      if (delay > 0) {
        await sleep(delay);
      }
    }

    isRunningRef.current = false;

    // Check if we're done and buffer is complete
    if (bufferRef.current.length > 0 && 
        displayedRef.current.length >= bufferRef.current.length && 
        !abortRef.current) {
      optionsRef.current?.onComplete();
    }
  }, []);

  const addToBuffer = useCallback((text: string) => {
    bufferRef.current += text;
    totalCharsRef.current += text.length;
    processBuffer();
  }, [processBuffer]);

  const start = useCallback((options: PacerOptions) => {
    bufferRef.current = '';
    displayedRef.current = '';
    isRunningRef.current = false;
    abortRef.current = false;
    totalCharsRef.current = 0;
    optionsRef.current = options;
  }, []);

  const stop = useCallback(() => {
    abortRef.current = true;
    isRunningRef.current = false;
  }, []);

  const flush = useCallback(() => {
    // Immediately show all remaining buffered content
    if (bufferRef.current.length > displayedRef.current.length) {
      displayedRef.current = bufferRef.current;
      optionsRef.current?.onUpdate(displayedRef.current);
    }
  }, []);

  const getDisplayedText = useCallback(() => displayedRef.current, []);
  const getBufferedText = useCallback(() => bufferRef.current, []);

  return {
    start,
    stop,
    flush,
    addToBuffer,
    getDisplayedText,
    getBufferedText,
  };
}
