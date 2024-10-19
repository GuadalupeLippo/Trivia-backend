
import { Question } from 'src/questions/entities/question.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('answers')  
export class Answer {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column('text')
  description: string; 

  @Column({ type: 'boolean', nullable: true }) // Campo opcional que puede ser true o null
  value: boolean | null;

  @ManyToOne(() => Question, question => question.answers, {onDelete : 'CASCADE'})
  question: Question;
}
