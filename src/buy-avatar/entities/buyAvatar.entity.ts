    import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
    import { Avatar } from "src/avatars/entities/avatar.entity";
    
    @Entity()
    export class BuyAvatar {
        @PrimaryGeneratedColumn()
        id: number;
    
        @OneToOne(() => Avatar)
        @JoinColumn()  // Esto indica que esta entidad posee la clave foránea
        purchasedAvatar: Avatar;
        
        // @Column()
        // player:number;
    }
    