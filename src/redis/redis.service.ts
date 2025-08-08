import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisConfigService } from '../config/redis.config';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private readonly redis!: Redis;

  constructor(private redisConfigService: RedisConfigService) {
    try {
      this.redis = this.redisConfigService.createRedisConnection();

      this.redis.on('connect', () => {
        this.logger.log('Connected to Redis');
      });

      this.redis.on('error', (error: Error) => {
        this.logger.error('Redis connection error:', error);
      });
    } catch (error) {
      this.logger.error('Failed to initialize Redis connection:', error);
      throw error;
    }
  }

  getClient(): Redis {
    return this.redis;
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.redis.setex(key, ttl, value);
    } else {
      await this.redis.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  async del(key: string): Promise<number> {
    return await this.redis.del(key);
  }

  async exists(key: string): Promise<number> {
    return await this.redis.exists(key);
  }

  async ping(): Promise<string> {
    return await this.redis.ping();
  }

  onModuleDestroy() {
    this.redis.disconnect();
    this.logger.log('Disconnected from Redis');
  }
}
