/**
 * Interactive Canvas Diya (Sacred Brass Lamp)
 * Renders a traditional Indian Diya with realistic flickering flame,
 * inner core, saffron-gold aura, and interactive touch response.
 */

import { audioService } from '../services/audio-service.js';

export class DiyaCanvas {
  constructor(canvasElement, options = {}) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.isLit = options.isLit !== false;
    this.size = options.size || 220;
    this.animFrame = null;
    this.flickerOffset = 0;
    this.sparkles = [];

    this._setupCanvas();
    this._bindEvents();
    this.startAnimation();
  }

  _setupCanvas() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.size * dpr;
    this.canvas.height = this.size * dpr;
    this.ctx.scale(dpr, dpr);
  }

  _bindEvents() {
    this.canvas.addEventListener('click', () => {
      this.toggleLit();
    });
  }

  toggleLit() {
    this.isLit = !this.isLit;
    if (this.isLit) {
      audioService.playTempleBell();
      this._emitSparkles();
    }
  }

  lightUp() {
    if (!this.isLit) {
      this.isLit = true;
      audioService.playTempleBell();
      this._emitSparkles();
    }
  }

  _emitSparkles() {
    const cx = this.size / 2;
    const cy = this.size / 2 - 20;
    for (let i = 0; i < 20; i++) {
      this.sparkles.push({
        x: cx,
        y: cy,
        vx: (Math.random() - 0.5) * 3,
        vy: -Math.random() * 3 - 1,
        radius: Math.random() * 2.5 + 1,
        alpha: 1,
        color: Math.random() > 0.4 ? '#F59E0B' : '#D9B56D'
      });
    }
  }

  startAnimation() {
    const render = () => {
      this._draw();
      this.animFrame = requestAnimationFrame(render);
    };
    render();
  }

  stopAnimation() {
    if (this.animFrame) {
      cancelAnimationFrame(this.animFrame);
    }
  }

  _draw() {
    const { ctx, size, isLit } = this;
    ctx.clearRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size * 0.65;

    // 1. Draw Brass Diya Base & Oil Bowl
    this._drawBrassDiya(cx, cy);

    // 2. Draw Flame & Aura if Lit
    if (isLit) {
      this.flickerOffset += 0.08;
      const flicker = Math.sin(this.flickerOffset * 2.5) * 2 + Math.cos(this.flickerOffset * 4) * 1.5;
      const flameX = cx;
      const flameY = cy - 14;

      // Outer Warm Radiant Glow
      const glowGrad = ctx.createRadialGradient(flameX, flameY - 20, 5, flameX, flameY - 20, 65);
      glowGrad.addColorStop(0, 'rgba(245, 158, 11, 0.45)');
      glowGrad.addColorStop(0.5, 'rgba(217, 181, 109, 0.15)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(flameX, flameY - 20, 65, 0, Math.PI * 2);
      ctx.fill();

      // Outer Flame (Saffron)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(flameX - 10, flameY);
      ctx.bezierCurveTo(
        flameX - 14, flameY - 22,
        flameX - 7 + flicker, flameY - 48,
        flameX, flameY - 58 + flicker
      );
      ctx.bezierCurveTo(
        flameX + 7 + flicker, flameY - 48,
        flameX + 14, flameY - 22,
        flameX + 10, flameY
      );
      ctx.closePath();
      const flameGrad = ctx.createLinearGradient(flameX, flameY, flameX, flameY - 60);
      flameGrad.addColorStop(0, '#C83824');
      flameGrad.addColorStop(0.3, '#F59E0B');
      flameGrad.addColorStop(0.7, '#FBBF24');
      flameGrad.addColorStop(1, '#FFF2D6');
      ctx.fillStyle = flameGrad;
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.restore();

      // Inner Flame Core (Golden White & Blue Base)
      ctx.beginPath();
      ctx.moveTo(flameX - 5, flameY - 2);
      ctx.bezierCurveTo(flameX - 6, flameY - 14, flameX - 2, flameY - 30, flameX, flameY - 36 + flicker * 0.5);
      ctx.bezierCurveTo(flameX + 2, flameY - 30, flameX + 6, flameY - 14, flameX + 5, flameY - 2);
      ctx.closePath();
      const coreGrad = ctx.createLinearGradient(flameX, flameY, flameX, flameY - 36);
      coreGrad.addColorStop(0, 'rgba(59, 130, 246, 0.8)'); // Sacred blue core base
      coreGrad.addColorStop(0.2, '#FBBF24');
      coreGrad.addColorStop(0.8, '#FFFFFF');
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Sparkles Update
      for (let i = this.sparkles.length - 1; i >= 0; i--) {
        const s = this.sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.02;
        if (s.alpha <= 0) {
          this.sparkles.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = s.alpha;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
    } else {
      // Wick when unlit
      ctx.beginPath();
      ctx.moveTo(cx, cy - 4);
      ctx.lineTo(cx + 1, cy - 14);
      ctx.strokeStyle = '#3D2C22';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
  }

  _drawBrassDiya(cx, cy) {
    const { ctx } = this;

    // Diya Stand Base
    ctx.beginPath();
    ctx.ellipse(cx, cy + 22, 28, 8, 0, 0, Math.PI * 2);
    const baseGrad = ctx.createLinearGradient(cx - 28, cy, cx + 28, cy);
    baseGrad.addColorStop(0, '#8C6517');
    baseGrad.addColorStop(0.5, '#D9B56D');
    baseGrad.addColorStop(1, '#6B4D10');
    ctx.fillStyle = baseGrad;
    ctx.fill();

    // Stem
    ctx.beginPath();
    ctx.moveTo(cx - 8, cy + 20);
    ctx.lineTo(cx - 6, cy + 10);
    ctx.lineTo(cx + 6, cy + 10);
    ctx.lineTo(cx + 8, cy + 20);
    ctx.closePath();
    ctx.fillStyle = '#A28238';
    ctx.fill();

    // Diya Bowl (Traditional Terracotta / Brass Boat Shape)
    ctx.beginPath();
    ctx.moveTo(cx - 42, cy);
    ctx.quadraticCurveTo(cx - 46, cy + 16, cx, cy + 16);
    ctx.quadraticCurveTo(cx + 46, cy + 16, cx + 42, cy);
    ctx.quadraticCurveTo(cx, cy + 6, cx - 42, cy);
    ctx.closePath();

    const bowlGrad = ctx.createLinearGradient(cx - 42, cy, cx + 42, cy);
    bowlGrad.addColorStop(0, '#8C6517');
    bowlGrad.addColorStop(0.3, '#D9B56D');
    bowlGrad.addColorStop(0.7, '#F3E5AB');
    bowlGrad.addColorStop(1, '#7A5712');
    ctx.fillStyle = bowlGrad;
    ctx.fill();

    // Rim Highlight
    ctx.beginPath();
    ctx.ellipse(cx, cy, 40, 7, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(252, 231, 166, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Sacred Oil Pool
    ctx.beginPath();
    ctx.ellipse(cx, cy + 2, 34, 5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#684512';
    ctx.fill();
  }
}
