import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class ComponentLayoutDto {
  @IsNumber()
  @IsOptional()
  top?: number;

  @IsNumber()
  @IsOptional()
  left?: number;

  @IsNumber()
  @IsOptional()
  width?: number;

  @IsNumber()
  @IsOptional()
  height?: number;
}

export class ComponentDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsObject()
  properties: Record<string, any>;

  @IsObject()
  styles: Record<string, any>;

  @IsString()
  type: string;

  // @IsOptional()
  // @IsObject()
  // others: Record<string, any>;

  @IsOptional()
  parent: string;
}

export class CreateComponentDto {
  @IsObject()
  component: ComponentDto;
  @IsObject()
  layout: ComponentLayoutDto;
}

export class UpdateComponentDto {
  @IsObject()
  @IsOptional()
  component: Partial<ComponentDto>;
  @IsObject()
  @IsOptional()
  layout: Partial<ComponentLayoutDto>;
}
