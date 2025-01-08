import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from "class-validator";


export class CreateProvinciaDto {
    @ApiProperty()
    @IsNotEmpty({message : "Se necesita una descripcion"})
    @IsString({message : "Descripcion debe sera una cadena"})
    descripcion: string;
  
    @ApiProperty()
    @IsNotEmpty({message : "Se necesita un departamento"})
    @IsInt({message : "Departamento debe ser un entero"})
    idDepartamento: number;

    @ApiProperty()
    @IsInt({message : "Debe ser entero"})
    status: number;
}
