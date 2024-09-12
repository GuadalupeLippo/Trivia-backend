import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Question } from 'src/questions/entities/question.entity'; 


@Entity()
export class Respuesta {
  @PrimaryGeneratedColumn()
  id_respuesta: number;

  @Column()
  descripcion: string;

  @Column({ type: 'boolean' })
  valor: boolean;


}
