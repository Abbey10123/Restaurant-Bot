const cache = require ("../../cache")


const waitForCache = async (key, retries = 10, delay = 500) => {
    for (let i = 0; i < retries; i++) {
        const value = await cache.redis.get(key);
        if (value) return value;
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    return null;
};

module.exports = waitForCache