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

// Map env vars to firebase config structure
const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY || '',
  authDomain: env.FIREBASE_AUTH_DOMAIN || '',
  projectId: env.FIREBASE_PROJECT_ID || '',
  storageBucket: env.FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID || '',
  appId: env.FIREBASE_APP_ID || '',
  measurementId: env.FIREBASE_MEASUREMENT_ID || ''
};

const outPath = path.resolve(process.cwd(), 'config.json');
fs.writeFileSync(outPath, JSON.stringify(firebaseConfig, null, 2), 'utf8');
console.log('Wrote', outPath);
