import { Answer } from "src/answer/entities/answer.entity";
import { Difficulty } from "src/difficulty/entities/difficulty.entity";
import { Game } from "src/games/entities/game.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  category: string;

  @ManyToOne(() => Difficulty, (tipoDificult) => tipoDificult.questions, { eager: true })
  tipodificult: Difficulty;

  @ManyToOne(() => Game, game => game.id, { eager: true })
  game: Game;

  @OneToMany(() => Answer, answer => answer.id, { eager: true} )
  answer: Answer;



}

