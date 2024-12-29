import { Entity, PrimaryGeneratedColumn, Column, Table, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255,nullable: true })
  nombres: string;

  @Column({ length: 255,nullable: true })
  apellidoPaterno: string;
  
  @Column({ length: 255,nullable: true })
  apellidoMaterno: string;

  @Column()
  email: string;

  @Column()
  password: string;
  
  @Column()
  fechaNacimiento: Date;
  
  @Column()
  idCargo: number;

  @CreateDateColumn({ type: 'datetime' }) 
  created_at: Date; 
    
  @UpdateDateColumn({ type: 'datetime' }) 
  updated_at: Date; 
  
  @Column({ type: 'int', default: 1 }) 
  status: number;
}
