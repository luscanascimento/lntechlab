import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  loop?: boolean;
}

export function useTypewriter({
  words,
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseTime = 1800,
  loop = true,
}: UseTypewriterOptions) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    let timeout: ReturnType<typeof setTimeout>;
    const fullWord = words[currentWordIndex % words.length];

    if (isDeleting) {
      timeout = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (loop ? (prev + 1) % words.length : prev + 1));
        }
      }, deletingSpeed);
    } else {
      timeout = setTimeout(() => {
        setCurrentText(fullWord.slice(0, currentText.length + 1));
        if (currentText.length === fullWord.length) {
          if (loop || currentWordIndex < words.length - 1) {
            timeout = setTimeout(() => {
              setIsDeleting(true);
            }, pauseTime);
          }
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseTime, loop]);

  return currentText;
}
