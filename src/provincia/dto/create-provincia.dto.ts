import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from "class-validator";


export class CreateProvinciaDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    descripcion: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    idDepartamento: number;

    @ApiProperty()
    @IsInt()
    status: number;
}
