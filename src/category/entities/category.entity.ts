import { Game } from 'src/games/entities/game.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column()
  logo: string;

  @OneToOne(() => Game, (game) => game.category)
  game: Game;
  @OneToMany(() => Question , (question) => question.id)
  question: Question;
}
