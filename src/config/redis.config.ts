import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisConfigService {
  constructor(private configService: ConfigService) {}

  createRedisConnection(): Redis {
    const config: any = {
      host: this.configService.get('REDIS_HOST', 'localhost'),
      port: this.configService.get('REDIS_PORT', 6379),
      connectTimeout: 10000,
      maxRetriesPerRequest: 3,
    };

    const password = this.configService.get('REDIS_PASSWORD');
    if (password) {
      config.password = password;
    }

    return new Redis(config);
  }
}
