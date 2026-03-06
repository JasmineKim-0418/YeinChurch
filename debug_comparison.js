
const { createClient } = require('contentful');

const client = createClient({
    space: 'net5h47puy6b',
    accessToken: '6RegU3XQ8_4WD-oR55of99gsyj17xtUzBpAX6tEjwsU',
});

async function findSermonAndChoir() {
    try {
        console.log('--- Searching for "내게 능력 주시는 자" ---');
        const choir = await client.getEntries({
            content_type: 'choir',
            query: '내게 능력 주시는 자'
        });
        console.log(`Choir matches: ${choir.items.length}`);
        choir.items.forEach(item => {
            console.log(`- [${item.sys.id}] Title: "${item.fields.title}"`);
        });

        const sermon = await client.getEntries({
            content_type: 'sermon',
            query: '내게 능력 주시는 자'
        });
        console.log(`Sermon matches: ${sermon.items.length}`);
        sermon.items.forEach(item => {
            console.log(`- [${item.sys.id}] Title: "${item.fields.title}"`);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

findSermonAndChoir();
