import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Question } from 'src/questions/entities/question.entity';
import { Categoria } from 'src/categoria/entities/categoria.entity';

@Entity()
export class Respuesta {
  @PrimaryGeneratedColumn()
  id_respuesta: number;

  @Column()
  descripcion: string;

  @Column({ type: 'boolean' })
  valor: boolean;

  @ManyToOne(() => Question, question => question.respuestas)
  pregunta: Question;

  @ManyToOne(() => Categoria, categoria => categoria.respuestas, { nullable: true })
  categoria: Categoria;
}

