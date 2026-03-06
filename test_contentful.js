
const { createClient } = require('contentful');

const client = createClient({
    space: 'net5h47puy6b',
    accessToken: '6RegU3XQ8_4WD-oR55of99gsyj17xtUzBpAX6tEjwsU',
});

async function checkData() {
    try {
        console.log('--- Checking "choir" content type ---');
        const choirResponse = await client.getEntries({
            content_type: 'choir',
            order: ['-fields.date'],
        });
        console.log('Total choir entries:', choirResponse.items.length);
        choirResponse.items.forEach(item => {
            console.log(`- [${item.fields.date}] ${item.fields.title}`);
        });

        console.log('\n--- Checking "sermon" content type (top 5) ---');
        const sermonResponse = await client.getEntries({
            content_type: 'sermon',
            order: ['-fields.date'],
            limit: 5
        });
        sermonResponse.items.forEach(item => {
            console.log(`- [${item.fields.date}] ${item.fields.title}`);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

checkData();
