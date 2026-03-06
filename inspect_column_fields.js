const { createClient } = require('contentful');

const client = createClient({
    space: 'net5h47puy6b',
    accessToken: '6RegU3XQ8_4WD-oR55of99gsyj17xtUzBpAX6tEjwsU',
});

async function inspectColumn() {
    try {
        const response = await client.getEntries({
            content_type: 'column',
            limit: 1,
        });

        if (response.items.length > 0) {
            console.log('--- ALL FIELDS IN COLUMN ---');
            console.log(JSON.stringify(response.items[0].fields, null, 2));
        } else {
            console.log('No entries found');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

inspectColumn();
