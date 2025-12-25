import Redis from 'ioredis';

let redis: Redis | null = null;

// Only connect to Redis if REDIS_URL is explicitly provided
// This makes Redis opt-in and allows graceful fallback to in-memory storage
if (process.env.REDIS_URL) {
    try {
        redis = new Redis(process.env.REDIS_URL);
        redis.on('error', (err) => {
            console.error('Redis Client Error', err);
        });
        redis.on('connect', () => {
            console.log('Redis client connected successfully');
        });
    } catch (error) {
        console.warn('Failed to initialize Redis client, falling back to in-memory storage.', error);
        redis = null;
    }
}

type RateLimitStore = Map<string, { count: number; lastReset: number }>;
const memoryStore: RateLimitStore = new Map();

export async function rateLimit(ip: string, limit: number, windowMs: number): Promise<boolean> {
    // Redis Strategy
    if (redis) {
        try {
            const key = `rate_limit:${ip}`;
            const current = await redis.incr(key);

            if (current === 1) {
                await redis.expire(key, Math.ceil(windowMs / 1000));
            }

            return current <= limit;
        } catch (error) {
            console.error('Redis rate limit error, invalidating open configuration', error);
            // Fallback to memory if redis fails
        }
    }

    // In-Memory Fallback Strategy
    const now = Date.now();
    const record = memoryStore.get(ip) || { count: 0, lastReset: now };

    if (now - record.lastReset > windowMs) {
        record.count = 0;
        record.lastReset = now;
    }

    record.count += 1;
    memoryStore.set(ip, record);

    return record.count <= limit;
}
