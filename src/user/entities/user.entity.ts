import { Player } from "src/player/entities/player.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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


    @OneToOne(() => Player, (player) => player.user)
    player: Player;
   
}
