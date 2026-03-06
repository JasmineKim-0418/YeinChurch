const { createClient } = require('contentful');

const client = createClient({
    space: 'net5h47puy6b',
    accessToken: '6RegU3XQ8_4WD-oR55of99gsyj17xtUzBpAX6tEjwsU',
});

async function debugMeditations() {
    try {
        const response = await client.getEntries({
            content_type: 'qt',
            order: ['-fields.date'],
            limit: 5,
        });

        console.log('--- DEBUG CONTENTFUL ENTRIES (QT) ---');
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
