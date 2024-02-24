import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePageDto {
  @IsOptional()
  @MaxLength(50)
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  route: string;
}
