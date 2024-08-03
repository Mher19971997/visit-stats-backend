import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path'

import { ServiceModule } from '@visit_stats_backend/service/src/service.module';
import { ConfigModule } from '@visit_stats_backend/shared/src/config/config.module';
import { SequelizeModule } from '@visit_stats_backend/shared/src/sequelize/sequelize.module';
import { CryptoService } from '@visit_stats_backend/shared/src/crypto/crypto.service';
import { CountriesAnalyticsModule } from '@visit_stats_backend/src/countries.analytics/countries-analytics.module';

@Module({
  imports: [
    ServiceModule.register(),
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    ConfigModule.forRoot(),
    SequelizeModule,
    CountriesAnalyticsModule,
  ],
  controllers: [],
  providers: [CryptoService],
})

export class AppModule {}
