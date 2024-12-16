import { IsNotEmpty, IsInt, IsString, Min, Max, Length } from 'class-validator';

export class CreateDepartamentoDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  descripcion: string;

  @IsNotEmpty()
  @IsInt()
  idPais: number;
}
