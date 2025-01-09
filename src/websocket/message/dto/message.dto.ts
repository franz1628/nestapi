import { Expose } from "class-transformer";

export class MessageDto {
    @Expose()
    id: number;
    @Expose()
    texto: string;
    @Expose()
    idUsuario: number;
    @Expose()
    created_at:Date;
    @Expose()
    updated_at:Date;
    @Expose()
    estado:number;
    @Expose()
    visto:number;
}
