import { Global, Module, forwardRef } from '@nestjs/common';
import { AmqpModule } from '@visit_stats_backend/shared/src/amqp/amqp.module';
import { RabbitMqService } from './rabbitMq.service';
import { CountriesAnalyticsModule } from '@visit_stats_backend/src/countries.analytics/countries-analytics.module';

@Module({
    imports: [AmqpModule, forwardRef(() => CountriesAnalyticsModule)],
    providers: [RabbitMqService,],
    exports: [RabbitMqService],
})
export class RabbitMqModule { }