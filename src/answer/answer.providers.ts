import { DataSource } from 'typeorm';
import { Answer } from './entities/answer.entity';

export const answerProviders = [
  {
    // El proveedor 
    provide: 'ANSWER_REPOSITORY',

    // obtiene el repositorio de la entidad Answer
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Answer),

    // Indica que el proveedor necesita la inyección del 'DATA_SOURCE'
    inject: ['DATA_SOURCE'],
  },
];
