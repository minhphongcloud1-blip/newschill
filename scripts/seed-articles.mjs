// One-time seed script — run with: node scripts/seed-articles.mjs
const SEED_URL = 'http://localhost:3000/api/seed';

async function main() {
  console.log('Seeding articles to Supabase...');
  const res = await fetch(SEED_URL, { method: 'POST' });
  const data = await res.json();
  console.log('Response:', JSON.stringify(data, null, 2));
}

main().catch(console.error);
