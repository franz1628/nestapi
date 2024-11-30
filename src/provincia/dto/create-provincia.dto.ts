import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from "class-validator";

export class CreateProvinciaDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 255)
    descripcion: string;
  
    @IsNotEmpty()
    @IsInt()
    idDepartamento: number;
  
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(1) // Asumiendo que el estado puede ser 0 (inactivo) o 1 (activo)
    estado: number;
}
