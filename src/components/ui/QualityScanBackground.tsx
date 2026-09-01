import React, { useEffect, useRef } from 'react';

interface AuditCheck {
  x: number;
  y: number;
  label: string;
  tag: string;
  status: 'PASS' | 'SECURE' | 'OPTIMAL';
  color: string;
  activeProgress: number;
}

export const QualityScanBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
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

    let scanY = 0;
    let scanSpeed = 1.2;

    const auditItems: AuditCheck[] = [
      { x: 0.12, y: 0.18, label: 'UNIT_TEST_COVERAGE', tag: '> 95% PASS', status: 'PASS', color: '#10B981', activeProgress: 0 },
      { x: 0.82, y: 0.22, label: 'VAULT_ENCRYPTION', tag: 'AES-256-GCM', status: 'SECURE', color: '#00FFFF', activeProgress: 0 },
      { x: 0.22, y: 0.52, label: 'STATIC_CODE_ANALYSIS', tag: '0 DEFECTS', status: 'PASS', color: '#10B981', activeProgress: 0 },
      { x: 0.78, y: 0.60, label: 'AUTH_ZERO_TRUST', tag: 'RFC 6238 TOTP', status: 'SECURE', color: '#FF00FF', activeProgress: 0 },
      { x: 0.15, y: 0.82, label: 'CORE_WEB_VITALS', tag: 'LCP 0.8s (100)', status: 'OPTIMAL', color: '#10B981', activeProgress: 0 },
      { x: 0.85, y: 0.85, label: 'DEPLOY_STATUS', tag: 'ZERO_DOWNTIME', status: 'PASS', color: '#38BDF8', activeProgress: 0 },
      { x: 0.48, y: 0.38, label: 'BOLA_REMEDIATION', tag: 'STRICT_RBAC', status: 'SECURE', color: '#00FFFF', activeProgress: 0 },
      { x: 0.52, y: 0.72, label: 'LATENCY_P99_SLA', tag: '< 25ms GLOBAL', status: 'OPTIMAL', color: '#10B981', activeProgress: 0 },
    ];

    const initCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight || 1100;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    initCanvas();
    window.addEventListener('resize', initCanvas);

    let lastTime = performance.now();

    const render = (now: number) => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      const delta = now - lastTime;
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // Move vertical laser scan line downwards
      scanY += scanSpeed * (delta / 16);
      if (scanY > height + 80) {
        scanY = -60;
      }

      // 1. Draw subtle background laser grid lines
      const gridSize = 48;
      ctx.strokeStyle = 'rgba(0, 82, 255, 0.08)';
      ctx.lineWidth = 0.75;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw Moving Security Laser Sweep Beam
      if (scanY >= 0 && scanY <= height) {
        // Laser Beam Gradient Trail
        const beamGrad = ctx.createLinearGradient(0, scanY - 45, 0, scanY + 5);
        beamGrad.addColorStop(0, 'rgba(0, 255, 255, 0)');
        beamGrad.addColorStop(0.7, 'rgba(0, 82, 255, 0.08)');
        beamGrad.addColorStop(1, 'rgba(0, 255, 255, 0.35)');

        ctx.fillStyle = beamGrad;
        ctx.fillRect(0, scanY - 45, width, 50);

        // Core bright laser line
        ctx.strokeStyle = '#00FFFF';
        ctx.shadowColor = '#00FFFF';
        ctx.shadowBlur = 10;
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(width, scanY);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // 3. Draw Floating Audit & Quality Verification Nodes
      const isMobile = width < 768;
      const itemsToDraw = isMobile ? auditItems.slice(0, 5) : auditItems;

      itemsToDraw.forEach((item) => {
        const itemX = item.x * width;
        const itemY = item.y * height;

        // Check if laser is currently scanning this node
        const distToScan = Math.abs(scanY - itemY);
        if (distToScan < 35) {
          item.activeProgress = 1.0;
        } else {
          item.activeProgress = Math.max(0, item.activeProgress - 0.015);
        }

        const pulse = Math.sin(now * 0.003 + itemX) * 0.15 + 0.85;
        const scanGlow = item.activeProgress;

        // Node Shield Box
        const boxW = isMobile ? 120 : 155;
        const boxH = 34;

        ctx.fillStyle = '#0B0F19';
        ctx.globalAlpha = 0.85;
        ctx.fillRect(itemX - boxW / 2, itemY - boxH / 2, boxW, boxH);

        // Border with laser activation highlight
        ctx.strokeStyle = scanGlow > 0 ? '#00FFFF' : item.color;
        ctx.globalAlpha = Math.max(0.25, scanGlow * 0.9) * pulse;
        ctx.lineWidth = scanGlow > 0 ? 1.5 : 1;
        ctx.strokeRect(itemX - boxW / 2, itemY - boxH / 2, boxW, boxH);

        // Corner bracket accents
        const bX = itemX - boxW / 2;
        const bY = itemY - boxH / 2;
        ctx.fillStyle = item.color;
        ctx.globalAlpha = 0.85;
        ctx.fillRect(bX - 1, bY - 1, 4, 2);
        ctx.fillRect(bX - 1, bY - 1, 2, 4);
        ctx.fillRect(bX + boxW - 3, bY - 1, 4, 2);
        ctx.fillRect(bX + boxW - 1, bY - 1, 2, 4);

        // Text: System check name
        ctx.fillStyle = '#94A3B8';
        ctx.globalAlpha = 0.8;
        ctx.font = `bold ${isMobile ? '8px' : '9px'} "Fira Code", monospace`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(`// ${item.label}`, bX + 6, bY + 5);

        // Text: Tag & status (PASS / SECURE)
        ctx.fillStyle = item.color;
        ctx.globalAlpha = 0.95;
        ctx.font = `bold ${isMobile ? '9.5px' : '10.5px'} "Fira Code", monospace`;
        ctx.fillText(`[✓] ${item.tag}`, bX + 6, bY + 17);
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
      window.removeEventListener('resize', initCanvas);
    };
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}>
      {/* Laser Security Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60 drop-shadow-[0_0_10px_rgba(0,255,255,0.2)]"
      />

      {/* Atmospheric Radial Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0B0F19]/25 to-[#0B0F19]/70 pointer-events-none" />
    </div>
  );
};
