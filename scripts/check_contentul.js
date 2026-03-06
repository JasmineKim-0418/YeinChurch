const contentful = require('contentful');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
try {
    const envPath = path.join(__dirname, '../.env.local');
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
} catch (e) {
    console.log('Could not read .env.local', e.message);
}

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

async function check() {
    console.log('Checking Contentful connection...');
    try {
        console.log('Fetching 1 entry from "choir"...');
        const choirEntries = await client.getEntries({ content_type: 'choir', limit: 1 });
        if (choirEntries.items.length > 0) {
            console.log('✅ Choir Entry Found. Fields:', Object.keys(choirEntries.items[0].fields));
        } else {
            console.log('⚠️ No entries in "choir" yet. Cannot verify field names.');
        }

        console.log('Fetching 1 entry from "praise"...');
        const praiseEntries = await client.getEntries({ content_type: 'praise', limit: 1 });
        if (praiseEntries.items.length > 0) {
            console.log('✅ Praise Entry Found. Fields:', Object.keys(praiseEntries.items[0].fields));
        } else {
            console.log('⚠️ No entries in "praise" yet. Cannot verify field names.');
        }
    } catch (e) {
        console.error('❌ Error:', e.message);
        if (e.message.includes('Unknown content type')) {
            console.log('👉 It seems the Content Type ID might be incorrect.');
        }
    }
}

check();
