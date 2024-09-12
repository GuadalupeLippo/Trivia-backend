import { TipoDificult } from "src/tipo-dificult/entities/tipo-dificult.entity";
import { Respuesta } from "src/respuesta/entities/respuesta.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

  @OneToMany(() => Respuesta, (respuesta) => respuesta.question)
  respuestas: Respuesta[];
}

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  category: string;

  @ManyToOne(() => TipoDificult, (tipoDificult) => tipoDificult.questions, { eager: true })
  tipodificult: TipoDificult;
import { Respuesta } from "src/respuesta/entities/respuesta.entity";
import { TipoDificult } from "src/tipo-dificult/entities/tipo-dificult.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

  @OneToMany(() => Respuesta, (respuesta) => respuesta.question)
  respuestas: Respuesta[];
}

}
