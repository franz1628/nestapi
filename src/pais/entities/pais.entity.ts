import { Departamento } from 'src/departamento/entities/departamento.entity';
import { Provincia } from 'src/provincia/entities/provincia.entity';
import { Entity, PrimaryGeneratedColumn, Column, Table, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('pais')
export class Pais {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255,nullable: true })
  descripcion: string;

  @CreateDateColumn({ type: 'datetime' }) 
  created_at: Date; 

  @UpdateDateColumn({ type: 'datetime' }) 
  updated_at: Date; 

  @Column({ type: 'int', default: 1 }) 
  status: number;

  @OneToMany(() => Departamento, departamento => departamento.Pais)
  departamentos: Departamento[];
}
