
const { createClient } = require('contentful');

const client = createClient({
    space: 'net5h47puy6b',
    accessToken: '6RegU3XQ8_4WD-oR55of99gsyj17xtUzBpAX6tEjwsU',
});

async function checkDetailedChoir() {
    try {
        console.log('--- Detailed Choir Entries ---');
        const response = await client.getEntries({
            content_type: 'choir',
            order: ['-fields.date'],
        });

        console.log('Total entries:', response.items.length);
        response.items.forEach((item, index) => {
            console.log(`${index + 1}. Title: ${item.fields.title}`);
            console.log(`   Date: ${item.fields.date}`);
            console.log(`   YouTube URL: ${item.fields.youtubeUrl}`);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

checkDetailedChoir();
