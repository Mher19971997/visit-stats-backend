import { Injectable } from '@nestjs/common';
import * as st from '@nestjs/sequelize';

import { CommonService } from '@visit_stats_backend/shared/src/sequelize/common.service';
import { FilterService } from '@visit_stats_backend/shared/src/sequelize/filter.service';

import { countriesAnalyticDto } from '@visit_stats_backend/src/countries.analytics/dto';
import { CountriesAnalytic } from '@visit_stats_backend/service/src/model/countriesAnalytic/countries-analytic';
import ___ from 'lodash';
import { CacheService } from '@visit_stats_backend/shared/src/cache/cache.service';
import { fn, literal } from 'sequelize';
import { Util } from '@visit_stats_backend/shared/src/util/util';

@Injectable()
export class CountriesAnalyticsService extends CommonService<
  CountriesAnalytic,
  countriesAnalyticDto.inputs.CreateCountriesAnalyticInput,
  countriesAnalyticDto.inputs.FilterCountriesAnalyticInput,
  countriesAnalyticDto.inputs.UpdateCountriesAnalyticInput,
  countriesAnalyticDto.outputs.CountriesAnalyticEntity
> {

  constructor(
    @st.InjectModel(CountriesAnalytic)
    private readonly countriesAnalyticModel: typeof CountriesAnalytic,
    private readonly paginateService: FilterService,
    private readonly cacheService: CacheService,
  ) {
    super({ model: countriesAnalyticModel, paginateService });
  }

  async createCountry(inputDto: countriesAnalyticDto.inputs.CreateCountriesAnalyticInput,) {
    await this.upsertCatchCountry(inputDto)
    return super.create(inputDto);
  }

  async findAllByCatch(filterDto: countriesAnalyticDto.inputs.FilterCountriesAnalyticInput) {
    return await this.cacheService.getAllCountries()
  }

  async totalizeByTimestamp(filterDto: countriesAnalyticDto.inputs.FilterTotalize) {
    const timeObj = Util.toFilterTime(filterDto.time)
    return await this.countriesAnalyticModel.findAll({
      attributes: [
        [literal(`TO_CHAR("createdAt", ${timeObj.format})::text`), timeObj.time],
        'country',
        [fn('COUNT', literal('1')), 'count'],
      ],
      group: [
        literal(`TO_CHAR("createdAt", ${timeObj.format})::text`) as any,
        'country',
      ],
      order: [
        literal(`TO_CHAR("createdAt", ${timeObj.format})::text`) as any,
        'country',
      ],
    });
  }

  async upsertCatchCountry(inputDto: countriesAnalyticDto.inputs.CreateCountriesAnalyticInput) {
    const countryKey = `${inputDto.country}`;

    // Check if country exists in Redis
    const countryCount = await this.cacheService.get(countryKey);

    if (countryCount) {
      // If exists, increment the count
      await this.cacheService.increment(countryKey);
    } else {
      // If not exists, create the entry with count 1
      await this.cacheService.set(countryKey, 1, {});
    }
  }
}