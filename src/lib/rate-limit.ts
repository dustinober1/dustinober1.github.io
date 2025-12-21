import Redis from 'ioredis';

// Use environment variable for Redis URL or default to localhost
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

let redis: Redis | null = null;

try {
    if (process.env.NODE_ENV === 'production' || process.env.REDIS_URL) {
        redis = new Redis(REDIS_URL);
        redis.on('error', (err) => {
            console.error('Redis Client Error', err);
        });
    }
} catch (error) {
    console.warn('Failed to initialize Redis client, falling back to in-memory storage.', error);
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
