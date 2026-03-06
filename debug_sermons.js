
const { createClient } = require('contentful');

const client = createClient({
    space: 'net5h47puy6b',
    accessToken: '6RegU3XQ8_4WD-oR55of99gsyj17xtUzBpAX6tEjwsU',
});

async function findInSermons() {
    try {
        console.log('--- Searching for "내게 능력 주시는 자" in SERMONS ---');
        const response = await client.getEntries({
            content_type: 'sermon',
            query: '내게 능력 주시는 자'
        });
        console.log(`Found ${response.items.length} sermons matching the query.`);
        response.items.forEach(item => {
            console.log(`- title: "${item.fields.title}", date: ${item.fields.date}`);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

findInSermons();
