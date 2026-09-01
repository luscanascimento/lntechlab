import * as THREE from 'three';

export interface SceneOptions {
  isMobile?: boolean;
}

export class PolyhedralScene {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private animFrameId: number | null = null;
  private isDisposed: boolean = false;
  private isPaused: boolean = false;

  // 3D Objects
  private mainKernelGroup: THREE.Group;
  private cpuCoreMesh!: THREE.Mesh;
  private siliconDieMesh!: THREE.Mesh;
  private chipWireframe!: THREE.LineSegments;
  private codePlates: { mesh: THREE.Mesh; initialY: number; speed: number; rotSpeed: number; radius: number; phase: number }[] = [];
  private orbitalRings: THREE.LineLoop[] = [];
  private particles!: THREE.Points;

  // Interaction & Motion
  private targetRotationX: number = 0;
  private targetRotationY: number = 0;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private clock: THREE.Clock;
  private isMobile: boolean;

  // Disposables tracking
  private geometries: THREE.BufferGeometry[] = [];
  private materials: THREE.Material[] = [];
  private textures: THREE.Texture[] = [];

  constructor(container: HTMLElement, options: SceneOptions = {}) {
    this.container = container;
    this.isMobile = options.isMobile || false;
    this.clock = new THREE.Clock();

    // 1. Scene setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0B0F19, 0.035);

    // 2. Camera setup
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, this.isMobile ? 2.5 : 2.0, this.isMobile ? 12 : 9.5);

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !this.isMobile,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);

    // 4. Main Group
    this.mainKernelGroup = new THREE.Group();
    this.scene.add(this.mainKernelGroup);

    // Build the 3D Cyber Kernel Processor & Floating Code Plates
    this.buildCpuKernel();
    this.buildFloatingCodePlates();
    this.buildOrbitalBusRings();
    this.buildParticleField();

    // Initial isometric tilt
    this.mainKernelGroup.rotation.x = 0.45;
    this.mainKernelGroup.rotation.y = -0.35;

    // 5. Event listeners
    this.bindEvents();

    // 6. Start Loop
    this.animate();
  }

  /**
   * Generates a high-resolution 2D Canvas Texture with dynamic text / code
   */
  private createCodeTexture(lines: { text: string; color: string }[], width = 512, height = 256, borderCol = '#00FFFF') {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Dark glass background
      ctx.fillStyle = 'rgba(11, 15, 25, 0.92)';
      ctx.fillRect(0, 0, width, height);

      // Neon cyber border
      ctx.strokeStyle = borderCol;
      ctx.lineWidth = 6;
      ctx.strokeRect(4, 4, width - 8, height - 8);

      // Corner brackets
      ctx.fillStyle = borderCol;
      ctx.fillRect(0, 0, 16, 16);
      ctx.fillRect(width - 16, 0, 16, 16);
      ctx.fillRect(0, height - 16, 16, 16);
      ctx.fillRect(width - 16, height - 16, 16, 16);

      // Header top bar
      ctx.fillStyle = 'rgba(0, 82, 255, 0.2)';
      ctx.fillRect(8, 8, width - 16, 32);

      ctx.fillStyle = '#00FFFF';
      ctx.font = 'bold 16px "Fira Code", monospace';
      ctx.fillText('// LN-KERNEL // RUNTIME', 20, 30);

      // Draw Code lines
      ctx.font = 'bold 20px "Fira Code", monospace';
      let startY = 75;
      lines.forEach((l) => {
        ctx.fillStyle = l.color;
        ctx.fillText(l.text, 24, startY);
        startY += 34;
      });
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    this.textures.push(texture);
    return texture;
  }

  /**
   * Generates Top Silicon Die Texture with etched <LN> Logo
   */
  private createCpuDieTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Dark metallic silicon substrate
      ctx.fillStyle = '#070A12';
      ctx.fillRect(0, 0, 512, 512);

      // Circuit grid lines
      ctx.strokeStyle = 'rgba(0, 82, 255, 0.35)';
      ctx.lineWidth = 2;
      for (let i = 40; i < 512; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 512);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(512, i);
        ctx.stroke();
      }

      // Golden processor circuit core box
      ctx.strokeStyle = '#00FFFF';
      ctx.lineWidth = 6;
      ctx.strokeRect(100, 100, 312, 312);

      // Central <LN> Emblem
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 72px "Fira Code", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('< LN >', 256, 230);

      ctx.fillStyle = '#00FFFF';
      ctx.font = 'bold 24px "Fira Code", monospace';
      ctx.fillText('QUANTUM KERNEL v2.4', 256, 300);

      ctx.fillStyle = '#FF00FF';
      ctx.font = '16px "Fira Code", monospace';
      ctx.fillText('HIGH-PERFORMANCE ARCHITECTURE', 256, 335);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    this.textures.push(texture);
    return texture;
  }

  /**
   * 1. Builds Central CPU Processor & Silicon Die
   */
  private buildCpuKernel() {
    const chipSize = this.isMobile ? 2.6 : 3.2;
    const chipHeight = 0.3;

    // 1. Base Substrate (Dark PCB base)
    const baseGeom = new THREE.BoxGeometry(chipSize, chipHeight, chipSize);
    this.geometries.push(baseGeom);

    const baseMat = new THREE.MeshBasicMaterial({
      color: 0x080D1A,
      wireframe: false,
    });
    this.materials.push(baseMat);
    this.cpuCoreMesh = new THREE.Mesh(baseGeom, baseMat);
    this.mainKernelGroup.add(this.cpuCoreMesh);

    // Glowing Neon Edges for PCB base
    const wireGeom = new THREE.WireframeGeometry(baseGeom);
    this.geometries.push(wireGeom);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x0052FF,
      transparent: true,
      opacity: 0.8,
    });
    this.materials.push(wireMat);
    this.chipWireframe = new THREE.LineSegments(wireGeom, wireMat);
    this.mainKernelGroup.add(this.chipWireframe);

    // 2. Top Silicon Die with <LN> laser-etched texture
    const dieSize = chipSize * 0.85;
    const dieGeom = new THREE.BoxGeometry(dieSize, 0.12, dieSize);
    this.geometries.push(dieGeom);

    const dieTexture = this.createCpuDieTexture();
    const dieMat = new THREE.MeshBasicMaterial({
      map: dieTexture,
      transparent: true,
      opacity: 0.95,
    });
    this.materials.push(dieMat);
    this.siliconDieMesh = new THREE.Mesh(dieGeom, dieMat);
    this.siliconDieMesh.position.y = chipHeight * 0.6;
    this.mainKernelGroup.add(this.siliconDieMesh);

    // Golden Pin Nodes on Chip Perimeter
    const pinGeom = new THREE.BufferGeometry();
    const pinPositions: number[] = [];
    const half = chipSize / 2 + 0.1;
    const pinCount = 12;

    for (let i = 0; i < pinCount; i++) {
      const offset = (i / (pinCount - 1) - 0.5) * (chipSize * 0.8);
      // North & South pins
      pinPositions.push(offset, 0, -half, offset, 0, half);
      // East & West pins
      pinPositions.push(-half, 0, offset, half, 0, offset);
    }

    pinGeom.setAttribute('position', new THREE.Float32BufferAttribute(pinPositions, 3));
    this.geometries.push(pinGeom);

    const pinMat = new THREE.PointsMaterial({
      color: 0x00FFFF,
      size: this.isMobile ? 0.14 : 0.18,
      transparent: true,
      opacity: 0.9,
    });
    this.materials.push(pinMat);
    const pins = new THREE.Points(pinGeom, pinMat);
    this.mainKernelGroup.add(pins);
  }

  /**
   * 2. Builds Floating Holographic Code Plates orbiting the CPU
   */
  private buildFloatingCodePlates() {
    const snippets = [
      {
        border: '#00FFFF',
        lines: [
          { text: 'export async function build() {', color: '#FF00FF' },
          { text: '  const kernel = await init();', color: '#00FFFF' },
          { text: '  return Result.ok(kernel);', color: '#10B981' },
          { text: '}', color: '#94A3B8' },
        ],
      },
      {
        border: '#FF00FF',
        lines: [
          { text: '<LNTechLab status="online">', color: '#FF00FF' },
          { text: '  <AISystem autonomy="true" />', color: '#00FFFF' },
          { text: '  <CleanCode coverage="98%" />', color: '#10B981' },
          { text: '</LNTechLab>', color: '#FF00FF' },
        ],
      },
      {
        border: '#38BDF8',
        lines: [
          { text: 'interface ICluster<T> {', color: '#FF00FF' },
          { text: '  readonly vault: AES256Vault;', color: '#00FFFF' },
          { text: '  p99LatencyMs: 14.2;', color: '#FACC15' },
          { text: '}', color: '#94A3B8' },
        ],
      },
      {
        border: '#10B981',
        lines: [
          { text: '01001100 01001110 [LN]', color: '#10B981' },
          { text: 'TELEMETRY: P99 < 20ms', color: '#00FFFF' },
          { text: 'CORE_WEB_VITALS: 100/100', color: '#FACC15' },
          { text: 'STATUS: PRODUCTION_READY', color: '#10B981' },
        ],
      },
    ];

    const plateW = this.isMobile ? 2.2 : 2.8;
    const plateH = this.isMobile ? 1.1 : 1.4;
    const plateGeom = new THREE.PlaneGeometry(plateW, plateH);
    this.geometries.push(plateGeom);

    const orbitRadius = this.isMobile ? 3.4 : 4.4;

    snippets.forEach((snip, idx) => {
      const tex = this.createCodeTexture(snip.lines, 512, 256, snip.border);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 0.88,
        side: THREE.DoubleSide,
      });
      this.materials.push(mat);

      const mesh = new THREE.Mesh(plateGeom, mat);
      const angle = (idx / snippets.length) * Math.PI * 2;
      const x = Math.cos(angle) * orbitRadius;
      const z = Math.sin(angle) * orbitRadius;
      const y = (idx % 2 === 0 ? 0.8 : -0.8) + (Math.random() - 0.5) * 0.4;

      mesh.position.set(x, y, z);
      mesh.lookAt(0, y, 0);

      this.mainKernelGroup.add(mesh);

      this.codePlates.push({
        mesh,
        initialY: y,
        speed: 0.008 + idx * 0.002,
        rotSpeed: 0.005,
        radius: orbitRadius,
        phase: idx * (Math.PI / 2),
      });
    });
  }

  /**
   * 3. Builds Orbital Data Bus Circuit Rings
   */
  private buildOrbitalBusRings() {
    const ringRadius = this.isMobile ? 3.8 : 4.8;
    const segments = 64;

    // Ring 1: Cyan Orbit
    const r1Geom = new THREE.BufferGeometry();
    const pts1: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts1.push(new THREE.Vector3(Math.cos(theta) * ringRadius, 0, Math.sin(theta) * ringRadius));
    }
    r1Geom.setFromPoints(pts1);
    this.geometries.push(r1Geom);

    const r1Mat = new THREE.LineBasicMaterial({ color: 0x00FFFF, transparent: true, opacity: 0.4 });
    this.materials.push(r1Mat);
    const ring1 = new THREE.LineLoop(r1Geom, r1Mat);
    ring1.rotation.x = Math.PI / 6;
    this.mainKernelGroup.add(ring1);
    this.orbitalRings.push(ring1);

    // Ring 2: Purple Orbit
    const r2Geom = new THREE.BufferGeometry();
    const pts2: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts2.push(new THREE.Vector3(Math.cos(theta) * (ringRadius * 1.15), 0, Math.sin(theta) * (ringRadius * 1.15)));
    }
    r2Geom.setFromPoints(pts2);
    this.geometries.push(r2Geom);

    const r2Mat = new THREE.LineBasicMaterial({ color: 0xFF00FF, transparent: true, opacity: 0.35 });
    this.materials.push(r2Mat);
    const ring2 = new THREE.LineLoop(r2Geom, r2Mat);
    ring2.rotation.z = Math.PI / 4;
    this.mainKernelGroup.add(ring2);
    this.orbitalRings.push(ring2);
  }

  /**
   * 4. Ambient Data Rain & Floating Particles
   */
  private buildParticleField() {
    const particleCount = this.isMobile ? 140 : 300;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cCyan = new THREE.Color(0x00FFFF);
    const cPurple = new THREE.Color(0xFF00FF);
    const cBlue = new THREE.Color(0x0052FF);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 30;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 30;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 18 - 4;

      const pick = Math.random();
      const col = pick < 0.4 ? cCyan : pick < 0.7 ? cBlue : cPurple;
      particleColors[i3] = col.r;
      particleColors[i3 + 1] = col.g;
      particleColors[i3 + 2] = col.b;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    this.geometries.push(particleGeom);

    const particleMat = new THREE.PointsMaterial({
      size: this.isMobile ? 0.08 : 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
    });
    this.materials.push(particleMat);
    this.particles = new THREE.Points(particleGeom, particleMat);
    this.scene.add(this.particles);
  }

  private bindEvents() {
    if (!this.isMobile) {
      window.addEventListener('mousemove', this.onMouseMove);
    }
    window.addEventListener('resize', this.onResize);
  }

  private onMouseMove = (e: MouseEvent) => {
    const halfX = window.innerWidth / 2;
    const halfY = window.innerHeight / 2;
    this.mouseX = (e.clientX - halfX) / halfX;
    this.mouseY = (e.clientY - halfY) / halfY;
  };

  private onResize = () => {
    if (this.isDisposed || !this.container) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  public pause() {
    this.isPaused = true;
  }

  public resume() {
    if (this.isPaused) {
      this.isPaused = false;
      this.animate();
    }
  }

  private animate = () => {
    if (this.isDisposed || this.isPaused) return;

    this.animFrameId = requestAnimationFrame(this.animate);

    const elapsedTime = this.clock.getElapsedTime();

    // 1. Slow central processor continuous revolution
    this.mainKernelGroup.rotation.y = elapsedTime * 0.12 + this.targetRotationY;
    this.mainKernelGroup.rotation.x = 0.4 + Math.sin(elapsedTime * 0.15) * 0.08 + this.targetRotationX;

    // 2. Animate Floating Code Plates (orbital rotation + hover bobbing)
    this.codePlates.forEach((plate, idx) => {
      const angle = elapsedTime * 0.18 + plate.phase;
      plate.mesh.position.x = Math.cos(angle) * plate.radius;
      plate.mesh.position.z = Math.sin(angle) * plate.radius;
      plate.mesh.position.y = plate.initialY + Math.sin(elapsedTime * 1.5 + idx) * 0.25;

      // Make plate billboard slightly or face outwards
      plate.mesh.lookAt(
        plate.mesh.position.x * 2,
        plate.mesh.position.y,
        plate.mesh.position.z * 2
      );
    });

    // 3. Animate Orbital Bus Rings
    this.orbitalRings.forEach((ring, idx) => {
      ring.rotation.z = (idx % 2 === 0 ? 1 : -1) * elapsedTime * 0.25;
    });

    // 4. Mouse Parallax (smooth lerp)
    if (!this.isMobile) {
      this.targetRotationX += (this.mouseY * 0.35 - this.targetRotationX) * 0.05;
      this.targetRotationY += (this.mouseX * 0.5 - this.targetRotationY) * 0.05;

      this.camera.position.x += (this.mouseX * 0.7 - this.camera.position.x) * 0.03;
      this.camera.position.y += (-this.mouseY * 0.6 + 2.0 - this.camera.position.y) * 0.03;
      this.camera.lookAt(0, 0, 0);
    }

    // 5. Gentle Particle Drift
    if (this.particles) {
      this.particles.rotation.y = elapsedTime * 0.02;
    }

    this.renderer.render(this.scene, this.camera);
  };

  public dispose() {
    this.isDisposed = true;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }

    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('resize', this.onResize);

    // Dispose textures
    this.textures.forEach((tex) => tex.dispose());
    this.textures = [];

    // Dispose geometries
    this.geometries.forEach((geom) => geom.dispose());
    this.geometries = [];

    // Dispose materials
    this.materials.forEach((mat) => mat.dispose());
    this.materials = [];

    // Dispose renderer
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }
  }
}
