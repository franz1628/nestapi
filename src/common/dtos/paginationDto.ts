import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1; // Página por defecto

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 5; // Límite por defecto
}