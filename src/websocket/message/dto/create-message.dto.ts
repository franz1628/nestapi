import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsInt, IsString } from "class-validator";


export class CreateMessageDto {
    @Expose()
    @ApiProperty()
    @IsString({message:"Debe ser cadena de texto"})
    texto: string;

    @Expose()
    @ApiProperty()
    @IsInt({message:"Debe ser entero"})
    idUsuario: number;
}
