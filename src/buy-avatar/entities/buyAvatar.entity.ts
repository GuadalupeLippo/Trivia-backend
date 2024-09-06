    import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
    import { Avatar } from "src/avatars/entities/avatar.entity";
    import { Player } from "src/player/entities/player.entity";
    
    @Entity()
    export class BuyAvatar {
        @PrimaryGeneratedColumn()
        id: number;
    
        @OneToOne(() => Avatar)
        @JoinColumn()  // Esto indica que esta entidad posee la clave foránea
        purchasedAvatar: Avatar;
        
         //relación muchos a uno: muchas compras de avatares pueden pertenecer a un mismo jugador 
        // y un jugador puede tener muchos avatares diferentes
        @ManyToOne(() => Player, player => player.buyAvatars, { eager: true })
        player: Player;
    }
    