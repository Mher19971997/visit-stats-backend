// bull.config.ts
import { BullModuleOptions, BullOptionsFactory } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BullConfigService implements BullOptionsFactory  {
  createBullOptions(): BullModuleOptions {
    return {
      redis: {
        host: 'localhost',
        port: 6379,
        password: 'rB4dRlyn38F75Sg13Xd5iNM1wfSYZY708gh',

      },
    };
  }
}
