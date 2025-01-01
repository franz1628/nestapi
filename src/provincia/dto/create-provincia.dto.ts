import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from "class-validator";

export class CreateProvinciaDto {
    @IsNotEmpty()
    @IsString()
    descripcion: string;
  
    @IsNotEmpty()
    @IsInt()
    idDepartamento: number;
}
