import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { BuyAvatar } from "src/buy-avatar/entities/buyAvatar.entity";

@Entity()
export class Avatar {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    image:string;
    @Column()
    price:number;
 
    @OneToMany(() => BuyAvatar, buyAvatar => buyAvatar.purchasedAvatar)
    purchasedAvatars: BuyAvatar[]

}




