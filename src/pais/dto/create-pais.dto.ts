import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from "class-validator";

export class CreatePaisDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 255)
    descripcion: string;
}
