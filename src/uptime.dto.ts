import { IsString } from 'class-validator';

import { IsInt, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class siteDto {
  @IsString()
  host: string;
}

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
