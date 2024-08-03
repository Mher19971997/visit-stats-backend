import { Global, Module } from '@nestjs/common';
import { connect, Channel } from 'amqplib';

import { ConfigService } from '@visit_stats_backend/shared/src/config/config.service';
import { AmqpService } from '@visit_stats_backend/shared/src/amqp/amqp.service';
import { ConfigModule } from '@visit_stats_backend/shared/src/config/config.module';

@Global()
@Module({
  
  imports: [ConfigModule],
  providers: [
    {
      inject: [ConfigService],
      provide: 'AMQPChannel',
      useFactory: async (configService: ConfigService): Promise<Channel> => {
        const amqpConfig = configService.get<any>('queue.amqp');
        const conn = await connect(amqpConfig.url);
        return conn.createChannel();
      },
    },
    AmqpService,
  ],
  exports: ['AMQPChannel', AmqpService],
})
export class AmqpModule {}