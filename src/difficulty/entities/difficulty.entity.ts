import { Question } from "src/questions/entities/question.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Difficulty {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    nivel:number;
    @Column()
    numeroPreguntas: number;
    @Column()
    duracion:number;
    @Column()
    preguntas : string;
    @OneToMany(() => Question, (question) => question.tipodificult)
questions:Question[]
}
