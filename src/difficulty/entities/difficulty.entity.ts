import { Question } from "src/questions/entities/question.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Difficulty {
    @PrimaryGeneratedColumn()
    id:number;

    @Column('varchar', {length: 40})
    nivel:string;
  
    @Column('int')
    duracion:number;

    @OneToMany(() => Question, (question) => question.difficulty)
questions:Question[]
}
