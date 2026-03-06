
const { createClient } = require('contentful');

const client = createClient({
    space: 'net5h47puy6b',
    accessToken: '6RegU3XQ8_4WD-oR55of99gsyj17xtUzBpAX6tEjwsU',
});

async function checkSermons() {
    try {
        const response = await client.getEntries({
            content_type: 'sermon',
            order: ['-fields.date'],
        });
        const titles = response.items.map(item => item.fields.title);
        console.log('Total sermons:', titles.length);
        const choirTitles = titles.filter(t => t.includes('찬양') || t.includes('성가대') || t.includes('특송'));
        console.log('Choir related sermons:', choirTitles);
    } catch (error) {
        console.error('Error:', error);
    }
}

checkSermons();
