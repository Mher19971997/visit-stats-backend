import { Module } from '@nestjs/common';
import { SharedService } from '@visit_stats_backend/shared/src/shared.service';

@Module({
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {}
