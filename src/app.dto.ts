import { IsString } from 'class-validator';

export class siteDto {
  @IsString()
  host: string;
}
