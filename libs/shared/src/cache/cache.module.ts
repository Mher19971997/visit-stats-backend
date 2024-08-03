import { Global, Module } from '@nestjs/common';
import { CacheService } from '@visit_stats_backend/shared/src/cache/cache.service';
import { Redis } from '@visit_stats_backend/shared/src/cache/redis';

@Global()
@Module({
  providers: [CacheService, Redis],
  exports: [CacheService],
})
export class CacheModule {}
