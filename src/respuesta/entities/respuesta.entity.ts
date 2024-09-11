import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Pregunta } from 'src/pregunta/pregunta.entity';
import { Categoria } from 'src/categoria/categoria.entity';

@Entity()
export class Respuesta {
  @PrimaryGeneratedColumn()
  id_respuesta: number;

  @Column()
  descripcion: string;

  @Column({ type: 'boolean' })
  valor: boolean;

  @ManyToOne(() => Pregunta, pregunta => pregunta.respuestas)
  pregunta: Pregunta;

  @ManyToOne(() => Categoria, categoria => categoria.respuestas, { nullable: true })
  categoria: Categoria;
}

