import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from "class-validator";

export class CreateProvinciaDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 255)
    descripcion: string;
  
    @IsNotEmpty()
    @IsInt()
    idDepartamento: number;
}
