import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;
  @Column() nombre: string;
  @Column() apellidoPaterno: string;
  @Column() apellidoMaterno: string;
  @Column() fechaNacimiento: Date;
  @Column() email: string;

  @CreateDateColumn({ type: 'datetime' }) 
  created_at: Date; 

  @UpdateDateColumn({ type: 'datetime' }) 
  updated_at: Date; 

  @Column({ type: 'int', default: 1 }) 
  status: number;
}
