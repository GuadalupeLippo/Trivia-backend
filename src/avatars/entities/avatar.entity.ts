import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
// importar entidad BuyAvatar y OneToOne
@Entity()
export class Avatar {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    image:string;
    @Column()
    price:number;

    // @OneToOne(()=>BuyAvatar, buyAvatar => buyAvatar.id)
    // buyAvatar:BuyAvatar
}

