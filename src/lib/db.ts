import { Pool } from 'pg';

// Lazy load pool to prevent build failures when env var is missing
let pool: Pool | null = null;

function getPool() {
    if (pool) return pool;

    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL environment variable is not defined');
    }

    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    });

    return pool;
}

export const query = (text: string, params?: any[]) => {
    return getPool().query(text, params);
};

// export default pool; // Cannot export value if lazy, but query is main interface
