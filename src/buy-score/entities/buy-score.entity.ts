import { Entity, PrimaryGeneratedColumn, OneToOne, Column, ManyToOne } from "typeorm";
import { Score } from "src/score/entities/score.entity";
import { Player } from "src/player/entities/player.entity";

@Entity()
export class BuyScore {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date : Date;

    
     //relación muchos a uno: muchas compras de puntos pueden pertenecer a un mismo jugador 
    // y un jugador puede tener muchos puntos diferentes
    @ManyToOne(() => Player, player => player.buyscore, { eager: true })
    player: Player;

      //relación muchos a uno: muchas compras de puntos pueden ser de una misma cantidad de punto 
    // y una puntuacion puede tener muchas compras diferentes
    @ManyToOne(() => Score, score => score.buyscore, { eager: true })
    score: Score;
}

