import { DynamicModule, Module } from '@nestjs/common';
import { CountriesAnalyticEntry } from '@visit_stats_backend/service/src/model/countriesAnalytic/countries-analytic';

const models: DynamicModule[] = [
  CountriesAnalyticEntry,
];

@Module({
  imports: models,
  exports: models
})
export class ModelModule { }
