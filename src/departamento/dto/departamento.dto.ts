import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Departamento } from "src/departamento/entities/departamento.entity";
import { Pais } from "src/pais/entities/pais.entity";

export class DepartamentoDto {
    @ApiProperty()
    @Expose()
    id: number;
    @ApiProperty()
    @Expose()
    descripcion: string;
    @ApiProperty()
    @Expose()
    idPais: number;
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
    Pais: Pais;
}