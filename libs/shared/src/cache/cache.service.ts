import { Injectable } from '@nestjs/common';
import { Redis } from '@visit_stats_backend/shared/src/cache/redis';
import { RedisClientType, RedisDefaultModules, RedisFunctions, RedisModules, RedisScripts } from 'redis';
import { json5 } from '@visit_stats_backend/shared/src/util/parser/json5';

@Injectable()
export class CacheService {
  public client: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>;

  constructor(private redis: Redis) {}
  
  async set(key: any, val: any, opt: any) {
    await this.conn();
    return this.client.set(key, json5.stringify(val), opt);
  }

  async get(key: any) {
    await this.conn();
    const value = await this.client.get(key);
    return value ? json5.parse(value) : null;
  }

  async has(key: any) {
    await this.conn();
    return !!(await this.get(key));
  }

  async scan(key: any): Promise<string[]> {
    await this.conn();
    const res = [];
    for await (const rKey of this.client.scanIterator({
      MATCH: `${key}*`,
      COUNT: 1000000,
    })) {
      res.push(rKey);
    }
    return res;
  }

  async del(key: any) {
    await this.conn();
    return !!(await this.client.del(key));
  }

  async increment(key: string): Promise<void> {
    await this.conn();
    await this.client.incr(key);
  }

  async getAllCountries(): Promise<{ country: string; count: number }[]> {
    await this.conn();
    const keys = await this.scan('*');
    const countries = [];

    for (const key of keys) {
      const count = await this.get(key);
      countries.push({ country: key, count });
    }

    return countries;
  }

  async conn() {
    if (!this.client) {
      await this.redis.connection();
      this.client = this.redis.client;
    }
  }
}
