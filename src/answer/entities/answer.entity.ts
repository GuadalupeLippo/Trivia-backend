import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity('respuestas')  
export class Answer {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column('text')
  opciones: string[];  // Un array simple de opciones

  @Column()
  valor: boolean;  // Un valor booleano para "true" o "false"

}
