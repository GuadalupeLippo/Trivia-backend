import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  idCategoria: number;

  @Column()
  tipo: string;

  @Column({ nullable: true }) 
  logo: string;
}
