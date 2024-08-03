import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity } from '@visit_stats_backend/shared/src/sequelize/common-entity';
import { decorator } from '@visit_stats_backend/shared/src/decorator';

@decorator.ajv.Schema({
  type: 'object',
  $ref: 'CommonEntity',
  properties: {
    country: {
      type: 'string',
      countryCode: true
    },
  },
})
export class CountriesAnalyticEntity extends CommonEntity {
  @ApiProperty({ required: true, description: 'write only correct Country'  })
  declare country?: string;
}





export class CreateCountriesAnalyticOutPut  {
  @ApiProperty({ required: true })
  status: string
}


export class CountriesAnalyticCatchOutPut  {
  @ApiProperty({ required: true })
  country: string

  @ApiProperty({ required: true })
  count: number
}


export class CountriesAnalyticOutput {
  @ApiProperty({ example: '2024-08-03', required: false })
  day?: string;

  @ApiProperty({ example: '2024-31', required: false })
  week?: string;

  @ApiProperty({ example: '2024-08', required: false })
  month?: string;

  @ApiProperty({ example: 'AM' })
  country: string;

  @ApiProperty({ example: '4008' })
  count: string;
}