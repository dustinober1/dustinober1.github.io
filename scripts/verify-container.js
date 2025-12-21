// Using global fetch (Node 18+)

const BASE_URL = 'http://localhost:3000';
const USER_ID = 'test-verification-user';
const EBOOK_ID = 'pmp';

async function runVerification() {
    console.log('Starting verification...');

    // 1. Wait for server (primitive retry)
    let retries = 10;
    while (retries > 0) {
        try {
            await fetch(BASE_URL);
            console.log('Server is up!');
            break;
        } catch (e) {
            console.log('Waiting for server...');
            await new Promise(r => setTimeout(r, 2000));
            retries--;
        }
    }

    if (retries === 0) {
        console.error('Server failed to start in time.');
        process.exit(1);
    }

    // 2. Test Get Progress (should be empty first)
    console.log(`\nTesting GET /api/progress/${EBOOK_ID}...`);
    try {
        const res = await fetch(`${BASE_URL}/api/progress/${EBOOK_ID}?userId=${USER_ID}`);
        const data = await res.json();
        console.log('Initial Progress:', data);

        if (res.status !== 200) throw new Error('Failed to fetch progress');
    } catch (e) {
        console.error('GET Error:', e);
    }

    // 3. Test Update Progress
    console.log(`\nTesting POST /api/progress/${EBOOK_ID}...`);
    try {
        const payload = {
            userId: USER_ID,
            chapterId: '/chapter-1',
            scrollPosition: 50,
            timeSpent: 60,
            ebookId: EBOOK_ID // usually in params but verify payload processing
        };

        const res = await fetch(`${BASE_URL}/api/progress/${EBOOK_ID}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        console.log('Update Response:', data);

        if (data.progress.scroll_position !== 50) {
            throw new Error('Progress update mismatch!');
        }
    } catch (e) {
        console.error('POST Error:', e);
    }

    // 4. Test Analytics
    console.log(`\nTesting GET /api/progress/analytics...`);
    try {
        const res = await fetch(`${BASE_URL}/api/progress/analytics?userId=${USER_ID}`);
        const data = await res.json();
        console.log('Analytics:', data);

        if (data.stats.totalBooksStarted < 1) {
            throw new Error('Analytics failed to reflect started book');
        }
    } catch (e) {
        console.error('Analytics Error:', e);
    }

    console.log('\nVerification Complete.');
}

// Support for older node versions without top-level await or fetch
if (!global.fetch) {
    console.log("Using built-in fetch or shim if needed. (Node 18+ has fetch)");
}

runVerification();
