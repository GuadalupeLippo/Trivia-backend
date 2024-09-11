import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({length: 100})
    name: string;

    @Column({length: 100})
    email: string;

    @Column()
    password: string;

    @Column()
    defaultAvatar: string;
}
