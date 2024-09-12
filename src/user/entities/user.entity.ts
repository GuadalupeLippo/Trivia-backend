import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({length: 100})
    name: string;

    @Column('varchar', {length: 100, unique: true})
    email: string;

    @Column('varchar', {length: 60})
    password: string;

    @Column({default: "https://api.dicebear.com/9.x/bottts/svg?seed=Lilly"
    })
    defaultAvatar: string;
}
