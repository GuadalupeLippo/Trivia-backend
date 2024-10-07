import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { BuyAvatar } from "src/buy-avatar/entities/buyAvatar.entity";

export enum AvatarType {
    NORMAL = "normal",
    PREMIUM = "premium"
}

@Entity()
export class Avatar {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image: string;

    @Column()
    price: number;

    @Column({
        type: "enum",
        enum: AvatarType,
        default: AvatarType.NORMAL
    })
    type: AvatarType;

    @OneToMany(() => BuyAvatar, buyAvatar => buyAvatar.purchasedAvatar)
    purchasedAvatars: BuyAvatar[];
}
