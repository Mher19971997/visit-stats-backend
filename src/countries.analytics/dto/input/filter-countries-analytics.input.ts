import { ApiProperty } from '@nestjs/swagger';
import { decorator } from '@visit_stats_backend/shared/src/decorator';
import { FilterInput } from '@visit_stats_backend/shared/src/sequelize/meta';
import { Util } from '@visit_stats_backend/shared/src/util/util';
import { CountriesAnalyticEntity } from '@visit_stats_backend/src/countries.analytics/dto/output';

@decorator.ajv.Schema({
  type: 'object',
  $ref: 'CountriesAnalyticEntity',
})
export class FilterCountriesAnalyticInput extends Util.mixin<CountriesAnalyticEntity, FilterInput>(CountriesAnalyticEntity, FilterInput) { }

@decorator.ajv.Schema({
  type: 'object',
  $ref: 'CommonEntity',
  properties: {
    time: {
      type: 'string',
      enum: ['month', 'week', 'day']
    },
  },
  required: ['time']
}
)
export class FilterTotalize {
  @ApiProperty({ required: true, enum: ['month', 'week', 'day'] })
  declare time?: string;
}