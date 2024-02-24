import { IsString, MaxLength } from 'class-validator';

export class CreatePageDto {
  @MaxLength(50)
  @IsString()
  name: string;

  @IsString()
  route: string;
}
