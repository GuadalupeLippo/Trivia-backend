import { Game } from "src/games/entities/game.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Difficulty {
    @PrimaryGeneratedColumn()
    id:number;

    @Column('varchar', {length: 40})
    nivel:string;
  
    @Column('int')
    duracion:number;
      //relacion partida-dificultad : una artida va a tener un tipo de dificultad.
      @OneToMany(() => Game, game => game.difficulty)
      games: Game[]; // Esto permite acceder a los juegos que usan esta dificultad
  
}
