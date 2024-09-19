import { Game } from 'src/games/entities/game.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity('respuestas')  
export class Answer {
  @PrimaryGeneratedColumn()
  idRespuesta: number; 

  @Column('simple-array')
  opciones: string[];  // Un array simple de opciones

  @Column()
  valor: boolean;  // Un valor booleano para "true" o "false"

  //relacion respuestas a partidas : muchas respuestas van a tener una partida.
  @ManyToOne(() => Game, game => game.id, { eager: true })
    game: Game;
}
