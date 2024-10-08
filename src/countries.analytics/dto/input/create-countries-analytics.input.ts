import { decorator } from '@visit_stats_backend/shared/src/decorator';
import { CountriesAnalyticEntity } from '@visit_stats_backend/src/countries.analytics/dto/output';

@decorator.ajv.Schema({
  type: 'object',
  $ref: 'CountriesAnalyticEntity',
  required: ['country'],
})
export class CreateCountriesAnalyticInput extends CountriesAnalyticEntity {}
