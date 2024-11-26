import { Entity, PrimaryGeneratedColumn, Column, Table } from 'typeorm';

@Entity('departamento') // Nombre de la tabla en la base de datos
export class Departamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255,nullable: true })
  descripcion: string;

  @Column()
  idPais: number;

  @Column()
  estado: number;
}
