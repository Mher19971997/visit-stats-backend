import * as c from '@nestjs/common';
import * as sw from '@nestjs/swagger';
import { AmqpService } from '@visit_stats_backend/shared/src/amqp/amqp.service';
import { constants } from '@visit_stats_backend/shared/src/config/constants';
import { CountriesAnalyticsService } from '@visit_stats_backend/src/countries.analytics/countries-analytics.service';
import { countriesAnalyticDto } from '@visit_stats_backend/src/countries.analytics/dto';

@c.Controller('countries_analytics')
export class CountriesAnalyticsController {
  constructor(
    private readonly countriesAnalyticsService: CountriesAnalyticsService,
    private readonly amqpService: AmqpService
  ) { }

  @c.Post()
  @sw.ApiOperation({ description: 'Create country' })
  @sw.ApiOkResponse({ description: 'Create country Response', type: countriesAnalyticDto.outputs.CreateCountriesAnalyticOutPut })
  async create(@c.Body() inputDto: countriesAnalyticDto.inputs.CreateCountriesAnalyticInput) {
    await this.amqpService.send(constants.EXCHANGE_WORKER, `/send/${constants.CREATE_COUNTRY}`, inputDto);
    return {
      status: 'ok'
    };
  }

  @c.Get()
  @sw.ApiOperation({ description: 'Get Countries activity by (day, week, month)' })
  @sw.ApiOkResponse({ description: 'Preview array of Countries', type: [countriesAnalyticDto.outputs.CountriesAnalyticOutput] })
  async totalizeByTimestamp(@c.Query() filterDto: countriesAnalyticDto.inputs.FilterTotalize) {
    return this.countriesAnalyticsService.totalizeByTimestamp(filterDto);
  }

  @c.Get('catch')
  @sw.ApiOperation({ description: 'Get Countries witch Catch' })
  @sw.ApiOkResponse({ description: 'Preview array of Countries', type: [countriesAnalyticDto.outputs.CountriesAnalyticCatchOutPut] })
  async findAllByCatch(@c.Query() filterDto: countriesAnalyticDto.inputs.FilterCountriesAnalyticInput) {
    return this.countriesAnalyticsService.findAllByCatch(filterDto);
  }
}
