import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Question {
    
@PrimaryGeneratedColumn()
id: number;
@Column()
description: string;
@Column()
category:string;

}
