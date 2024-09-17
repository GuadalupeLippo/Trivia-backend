import { Difficulty } from "src/difficulty/entities/difficulty.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Question {
    
@PrimaryGeneratedColumn()
id: number;
@Column()
description: string;
@Column()
category:string 
   
@ManyToOne(() => Difficulty, (tipoDificult) => tipoDificult.questions, { eager: true })
tipodificult: Difficulty;
}
