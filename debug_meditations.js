const { createClient } = require('contentful');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

async function debugMeditations() {
    try {
        const response = await client.getEntries({
            content_type: 'qt',
            order: ['-fields.date'],
            limit: 5,
        });

        console.log('--- DEBUG CONTENTFUL ENTRIES ---');
        response.items.forEach((item, index) => {
            console.log(`[${index}] ID: ${item.sys.id}`);
            console.log(`Title: ${item.fields.title}`);
            console.log(`Author Raw:`, JSON.stringify(item.fields.author, null, 2));
            const author = typeof item.fields.author === 'string'
                ? item.fields.author
                : (item.fields.author?.fields?.name || 'FALLBACK: 예인교회');
            console.log(`Resolved Author: ${author}`);
            console.log('---');
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

debugMeditations();
