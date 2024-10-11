import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { BuyScore } from "src/buy-score/entities/buy-score.entity";

@Entity()
export class Score {
    @PrimaryGeneratedColumn()
    id:number;

    @Column('int')
    points: number;

    @Column('decimal')
    price: number;

    @Column({default : null})
    image: string;

    // Relación uno a muchos con la entidad compra de puntos. Una instancia de puntaje puede tener muchas compras
    @OneToMany(() => BuyScore, buyscore  => buyscore.score)
    buyscore: BuyScore [];
}

