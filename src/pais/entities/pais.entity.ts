import { Departamento } from 'src/departamento/entities/departamento.entity';
import { Provincia } from 'src/provincia/entities/provincia.entity';
import { Entity, PrimaryGeneratedColumn, Column, Table, OneToMany } from 'typeorm';

@Entity('pais')
export class Pais {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255,nullable: true })
  descripcion: string;

  @Column()
  estado: number;

  @OneToMany(() => Departamento, departamento => departamento.Pais)
  departamentos: Departamento[];
}
