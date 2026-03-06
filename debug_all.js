
const { createClient } = require('contentful');

const client = createClient({
    space: 'net5h47puy6b',
    accessToken: '6RegU3XQ8_4WD-oR55of99gsyj17xtUzBpAX6tEjwsU',
});

async function debugAll() {
    try {
        console.log('--- Content Types ---');
        const types = await client.getContentTypes();
        types.items.forEach(t => console.group(`- ${t.name} (ID: ${t.sys.id})`));
        console.groupEnd();

        console.log('\n--- Searching for "내게 능력 주시는 자" in ALL entries ---');
        const allEntries = await client.getEntries({
            query: '내게 능력 주시는 자'
        });
        console.log(`Found ${allEntries.items.length} entries matching the query.`);
        allEntries.items.forEach(item => {
            console.log(`- type: ${item.sys.contentType.sys.id}, title: ${item.fields.title}, date: ${item.fields.date}`);
        });

        console.log('\n--- Top 10 Choir Entries ---');
        const choirEntries = await client.getEntries({
            content_type: 'choir',
            order: ['-fields.date'],
            limit: 10
        });
        choirEntries.items.forEach((item, i) => {
            console.log(`${i + 1}. [${item.fields.date}] ${item.fields.title}`);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

debugAll();
