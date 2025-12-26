import Redis from 'ioredis';

let redis: Redis | null = null;
let redisDisabled = false;

// Only connect to Redis if REDIS_URL is explicitly provided
// This makes Redis opt-in and allows graceful fallback to in-memory storage
if (process.env.REDIS_URL) {
    try {
        redis = new Redis(process.env.REDIS_URL, {
            // Don't retry forever on connection failure
            maxRetriesPerRequest: 1,
            retryStrategy: (times) => {
                // Stop retrying after 3 attempts
                if (times > 3) {
                    console.warn('Redis connection failed after 3 attempts, disabling Redis');
                    redisDisabled = true;
                    return null; // Stop retrying
                }
                return Math.min(times * 100, 1000); // Retry with backoff
            },
            connectTimeout: 5000, // 5 second connection timeout
            lazyConnect: true, // Don't connect until first command
        });

        redis.on('error', (err) => {
            // Only log once, then disable
            if (!redisDisabled) {
                console.error('Redis Client Error - falling back to in-memory storage:', err.message);
                redisDisabled = true;
            }
        });

        redis.on('connect', () => {
            console.log('Redis client connected successfully');
            redisDisabled = false;
        });
    } catch (error) {
        console.warn('Failed to initialize Redis client, falling back to in-memory storage.');
        redis = null;
        redisDisabled = true;
    }
} else {
    console.log('REDIS_URL not set - using in-memory rate limiting');
}

type RateLimitStore = Map<string, { count: number; lastReset: number }>;
const memoryStore: RateLimitStore = new Map();

export async function rateLimit(ip: string, limit: number, windowMs: number): Promise<boolean> {
    // Redis Strategy - only use if redis is available and not disabled
    if (redis && !redisDisabled) {
        try {
            const key = `rate_limit:${ip}`;
            const current = await redis.incr(key);

            if (current === 1) {
                await redis.expire(key, Math.ceil(windowMs / 1000));
            }

            return current <= limit;
        } catch (error) {
            // Disable redis on failure and fall back to memory
            redisDisabled = true;
            console.error('Redis rate limit error, switching to in-memory storage');
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

