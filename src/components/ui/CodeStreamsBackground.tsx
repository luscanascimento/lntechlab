import React, { useEffect, useRef } from 'react';

interface SyntaxToken {
  text: string;
  color: string;
  bold?: boolean;
}

interface ColumnState {
  x: number;
  width: number;
  scrollY: number;
  driftSpeed: number;
  typedGlobalChar: number;
  lastTypeTime: number;
  typeSpeedMs: number;
}

export const CodeStreamsBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Rich developer code template bank (Full stack, AI, WebGL, Security)
    const codeTemplates: SyntaxToken[][] = [
      [
        { text: 'import ', color: '#FF00FF', bold: true },
        { text: '{ ', color: '#F8FAFC' },
        { text: 'ClusterEngine, ', color: '#00FFFF' },
        { text: 'VectorStore, ', color: '#00FFFF' },
        { text: 'AuthGuard ', color: '#00FFFF' },
        { text: '} ', color: '#F8FAFC' },
        { text: 'from ', color: '#FF00FF', bold: true },
        { text: '"@lntechlab/core"', color: '#10B981' },
        { text: ';', color: '#94A3B8' },
      ],
      [
        { text: 'export ', color: '#FF00FF', bold: true },
        { text: 'interface ', color: '#FF00FF', bold: true },
        { text: 'ILNRuntime<T> ', color: '#00FFFF', bold: true },
        { text: '{', color: '#F8FAFC' },
      ],
      [
        { text: '  id: ', color: '#F8FAFC' },
        { text: 'UUIDv7;', color: '#00FFFF' },
        { text: '  // 256-bit AES cryptographic token', color: '#64748B' },
      ],
      [
        { text: '  status: ', color: '#F8FAFC' },
        { text: '"ONLINE_PROD" | "SYNCING";', color: '#10B981' },
      ],
      [
        { text: '  execute(payload: ', color: '#F8FAFC' },
        { text: 'T): ', color: '#00FFFF' },
        { text: 'Promise<Result<T>>;', color: '#38BDF8' },
      ],
      [
        { text: '}', color: '#F8FAFC' },
      ],
      [
        { text: 'export ', color: '#FF00FF', bold: true },
        { text: 'class ', color: '#FF00FF', bold: true },
        { text: 'AgentOrchestrator ', color: '#00FFFF', bold: true },
        { text: 'implements ', color: '#FF00FF' },
        { text: 'ILNRuntime<Task> ', color: '#00FFFF' },
        { text: '{', color: '#F8FAFC' },
      ],
      [
        { text: '  private ', color: '#FF00FF' },
        { text: 'readonly ', color: '#FF00FF' },
        { text: 'memory: ', color: '#F8FAFC' },
        { text: 'VectorStore;', color: '#00FFFF' },
      ],
      [
        { text: '  constructor(private ', color: '#F8FAFC' },
        { text: 'readonly ', color: '#FF00FF' },
        { text: 'vault: ', color: '#F8FAFC' },
        { text: 'SecurityVault) ', color: '#00FFFF' },
        { text: '{', color: '#F8FAFC' },
      ],
      [
        { text: '    this.memory = ', color: '#F8FAFC' },
        { text: 'new ', color: '#FF00FF' },
        { text: 'VectorStore({ dim: ', color: '#00FFFF' },
        { text: '1536, ', color: '#FACC15' },
        { text: 'strict: ', color: '#F8FAFC' },
        { text: 'true ', color: '#FACC15' },
        { text: '});', color: '#F8FAFC' },
      ],
      [
        { text: '  }', color: '#F8FAFC' },
      ],
      [
        { text: '  async ', color: '#FF00FF', bold: true },
        { text: 'execute(task: ', color: '#38BDF8' },
        { text: 'Task): ', color: '#00FFFF' },
        { text: 'Promise<Result<Task>> ', color: '#38BDF8' },
        { text: '{', color: '#F8FAFC' },
      ],
      [
        { text: '    const ', color: '#FF00FF' },
        { text: 'lock = ', color: '#F8FAFC' },
        { text: 'await ', color: '#FF00FF' },
        { text: 'Redis.distributedLock(task.id, ', color: '#00FFFF' },
        { text: '5000);', color: '#FACC15' },
      ],
      [
        { text: '    const ', color: '#FF00FF' },
        { text: 'context = ', color: '#F8FAFC' },
        { text: 'await ', color: '#FF00FF' },
        { text: 'this.memory.similaritySearch(task.prompt);', color: '#00FFFF' },
      ],
      [
        { text: '    const ', color: '#FF00FF' },
        { text: 'plan = ', color: '#F8FAFC' },
        { text: 'await ', color: '#FF00FF' },
        { text: 'LLMEngine.generate({ model: ', color: '#00FFFF' },
        { text: '"gpt-4o", ', color: '#10B981' },
        { text: 'temperature: ', color: '#F8FAFC' },
        { text: '0.1 });', color: '#FACC15' },
      ],
      [
        { text: '    await ', color: '#FF00FF' },
        { text: 'Telemetry.record({ latencyMs: ', color: '#00FFFF' },
        { text: '14.2, ', color: '#FACC15' },
        { text: 'status: ', color: '#F8FAFC' },
        { text: '"SUCCESS" });', color: '#10B981' },
      ],
      [
        { text: '    return ', color: '#FF00FF', bold: true },
        { text: 'Result.ok(plan);', color: '#F8FAFC' },
      ],
      [
        { text: '  }', color: '#F8FAFC' },
      ],
      [
        { text: '}', color: '#F8FAFC' },
      ],
      [
        { text: '// Zero-Trust Microservice Cluster & WebGL Shaders', color: '#64748B' },
      ],
      [
        { text: 'export ', color: '#FF00FF', bold: true },
        { text: 'const ', color: '#FF00FF' },
        { text: 'renderScene = (', color: '#38BDF8' },
        { text: 'gl: ', color: '#F8FAFC' },
        { text: 'WebGL2Context', color: '#00FFFF' },
        { text: ') => {', color: '#F8FAFC' },
      ],
      [
        { text: '  const ', color: '#FF00FF' },
        { text: 'polyhedron = ', color: '#F8FAFC' },
        { text: 'new ', color: '#FF00FF' },
        { text: 'THREE.IcosahedronGeometry(3.0, 0);', color: '#00FFFF' },
      ],
      [
        { text: '  shader.setUniform(', color: '#F8FAFC' },
        { text: '"uLuminance", ', color: '#10B981' },
        { text: '1.85);', color: '#FACC15' },
      ],
      [
        { text: '  gl.drawArrays(gl.LINE_STRIP, 0, polyhedron.vertices);', color: '#00FFFF' },
      ],
      [
        { text: '};', color: '#F8FAFC' },
      ],
      [
        { text: 'const ', color: '#FF00FF' },
        { text: 'vitals = ', color: '#F8FAFC' },
        { text: 'await ', color: '#FF00FF' },
        { text: 'auditCoreWebVitals({ lcp: ', color: '#00FFFF' },
        { text: '"0.8s", ', color: '#10B981' },
        { text: 'cls: ', color: '#F8FAFC' },
        { text: '0.00, ', color: '#FACC15' },
        { text: 'inp: ', color: '#F8FAFC' },
        { text: '"18ms" });', color: '#10B981' },
      ],
      [
        { text: 'export ', color: '#FF00FF', bold: true },
        { text: 'default ', color: '#FF00FF', bold: true },
        { text: 'AgentOrchestrator;', color: '#00FFFF' },
      ],
    ];

    const templateLengths = codeTemplates.map(t => t.map(tk => tk.text).join('').length);

    let columns: ColumnState[] = [];

    const initStreams = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight || 1200;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const isMobile = width < 768;
      const numCols = isMobile ? 1 : width < 1280 ? 2 : 3;
      const colWidth = width / numCols;

      columns = [];

      for (let c = 0; c < numCols; c++) {
        const initialTypedLines = 65 + c * 15;
        let initialChars = 0;
        for (let i = 0; i < initialTypedLines; i++) {
          initialChars += templateLengths[i % templateLengths.length];
        }

        columns.push({
          x: c * colWidth + (isMobile ? 14 : 28),
          width: colWidth - (isMobile ? 20 : 40),
          scrollY: 0,
          driftSpeed: 0.022 + c * 0.006,
          typedGlobalChar: initialChars,
          lastTypeTime: performance.now(),
          typeSpeedMs: 22 + Math.random() * 15,
        });
      }
    };

    initStreams();
    window.addEventListener('resize', initStreams);

    let lastTime = performance.now();

    const render = (now: number) => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      const delta = now - lastTime;
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      const lineHeight = 24;
      const font = '13px "Fira Code", ui-monospace, SFMono-Regular, monospace';

      columns.forEach((col) => {
        col.scrollY += delta * col.driftSpeed;

        if (now - col.lastTypeTime > col.typeSpeedMs) {
          col.lastTypeTime = now;
          col.typedGlobalChar += 1;
        }

        ctx.font = font;
        ctx.textBaseline = 'middle';

        const minLineIdx = Math.max(0, Math.floor((col.scrollY - 40) / lineHeight));
        const maxLineIdx = Math.ceil((col.scrollY + height + 60) / lineHeight);

        let cumulativeChars = 0;
        for (let i = 0; i < minLineIdx; i++) {
          cumulativeChars += templateLengths[i % templateLengths.length];
        }

        for (let lineIdx = minLineIdx; lineIdx <= maxLineIdx; lineIdx++) {
          const y = lineIdx * lineHeight - col.scrollY;
          const template = codeTemplates[lineIdx % codeTemplates.length];
          const lineLength = templateLengths[lineIdx % templateLengths.length];

          const lineStartChar = cumulativeChars;
          const lineEndChar = lineStartChar + lineLength;
          cumulativeChars = lineEndChar;

          const typedInThisLine = Math.max(0, Math.min(lineLength, col.typedGlobalChar - lineStartChar));

          if (typedInThisLine <= 0 && lineIdx * lineHeight > col.scrollY + 200) {
            continue;
          }

          // Subtle atmospheric opacity: 0.42 base alpha for background elegance
          let alpha = 0.42;
          if (y < 80) alpha = Math.max(0.05, y / 80) * 0.42;
          if (y > height - 30) alpha = Math.max(0.1, (height - y) / 30) * 0.42;

          // 1. Line Number
          ctx.fillStyle = '#475569';
          ctx.globalAlpha = alpha * 0.6;
          const displayNum = (lineIdx % 99) + 1;
          const numStr = displayNum < 10 ? `0${displayNum}` : `${displayNum}`;
          ctx.fillText(numStr, col.x, y);

          // 2. Syntax tokens
          let drawnSoFar = 0;
          let textX = col.x + 34;

          for (const token of template) {
            if (drawnSoFar >= typedInThisLine) break;

            const remaining = typedInThisLine - drawnSoFar;
            const chunk = token.text.slice(0, remaining);

            ctx.fillStyle = token.color;
            ctx.globalAlpha = alpha;
            ctx.fillText(chunk, textX, y);

            textX += ctx.measureText(chunk).width;
            drawnSoFar += chunk.length;
          }

          // 3. Blinking Cyan Cursor
          if (typedInThisLine > 0 && typedInThisLine < lineLength) {
            const isBlink = Math.floor(now / 240) % 2 === 0;
            if (isBlink) {
              ctx.fillStyle = '#00FFFF';
              ctx.globalAlpha = alpha * 1.8;
              ctx.fillRect(textX + 2, y - 6, 6, 14);
            }
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );

    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', initStreams);
    };
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}>
      {/* Elegant Atmospheric Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60 drop-shadow-[0_0_6px_rgba(0,255,255,0.15)]"
      />

      {/* Subtle lighting mask */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0B0F19]/20 to-[#0B0F19]/50 pointer-events-none" />
    </div>
  );
};
