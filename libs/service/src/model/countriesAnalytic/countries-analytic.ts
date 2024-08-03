import { SequelizeModule } from '@nestjs/sequelize';
import * as st from 'sequelize-typescript';

import { literal } from 'sequelize';
import { UUID } from '@visit_stats_backend/shared/src/sequelize/meta';
import { CountriesAnalyticEntity } from '@visit_stats_backend/src/countries.analytics/dto/output';

@st.Table({
  tableName: 'countries_analytics',
  modelName: 'CountriesAnalytic',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
})
export class CountriesAnalytic extends st.Model<CountriesAnalyticEntity> {
  @st.Column({
    type: st.DataType.UUID,
    primaryKey: true,
    defaultValue: literal('uuid_generate_v4()'),
  })
  declare uuid: UUID;

  @st.Column({ type: st.DataType.STRING })
  declare country: string;

  @st.Column({ type: st.DataType.DATE })
  declare createdAt: Date;

  @st.Column({ type: st.DataType.DATE })
  declare updatedAt: Date;

  @st.Column({ type: st.DataType.DATE })
  declare deletedAt: Date;
}

export const CountriesAnalyticEntry = SequelizeModule.forFeature([CountriesAnalytic]);
