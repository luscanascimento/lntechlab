import React, { useEffect, useRef, useState } from 'react';
import { FallbackScene } from './FallbackScene';
import { useReducedMotion } from '../../hooks/useMediaQuery';

export const BackgroundCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isReducedMotion) {
      setHasWebGL(false);
      return;
    }

    let sceneInstance: import('./PolyhedralScene').PolyhedralScene | null = null;
    let observer: IntersectionObserver | null = null;

    const initScene = async () => {
      if (!containerRef.current) return;

      // Check WebGL availability
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
          setHasWebGL(false);
          return;
        }
      } catch {
        setHasWebGL(false);
        return;
      }

      const isMobile = window.innerWidth < 768;
      const { PolyhedralScene } = await import('./PolyhedralScene');
      
      if (!containerRef.current) return;
      sceneInstance = new PolyhedralScene(containerRef.current, { isMobile });

      // Viewport visibility observer to save GPU cycles when hero/canvas is scrolled away
      if ('IntersectionObserver' in window && containerRef.current) {
        observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              sceneInstance?.resume();
            } else {
              sceneInstance?.pause();
            }
          },
          { threshold: 0.05 }
        );
        observer.observe(containerRef.current);
      }
    };

    initScene();

    return () => {
      if (observer) observer.disconnect();
      if (sceneInstance) {
        sceneInstance.dispose();
        sceneInstance = null;
      }
    };
  }, [isReducedMotion]);

  if (!hasWebGL || isReducedMotion) {
    return <FallbackScene />;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    />
  );
};
