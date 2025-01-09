import { table } from "console";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("message")
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    texto: string;

    @Column()
    idUsuario: number;

    @CreateDateColumn({ type: 'datetime' }) 
    created_at:Date;

    @UpdateDateColumn({ type: 'datetime' }) 
    updated_at:Date;

    @Column({ type: 'int', default: 1 }) 
    estado:number;

    @Column({ type: 'int', default: 1 }) 
    visto:number;

}
