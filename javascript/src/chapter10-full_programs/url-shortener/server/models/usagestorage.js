class UsageStorage {
  constructor(host, port) {
    const redis = require('redis');

    this.maxUsageLength = 10;
    this.storage = redis.createClient({
      host,
      port,
      prefix: 'usage'
    });
  }
  getCurrentDateKey() {
    const d = new Date();
    return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');
  }

  addMake(url) {
    this.add(url, { make: 1, visit: 0 }, 'make');
  }

  addVisit(url) {
    this.add(url, { make: 0, visit: 1 }, 'visit');
  }

  async add(url, defaultValue, addedProp) {
    let stored = await this.read(url);
    const currentDateKey = this.getCurrentDateKey();
    const currentDateFilter = each => each.date === currentDateKey;

    if (
      !stored ||
      stored.length === 0 ||
      stored.filter(currentDateFilter).length === 0
    ) {
      this.storage.set(
        url,
        JSON.stringify([{ date: currentDateKey, usage: defaultValue }])
      );
    } else {
      stored.filter(currentDateFilter)[0].usage[addedProp]++;

      if (stored.length > this.maxUsageLength) {
        stored = stored.splice(
          stored.length - this.maxUsageLength,
          this.maxUsageLength
        );
      }

      this.storage.set(url, JSON.stringify(stored));
    }
  }

  read(url) {
    return new Promise((resolve, reject) => {
      this.storage.get(url, (error, value) => {
        try {
          resolve(JSON.parse(value));
        } catch (e) {
          this.storage.del(url);
          reject(e);
        }
      });
    });
  }
}
require('dotenv').config();
module.exports = new UsageStorage(
  process.env.REDIS_HOST,
  process.env.REDIS_PORT
);
