import { spawn } from 'child_process';
import http from 'http';

const child = spawn('npm', ['run', 'dev'], {
  env: {
    ...process.env,
    DATABASE_URI: 'postgresql://allenkurotimi@127.0.0.1:5432/goni-shea-butter',
    PAYLOAD_SECRET: 'f7e3c150c904323c6f8bb1a4ea8e7bcfdf9b4f9d0c2e9de6d33261f0',
  },
  stdio: ['pipe', 'pipe', 'pipe'],
});

let isReady = false;
let isPushed = false;

child.stdout.on('data', (data) => {
  const output = data.toString();
  process.stdout.write(output);

  // Check for column rename prompt
  if (output.includes('created or renamed from another column?')) {
    console.log('\n[Script] Detected rename/create column prompt. Selecting default (create column)...');
    child.stdin.write('\n');
  }

  // Check for accept warnings prompt
  if (output.includes('Accept warnings and push schema to database?')) {
    console.log('\n[Script] Detected warnings prompt. Sending "y" + Enter...');
    child.stdin.write('y\n');
  }

  // Check for success or error logs after schema push
  if (output.includes('No changes detected in schema') || output.includes('Failed query:')) {
    isPushed = true;
  }

  // Check if Next.js dev server is ready
  if (!isReady && (output.includes('Ready in') || output.includes('✓ Ready'))) {
    isReady = true;
    console.log('\n[Script] Next.js dev server ready. Triggering database connection request...');
    
    // Trigger request after a small delay
    setTimeout(() => {
      http.get('http://localhost:3000/admin/login', (res) => {
        console.log(`[Script] Request to /admin/login completed with status: ${res.statusCode}`);
      }).on('error', (err) => {
        console.error('[Script] Request failed:', err.message);
      });
    }, 1000);
  }
});

child.stderr.on('data', (data) => {
  process.stderr.write(data.toString());
});

child.on('close', (code) => {
  console.log(`[Script] Child process exited with code ${code}`);
  process.exit(code);
});

// Safety timeout: exit after 30 seconds if stuck
setTimeout(() => {
  console.log('\n[Script] Safety timeout reached. Exiting...');
  child.kill();
  process.exit(0);
}, 45000);
