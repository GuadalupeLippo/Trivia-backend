import { TipoDificult } from "src/tipo-dificult/entities/tipo-dificult.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;


 //esta seria una relacion muchas a una
  @Column()
  category: string;

  @ManyToOne(() => TipoDificult, (tipoDificult) => tipoDificult.questions, { eager: true })
  tipodificult: TipoDificult;


}

