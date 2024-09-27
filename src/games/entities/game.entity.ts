import { Answer } from "src/answer/entities/answer.entity";
import { Category } from "src/category/entities/category.entity";
import { Difficulty } from "src/difficulty/entities/difficulty.entity";
import { Player } from "src/player/entities/player.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany} from "typeorm";

@Entity('games')
export class Game {

    @PrimaryGeneratedColumn()
    id : number;

    @Column('int')
    score: number;

    //relacion partidas-jugador: muchas partidas pueden tener un mismo jugador.
    @ManyToOne(() => Player, player => player.id, { eager: true })
    player: Player;

    //relacion partida-categoria: una partida va a ser de un tipo de categoria.
    @OneToOne(() => Category, category => category.game )
    @JoinColumn()  // Esto indica que esta entidad posee la clave foránea
    category: Category;

    //relacion partida-dificultad : una artida va a tener un tipo de dificultad.
    @OneToOne(() => Difficulty)
    @JoinColumn()  // Esto indica que esta entidad posee la clave foránea
    difficulty: Difficulty;

    //relacion partidas-respuestas: una partida puede tener muchas respuestas.
    @OneToMany(()=> Answer, answer => answer.game)
    answer: Answer [];
}
