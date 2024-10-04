    import { Entity, PrimaryGeneratedColumn, Column ,ManyToOne } from "typeorm";
    import { Avatar } from "src/avatars/entities/avatar.entity";
    import { Player } from "src/player/entities/player.entity";
    
    @Entity()
    export class BuyAvatar {
        @PrimaryGeneratedColumn()
        id: number;
        
        @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date : Date;

         //relación muchos a uno: muchas compras de avatares pueden pertenecer a un mismo jugador 
        // y un jugador puede tener muchos avatares diferentes
        @ManyToOne(() => Player, player => player.buyAvatars, { eager: true })
        player: Player;

        @ManyToOne(() => Avatar, avatar => avatar.id, { eager: true })
        purchasedAvatar: Avatar;
    }
    