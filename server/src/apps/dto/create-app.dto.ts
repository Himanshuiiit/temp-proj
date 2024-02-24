import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAppDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'App name should be less than 50 characters' })
  name: string;
}
