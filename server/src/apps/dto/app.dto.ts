import { Expose } from 'class-transformer';

export class AppDto {
  @Expose()
  slug: string;

  @Expose()
  name: string;

  @Expose()
  owner: string;
}
