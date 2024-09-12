import { TipoDificult } from "src/tipo-dificult/entities/tipo-dificult.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  category: string;

  @ManyToOne(() => TipoDificult, (tipoDificult) => tipoDificult.questions, { eager: true })
  tipodificult: TipoDificult;
}
