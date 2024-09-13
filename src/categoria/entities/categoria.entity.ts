import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Respuesta } from 'src/respuesta/entities/respuesta.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column()
  nombre: string;

  //aca va relacion con preguntas de una a muchas


}
