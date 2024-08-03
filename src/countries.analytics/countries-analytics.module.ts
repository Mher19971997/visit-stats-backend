import { Module, forwardRef } from '@nestjs/common';
import { CountriesAnalyticsService } from '@visit_stats_backend/src/countries.analytics/countries-analytics.service';
import { CountriesAnalyticsController } from '@visit_stats_backend/src/countries.analytics/countries-analytics.controller';
import { CryptoService } from '@visit_stats_backend/shared/src/crypto/crypto.service';
import { CacheModule } from '@visit_stats_backend/shared/src/cache/cache.module';
import { RabbitMqModule } from '../worker/rabbitMq/rabbitMq.module';

@Module({
  imports: [CacheModule,
    forwardRef(() => RabbitMqModule)
  ],
  controllers: [CountriesAnalyticsController],
  providers: [CountriesAnalyticsService, CryptoService],
  exports: [CountriesAnalyticsService],
})

export class CountriesAnalyticsModule { }