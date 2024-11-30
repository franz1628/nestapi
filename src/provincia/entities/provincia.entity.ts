import { Departamento } from "src/departamento/entities/departamento.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('provincia')
export class Provincia {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 255,nullable: true })
    descripcion: string;
  
    @Column({ nullable: true })
    idDepartamento: number;
  
    @Column()
    estado: number;

    @ManyToOne(() => Departamento, departamento => departamento.provincias) 
    @JoinColumn({ name: 'idDepartamento' }) 
    Departamento: Departamento;
}
