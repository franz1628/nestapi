import { IsNotEmpty, IsInt, IsString, Min, Max, Length } from 'class-validator';

export class CreateDepartamentoDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  descripcion: string;

  @IsNotEmpty()
  @IsInt()
  idPais: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1) // Asumiendo que el estado puede ser 0 (inactivo) o 1 (activo)
  estado: number;
}
