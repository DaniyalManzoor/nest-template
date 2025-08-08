import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from './redis.service';
import { RedisConfigService } from '../config/redis.config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [RedisService, RedisConfigService],
  exports: [RedisService],
})
export class RedisModule {}
