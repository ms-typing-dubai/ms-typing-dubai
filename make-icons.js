const { createCanvas } = require('canvas');
const fs = require('fs');

function makeIcon(size, outPath) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#1a1510';
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, size * 0.18);
  ctx.fill();

  // Gold circle
  const cx = size / 2, cy = size / 2, r = size * 0.32;
  ctx.beginPath();
  ctx.arc(cx, cy * 0.9, r, 0, Math.PI * 2);
  ctx.fillStyle = '#b8860b';
  ctx.fill();

  // Letter M
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${size * 0.38}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('MS', cx, cy * 0.9);

  // Bottom text
  ctx.fillStyle = '#b8860b';
  ctx.font = `${size * 0.09}px sans-serif`;
  ctx.fillText('TYPING', cx, size * 0.78);

  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log('Created', outPath);
}

try {
  makeIcon(192, '/home/claude/ms-typing-pwa/icon-192.png');
  makeIcon(512, '/home/claude/ms-typing-pwa/icon-512.png');
} catch(e) {
  console.log('Canvas not available, skipping icons:', e.message);
}
