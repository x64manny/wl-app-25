#!/usr/bin/env node
import { mkdir } from 'node:fs/promises';
import { PNG } from 'pngjs';
import path from 'node:path';
import fs from 'node:fs';

const sizes = [192, 512];
const outDir = path.resolve(process.cwd(), 'public/icons');

const primaryColor = { r: 0, g: 0, b: 0 }; // background
const accentColor = { r: 255, g: 255, b: 255 }; // glyph

function drawGlyph(png, size) {
  // Simple stylized WL monogram square-ish
  const ctx = {
    set(x, y, c) {
      const idx = (png.width * y + x) << 2;
      png.data[idx] = c.r;
      png.data[idx + 1] = c.g;
      png.data[idx + 2] = c.b;
      png.data[idx + 3] = 255;
    }
  };
  // Fill background
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) ctx.set(x, y, primaryColor);
  // Draw a simple W and L using rectangles
  const thickness = Math.max(2, Math.round(size * 0.08));
  const margin = Math.round(size * 0.18);
  // W: four vertical bars angled (simplified)
  for (let i = 0; i < 4; i++) {
    const xBase = margin + i * ((size - 2 * margin) / 3);
    for (let y = margin; y < size - margin; y++) {
      for (let t = 0; t < thickness; t++) {
        const x = Math.round(xBase + t);
        if (x < size) ctx.set(x, y, accentColor);
      }
    }
  }
  // L: bottom horizontal + left vertical overriding part of last bar area on right side
  const lWidth = thickness;
  for (let y = margin; y < size - margin; y++) {
    for (let t = 0; t < lWidth; t++) {
      const x = size - margin - thickness * 2 + t;
      if (x < size) ctx.set(x, y, accentColor);
    }
  }
  for (let x = margin; x < size - margin; x++) {
    for (let t = 0; t < thickness; t++) {
      const y = size - margin - t;
      if (y < size) ctx.set(x, y, accentColor);
    }
  }
}

async function generate() {
  await mkdir(outDir, { recursive: true });
  for (const size of sizes) {
    const png = new PNG({ width: size, height: size });
    drawGlyph(png, size);
    await new Promise((res, rej) => {
      png.pack().pipe(fs.createWriteStream(path.join(outDir, `icon-${size}.png`))).on('finish', res).on('error', rej);
    });
    // Maskable: same graphic with extra padding (transparent edges)
    const maskable = new PNG({ width: size, height: size });
    // Start transparent
    for (let i = 0; i < maskable.data.length; i += 4) { maskable.data[i+3] = 0; }
    const inset = Math.round(size * 0.1);
    // Draw reduced glyph area
    const inner = new PNG({ width: size - inset * 2, height: size - inset * 2 });
    drawGlyph(inner, inner.width);
    // Blit inner into maskable
    for (let y = 0; y < inner.height; y++) {
      for (let x = 0; x < inner.width; x++) {
        const srcIdx = (inner.width * y + x) << 2;
        const dstIdx = (maskable.width * (y + inset) + (x + inset)) << 2;
        maskable.data[dstIdx] = inner.data[srcIdx];
        maskable.data[dstIdx+1] = inner.data[srcIdx+1];
        maskable.data[dstIdx+2] = inner.data[srcIdx+2];
        maskable.data[dstIdx+3] = inner.data[srcIdx+3];
      }
    }
    await new Promise((res, rej) => {
      maskable.pack().pipe(fs.createWriteStream(path.join(outDir, `maskable-icon-${size}.png`))).on('finish', res).on('error', rej);
    });
  }
  console.log('Icons generated in public/icons');
}

generate().catch(e => { console.error(e); process.exit(1); });
