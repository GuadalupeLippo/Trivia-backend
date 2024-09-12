import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { BuyAvatar } from "src/buy-avatar/entities/buyAvatar.entity";
import { BuyScore } from "src/buy-score/entities/buy-score.entity";

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id : number;

    @Column('int')
    score: number;

    @Column('int')
    games: number;

    
    @OneToOne(() => User)
    @JoinColumn()  // Esto indica que esta entidad posee la clave foránea
    user: User;

    // Relación uno a muchos con la entidad compra de avatares. Un jugador puede tener muchas compras
    @OneToMany(() => BuyAvatar, buyAvatar  => buyAvatar.player)
    buyAvatars: BuyAvatar [];

     // Relación uno a muchos con la entidad compra de puntos. Un jugador puede tener muchas compras
    @OneToMany(() => BuyScore, buyscore  => buyscore.player)
    buyscore: BuyScore [];
}
