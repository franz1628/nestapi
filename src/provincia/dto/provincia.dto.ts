import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { DepartamentoDto } from "src/departamento/dto/departamento.dto";
import { Departamento } from "src/departamento/entities/departamento.entity";

export class ProvinciaDto {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    descripcion: string;

    @ApiProperty()
    @Expose()
    idDepartamento: number;

    @ApiProperty()
    @Expose()
    created_at: Date; 

    @ApiProperty()
    @Expose()
    updated_at: Date; 

    @ApiProperty()
    @Expose()
    status: number;

    @ApiProperty()
    @Expose()
    Departamento: DepartamentoDto;
}