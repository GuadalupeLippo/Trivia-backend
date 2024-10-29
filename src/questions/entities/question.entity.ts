import { Answer } from "src/answer/entities/answer.entity";
import { Category } from "src/category/entities/category.entity";
import { Game } from "src/games/entities/game.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => Game, game => game.questions)
  game: Game;

  @OneToMany(() => Answer, answer => answer.question, { cascade: true, 
    eager:true
  } )
  answers: Answer[];

  @ManyToOne(() => Category, category => category.question )
  category: Category;




}

