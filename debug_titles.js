
const { createClient } = require('contentful');

const client = createClient({
    space: 'net5h47puy6b',
    accessToken: '6RegU3XQ8_4WD-oR55of99gsyj17xtUzBpAX6tEjwsU',
});

async function findExactMatch() {
    try {
        console.log('--- Searching for exact title "내게 능력 주시는 자 (김지현)" ---');
        const response = await client.getEntries({
            'fields.title': '내게 능력 주시는 자 (김지현)'
        });
        console.log(`Found ${response.items.length} exact matches.`);
        response.items.forEach(item => {
            console.log(`- type: ${item.sys.contentType.sys.id}, id: ${item.sys.id}, date: ${item.fields.date}`);
        });

        console.log('\n--- Searching for any title containing "내게 능력 주시는 자" ---');
        const partialResponse = await client.getEntries({
            'fields.title[match]': '내게 능력 주시는 자'
        });
        partialResponse.items.forEach(item => {
            console.log(`- type: ${item.sys.contentType.sys.id}, title: "${item.fields.title}"`);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

findExactMatch();
