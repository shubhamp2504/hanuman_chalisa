/**
 * Floating Sacred Flower Petals Canvas
 * Renders gently tumbling Indian temple marigold petals and white jasmine blossoms
 * with realistic swaying gravity, wind turbulence, and reduced-motion respect.
 */

export class PetalsCanvas {
  constructor(canvasElement, options = {}) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.count = options.count || 24;
    this.petals = [];
    this.animFrame = null;
    this.isActive = true;

    this._resize = this._resize.bind(this);
    this._initPetals();
    this._bindEvents();
    this.startAnimation();
  }

  _bindEvents() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  _resize() {
    this.width = this.canvas.parentElement ? this.canvas.parentElement.offsetWidth : window.innerWidth;
    this.height = this.canvas.parentElement ? this.canvas.parentElement.offsetHeight : window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  _initPetals() {
    this.petals = [];
    for (let i = 0; i < this.count; i++) {
      this.petals.push(this._createPetal(true));
    }
  }

  _createPetal(initialRandom = false) {
    const isMarigold = Math.random() > 0.3;
    return {
      x: Math.random() * (this.width || window.innerWidth),
      y: initialRandom ? Math.random() * (this.height || window.innerHeight) : -20,
      size: Math.random() * 8 + 6,
      vx: (Math.random() - 0.5) * 0.8,
      vy: Math.random() * 0.9 + 0.6,
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() - 0.5) * 0.04,
      oscAmp: Math.random() * 1.5 + 0.5,
      oscSpeed: Math.random() * 0.03 + 0.01,
      oscPhase: Math.random() * Math.PI * 2,
      color: isMarigold
        ? (Math.random() > 0.5 ? '#F59E0B' : '#FBBF24') // Marigold orange / yellow
        : '#F5EBDD', // Jasmine ivory
      alpha: Math.random() * 0.35 + 0.45
    };
  }

  startAnimation() {
    // Respect user's reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.stopAnimation();
      return;
    }

    const render = () => {
      this._updateAndDraw();
      if (this.isActive) {
        this.animFrame = requestAnimationFrame(render);
      }
    };
    render();
  }

  stopAnimation() {
    this.isActive = false;
    if (this.animFrame) {
      cancelAnimationFrame(this.animFrame);
    }
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }

  resumeAnimation() {
    if (!this.isActive) {
      this.isActive = true;
      this.startAnimation();
    }
  }

  _updateAndDraw() {
    const { ctx, width, height } = this;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];

      // Update positions
      p.oscPhase += p.oscSpeed;
      p.x += p.vx + Math.sin(p.oscPhase) * p.oscAmp;
      p.y += p.vy;
      p.angle += p.vAngle;

      // Wrap around
      if (p.y > height + 20) {
        this.petals[i] = this._createPetal(false);
      }
      if (p.x < -30) p.x = width + 20;
      if (p.x > width + 30) p.x = -20;

      // Draw Petal
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;

      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Delicate center vein
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(-p.size * 0.8, 0);
      ctx.lineTo(p.size * 0.8, 0);
      ctx.stroke();

      ctx.restore();
    }
  }

  destroy() {
    this.stopAnimation();
    window.removeEventListener('resize', this._resize);
  }
}
