import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Score {
    @PrimaryGeneratedColumn()
    id:number;
    @Column('int')
    points: number;
    @Column('int')
    price: number;
}

