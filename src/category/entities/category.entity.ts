import { Game } from 'src/games/entities/game.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  idCategoria: number;

  @Column()
  tipo: string;

  @Column()
  logo: string;

  @OneToOne(() => Game, (game) => game.category)
  game: Game;
}
