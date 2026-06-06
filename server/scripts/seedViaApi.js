require('dotenv').config();
const fs = require('fs');
const path = require('path');

const API = process.env.API_URL || 'http://localhost:5000/api';

async function postLead(lead) {
  try {
    const res = await fetch(`${API}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || JSON.stringify(data));
    console.log('Created:', data.data._id, '-', data.data.name);
  } catch (err) {
    console.error('Failed:', lead.email, err.message || err);
  }
}

(async () => {
  try {
    const file = path.join(__dirname, '..', 'data', 'leads.json');
    const raw = fs.readFileSync(file, 'utf8');
    const leads = JSON.parse(raw);
    console.log(`Seeding ${leads.length} leads to ${API}`);
    for (const l of leads) {
      // small delay to avoid overwhelming the server
      // eslint-disable-next-line no-await-in-loop
      await postLead(l);
    }
    console.log('Seeding completed');
    process.exit(0);
  } catch (err) {
    console.error('Seeder error:', err.message || err);
    process.exit(1);
  }
})();
