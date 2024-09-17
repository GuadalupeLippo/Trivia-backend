import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  idCategoria: number;

  @Column()
  tipo: string;

  @Column()
  logo: string;
}
