import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class TipoDificult {
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
}
