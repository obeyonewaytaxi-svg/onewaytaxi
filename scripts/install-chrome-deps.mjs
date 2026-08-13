import { spawnSync } from 'node:child_process';
import process from 'node:process';

const LIBS = [
  'libasound2',
  'libatk1.0-0',
  'libatk-bridge2.0-0',
  'libatspi2.0-0',
  'libcairo2',
  'libcups2',
  'libdbus-1-3',
  'libdrm2',
  'libexpat1',
  'libfontconfig1',
  'libgbm1',
  'libglib2.0-0',
  'libnspr4',
  'libnss3',
  'libpango-1.0-0',
  'libx11-6',
  'libx11-xcb1',
  'libxcb1',
  'libxcb-dri3-0',
  'libxcb-shm0',
  'libxcb-xfixes0',
  'libxcomposite1',
  'libxdamage1',
  'libxext6',
  'libxfixes3',
  'libxkbcommon0',
  'libxrandr2',
  'libxshmfence1',
  'libxss1',
  'libxtst6',
];

function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: 'inherit' });
  return result.status === 0;
}

function main() {
  if (process.platform !== 'linux') {
    console.log('chrome-deps: not Linux, skipping system library install');
    return;
  }

  const hasApt = spawnSync('which', ['apt-get'], { stdio: 'ignore' }).status === 0;
  if (!hasApt) {
    console.log('chrome-deps: apt-get not available, skipping (Chrome launch will fail if libs are missing)');
    return;
  }

  console.log('chrome-deps: installing Chromium runtime libraries via apt-get...');
  if (!run('apt-get', ['update', '-y', '--fix-missing'])) {
    console.error('chrome-deps: apt-get update failed');
    process.exit(1);
  }
  if (!run('apt-get', ['install', '-y', '--no-install-recommends', ...LIBS])) {
    console.error('chrome-deps: apt-get install failed — Chrome will not be able to launch');
    process.exit(1);
  }
  console.log('chrome-deps: system libraries ready');
}

main();
