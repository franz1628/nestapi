import { Pais } from 'src/pais/entities/pais.entity';
import { Provincia } from 'src/provincia/entities/provincia.entity';
import { Entity, PrimaryGeneratedColumn, Column, Table, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('departamento')
export class Departamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255,nullable: true })
  descripcion: string;

  @Column({ nullable: true })
  idPais: number;

  @Column()
  estado: number;

  @OneToMany(() => Provincia, provincia => provincia.Departamento)
  provincias: Provincia[];

  @ManyToOne(() => Pais, pais => pais.departamentos) 
  @JoinColumn({ name: 'idPais' }) 
  Pais: Pais;
}
