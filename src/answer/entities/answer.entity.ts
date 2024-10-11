import { Game } from 'src/games/entities/game.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('respuestas')  
export class Answer {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column('text')
  description: string; 

  @Column({ type: 'boolean', nullable: true }) // Campo opcional que puede ser true o null
  value: boolean | null;

  // Relación respuestas a partidas: muchas respuestas van a tener una partida.
  @ManyToOne(() => Game, game => game.id, { eager: true })
  game: Game;

  @ManyToOne(() => Question, question => question.id, { eager: true })
  question: Question;
}
