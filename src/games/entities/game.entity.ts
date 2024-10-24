import { Answer } from "src/answer/entities/answer.entity";
import { Category } from "src/category/entities/category.entity";
import { Difficulty } from "src/difficulty/entities/difficulty.entity";
import { Player } from "src/player/entities/player.entity";
import { Question } from "src/questions/entities/question.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany} from "typeorm";

@Entity('games')
export class Game {

    @PrimaryGeneratedColumn()
    id : number;

    @Column({default: 0})
    totalScore: number;

    //relacion partidas-jugador: muchas partidas pueden tener un mismo jugador.
    @ManyToOne(() => Player, player => player.game, { eager: true })
    @JoinColumn()
    player: Player;

    //relacion partida-categoria: muchas va a ser de un tipo de categoria.
    @ManyToOne(() => Category, category => category.game )
    @JoinColumn()  // Esto indica que esta entidad posee la clave foránea
    category: Category;

    //relacion partida-dificultad : una artida va a tener un tipo de dificultad.
    @ManyToOne(() => Difficulty , difficulty  => difficulty.games)
    @JoinColumn()  // Esto indica que esta entidad posee la clave foránea
    difficulty: Difficulty;

    //relacion de la partida con las multiples preguntas
    @OneToMany(() => Question, question => question.game, {eager:true})
    questions: Question[];
}
