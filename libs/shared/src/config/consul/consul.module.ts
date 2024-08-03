import { Global, Module } from '@nestjs/common';
import { ConsulService } from '@visit_stats_backend/shared/src/config/consul/consul.service';

@Global()
@Module({
  providers: [
    ConsulService,
    {
      inject: [ConsulService],
      provide: 'ConsulService',
      useFactory: (consulService: ConsulService) => consulService.registerService(),
    },
  ],
})
export class ConsulModule {}
