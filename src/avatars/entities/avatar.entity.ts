import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Avatar {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    image:string;
    @Column()
    price:number;
}




