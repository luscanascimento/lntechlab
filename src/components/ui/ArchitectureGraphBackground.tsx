import React, { useEffect, useRef } from 'react';

interface TechNodeData {
  name: string;
  symbol: string;
  category: 'lang' | 'framework' | 'db' | 'cloud' | 'ai' | 'graphics';
  color: string;
}

const TECH_NODES_CONFIG: TechNodeData[] = [
  { name: 'TypeScript', symbol: 'TS', category: 'lang', color: '#00FFFF' },
  { name: 'React 19', symbol: 'React', category: 'framework', color: '#38BDF8' },
  { name: 'Next.js', symbol: 'Next', category: 'framework', color: '#F8FAFC' },
  { name: 'Node.js', symbol: 'Node', category: 'lang', color: '#10B981' },
  { name: 'Fastify', symbol: 'Fastify', category: 'framework', color: '#F8FAFC' },
  { name: 'NestJS', symbol: 'Nest', category: 'framework', color: '#FF0055' },
  { name: 'PostgreSQL', symbol: 'PG', category: 'db', color: '#38BDF8' },
  { name: 'Redis', symbol: 'Redis', category: 'db', color: '#EF4444' },
  { name: 'Python', symbol: 'Py', category: 'lang', color: '#FACC15' },
  { name: 'C# / .NET 9', symbol: '.NET', category: 'lang', color: '#A855F7' },
  { name: 'Laravel', symbol: 'PHP', category: 'framework', color: '#FF2D20' },
  { name: 'Docker', symbol: 'Docker', category: 'cloud', color: '#0052FF' },
  { name: 'Kubernetes', symbol: 'K8s', category: 'cloud', color: '#38BDF8' },
  { name: 'Three.js 3D', symbol: '3D', category: 'graphics', color: '#00FFFF' },
  { name: 'Angular 21', symbol: 'Ng', category: 'framework', color: '#FF0055' },
  { name: 'Tailwind CSS', symbol: 'TW', category: 'framework', color: '#00FFFF' },
  { name: 'OpenAI / Gemini', symbol: 'AI', category: 'ai', color: '#FF00FF' },
  { name: 'Prisma ORM', symbol: 'Prisma', category: 'db', color: '#10B981' },
  { name: 'GitLab CI', symbol: 'CI/CD', category: 'cloud', color: '#F97316' },
  { name: 'SQLite WAL', symbol: 'SQLite', category: 'db', color: '#38BDF8' },
];

interface NodeInstance {
  data: TechNodeData;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  basePulse: number;
}

interface DataPacket {
  fromNodeIdx: number;
  toNodeIdx: number;
  progress: number;
  speed: number;
  color: string;
}

export const ArchitectureGraphBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
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

    let nodes: NodeInstance[] = [];
    let packets: DataPacket[] = [];
    let mouse = { x: -1000, y: -1000, active: false };

    const initGraph = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight || 1000;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const isMobile = width < 768;
      // Select subset of nodes for mobile to maintain 60fps performance
      const activeTechList = isMobile ? TECH_NODES_CONFIG.slice(0, 12) : TECH_NODES_CONFIG;

      nodes = activeTechList.map((tech, idx) => {
        // Distribute nicely across area
        const col = idx % (isMobile ? 3 : 5);
        const row = Math.floor(idx / (isMobile ? 3 : 5));
        const cellW = width / (isMobile ? 3 : 5);
        const cellH = height / (isMobile ? 4 : 4);

        const x = col * cellW + cellW * 0.5 + (Math.random() - 0.5) * (cellW * 0.5);
        const y = row * cellH + cellH * 0.5 + (Math.random() - 0.5) * (cellH * 0.5);

        return {
          data: tech,
          x: Math.max(40, Math.min(width - 40, x)),
          y: Math.max(40, Math.min(height - 40, y)),
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: isMobile ? 18 : 22,
          basePulse: Math.random() * Math.PI * 2,
        };
      });

      packets = [];
    };

    initGraph();
    window.addEventListener('resize', initGraph);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let lastPacketTime = performance.now();

    const render = (now: number) => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const maxConnectDist = width < 768 ? 140 : 210;

      // Update Node positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x < node.radius + 10) {
          node.x = node.radius + 10;
          node.vx *= -1;
        } else if (node.x > width - node.radius - 10) {
          node.x = width - node.radius - 10;
          node.vx *= -1;
        }

        if (node.y < node.radius + 10) {
          node.y = node.radius + 10;
          node.vy *= -1;
        } else if (node.y > height - node.radius - 10) {
          node.y = height - node.radius - 10;
          node.vy *= -1;
        }

        // Mouse gentle repulsion/attraction
        if (mouse.active) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120;
            node.x += (dx / dist) * force * 1.5;
            node.y += (dy / dist) * force * 1.5;
          }
        }
      });

      // Spawn data pulses between connected nodes
      if (now - lastPacketTime > 180 && nodes.length > 2) {
        lastPacketTime = now;
        const i1 = Math.floor(Math.random() * nodes.length);
        // Find a nearby node
        for (let j = 0; j < nodes.length; j++) {
          if (i1 === j) continue;
          const dist = Math.hypot(nodes[i1].x - nodes[j].x, nodes[i1].y - nodes[j].y);
          if (dist < maxConnectDist) {
            packets.push({
              fromNodeIdx: i1,
              toNodeIdx: j,
              progress: 0,
              speed: 0.012 + Math.random() * 0.015,
              color: nodes[i1].data.color,
            });
            break;
          }
        }
      }

      // Draw connection lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.35;
            ctx.strokeStyle = `rgba(0, 82, 255, ${alpha})`;
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Draw and update data pulses
      for (let pIdx = packets.length - 1; pIdx >= 0; pIdx--) {
        const p = packets[pIdx];
        p.progress += p.speed;

        const n1 = nodes[p.fromNodeIdx];
        const n2 = nodes[p.toNodeIdx];

        if (!n1 || !n2 || p.progress >= 1) {
          packets.splice(pIdx, 1);
          continue;
        }

        const px = n1.x + (n2.x - n1.x) * p.progress;
        const py = n1.y + (n2.y - n1.y) * p.progress;

        // Glowing pulse head
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw Tech Nodes
      nodes.forEach((node) => {
        const pulse = Math.sin(now * 0.0025 + node.basePulse) * 0.2 + 0.8;

        // Outer glow circle
        ctx.fillStyle = node.data.color;
        ctx.globalAlpha = 0.08 * pulse;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2);
        ctx.fill();

        // Node circle background
        ctx.fillStyle = '#0B0F19';
        ctx.globalAlpha = 0.92;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Node border stroke
        ctx.strokeStyle = node.data.color;
        ctx.globalAlpha = 0.65 * pulse;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Node Symbol Text in Center
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = 0.95;
        ctx.font = `bold ${node.radius > 20 ? '11px' : '9.5px'} "Fira Code", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.data.symbol, node.x, node.y - 0.5);

        // Tech Sub-label under node
        ctx.fillStyle = '#94A3B8';
        ctx.globalAlpha = 0.75;
        ctx.font = '9px "Inter", sans-serif';
        ctx.fillText(node.data.name, node.x, node.y + node.radius + 11);
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
      window.removeEventListener('resize', initGraph);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}>
      {/* Interactive Tech Architecture Constellation */}
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-65 drop-shadow-[0_0_12px_rgba(0,82,255,0.25)]"
      />

      {/* Soft Vignette Mask */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#090D17]/30 to-[#090D17]/80 pointer-events-none" />
    </div>
  );
};
