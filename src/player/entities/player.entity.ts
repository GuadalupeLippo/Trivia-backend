import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { BuyAvatar } from "src/buy-avatar/entities/buyAvatar.entity";
import { BuyScore } from "src/buy-score/entities/buy-score.entity";
import { Game } from "src/games/entities/game.entity";

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({type: 'int', default: 0})
    score: number;

    @Column({default: "https://api.dicebear.com/9.x/bottts/svg?seed=Lilly"
    })
    defaultAvatar: string;

    
    @OneToOne(() => User ,{ eager: true })
    @JoinColumn()  
    user: User;

    // Relación uno a muchos con la entidad compra de avatares. Un jugador puede tener muchas compras
    @OneToMany(() => BuyAvatar, buyAvatar  => buyAvatar.player)
    buyAvatars: BuyAvatar [];

     // Relación uno a muchos con la entidad compra de puntos. Un jugador puede tener muchas compras
    @OneToMany(() => BuyScore, buyscore  => buyscore.player)
    buyscore: BuyScore [];

    //Relacion Jugador-Partida: un jugador puede tener varias partidas.
    @OneToMany(() => Game, game  => game.player , {eager:true})
    game: Game []
}
