import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  constructor(private readonly redisService: RedisService) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      const result = await this.redisService.ping();
      const isHealthy = result === 'PONG';

      const healthResult = this.getStatus(key, isHealthy, {
        message: isHealthy ? 'Redis is available' : 'Redis is not responding',
      });

      if (isHealthy) {
        return healthResult;
      }
      throw new HealthCheckError('Redis check failed', healthResult);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      throw new HealthCheckError(
        'Redis check failed',
        this.getStatus(key, false, {
          message: errorMessage,
        }),
      );
    }
  }
}
