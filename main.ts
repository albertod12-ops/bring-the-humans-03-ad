// bring-the-humans-03 entry: hands the TikTok video's address to the grader.
// The video itself is the entry — a 15-second vertical ad for make.fun, posted
// publicly on TikTok from @zerolife120. This program only copies VIDEO.json to
// /output, and refuses a placeholder or malformed address so a bad VIDEO.json
// fails fast here instead of passing a broken link to the grader.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const TIKTOK_VIDEO = /^https:\/\/www\.tiktok\.com\/@[A-Za-z0-9._-]+\/video\/\d+$/;

const video = JSON.parse(readFileSync(join(BOT_DIR, 'VIDEO.json'), 'utf8')) as { url?: unknown };
if (typeof video.url !== 'string' || !TIKTOK_VIDEO.test(video.url.trim())) {
  console.error(`VIDEO.json must name a TikTok video URL, got: ${JSON.stringify(video.url)}`);
  process.exit(1);
}
mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
console.log(`VIDEO.json copied: ${video.url.trim()}`);
