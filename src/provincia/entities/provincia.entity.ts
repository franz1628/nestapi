import { Exclude } from "class-transformer";
import { Departamento } from "src/departamento/entities/departamento.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('provincia')
export class Provincia {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 255,nullable: true })
    descripcion: string;
  
    @Column({ nullable: true })
    idDepartamento: number;
  
    @CreateDateColumn({ type: 'datetime' }) 
    created_at: Date; 
    
    @UpdateDateColumn({ type: 'datetime' }) 
    updated_at: Date; 
    
    @Column({ type: 'int', default: 1 }) 
    status: number;

    @ManyToOne(() => Departamento, departamento => departamento.provincias) 
    @JoinColumn({ name: 'idDepartamento' }) 
    Departamento: Departamento;
}
