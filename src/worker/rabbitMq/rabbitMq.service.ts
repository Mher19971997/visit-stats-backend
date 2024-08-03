import { Injectable, Logger } from '@nestjs/common';

import { decorator } from '@visit_stats_backend/shared/src/decorator';
import { constants } from '@visit_stats_backend/shared/src/config/constants';
import { Channel, ConsumeMessage } from 'amqplib';
import { CountriesAnalyticsService } from '@visit_stats_backend/src/countries.analytics/countries-analytics.service';

@Injectable()
export class RabbitMqService {
  private readonly logger = new Logger(RabbitMqService.name);

  constructor(
    private readonly countriesAnalyticsService: CountriesAnalyticsService
  ) { }

  @decorator.amqp.Consume(constants.QUEUE_CREATE_COUNTRY, { noAck: false })
  async processSendVerificationCodeToEmail(data: any, msg: ConsumeMessage | null, channel: Channel) {
    let resp;
    try {
      resp = await this.countriesAnalyticsService.createCountry(data);

      this.logger.debug({ processVerifyEmail: resp });
      channel.ack(msg);
      return resp;
    } catch (e) {
      this.logger.error(e);
      channel.nack(msg);
      resp = e;
    }
  }
}