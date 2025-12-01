#!/usr/bin/env node
// Simple script to generate `config.json` from `.env`.
// Usage: node scripts/generate-config.js

const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.error('.env not found. Copy .env.example -> .env and fill values.');
  process.exit(1);
}

const envText = fs.readFileSync(envPath, 'utf8');
const lines = envText.split(/\r?\n/);
const env = {};
for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const idx = trimmed.indexOf('=');
  if (idx === -1) continue;
  const key = trimmed.slice(0, idx).trim();
  const val = trimmed.slice(idx + 1).trim();
  env[key] = val;
}

// Map env vars to Supabase config structure
const supabaseConfig = {
  supabaseUrl: env.SUPABASE_URL || '',
  supabaseAnonKey: env.SUPABASE_ANON_KEY || ''
};

const outDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
const outPath = path.resolve(outDir, 'config.json');
fs.writeFileSync(outPath, JSON.stringify(supabaseConfig, null, 2), 'utf8');
console.log('Wrote', outPath);
