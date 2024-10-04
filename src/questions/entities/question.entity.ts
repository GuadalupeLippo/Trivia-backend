import { Answer } from "src/answer/entities/answer.entity";
import { Category } from "src/category/entities/category.entity";
import { Difficulty } from "src/difficulty/entities/difficulty.entity";
import { Game } from "src/games/entities/game.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

   @ManyToOne(() => Difficulty, (difficulty) => difficulty.questions)
  difficulty: Difficulty;

  @ManyToOne(() => Game, game => game.id)
  game: Game;

  @OneToMany(() => Answer, answer => answer.id )
  answer: Answer;

  @ManyToOne(() => Category, category => category.id )
  category: Category;




}

