import { Game } from 'src/games/entities/game.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity('respuestas')  
export class Answer {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column('text')
  opciones: string;  // Un array simple de opciones

  @Column()
  valor: boolean;  // Un valor booleano para "true" o "false"

  //relacion respuestas a partidas : muchas respuestas van a tener una partida.
  @ManyToOne(() => Game, game => game.id, { eager: true })
    game: Game;

    @ManyToOne(() => Question, question => question.id, {eager: true} )
    question: Question;
}
