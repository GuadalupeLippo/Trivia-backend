import { DataSource } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { answerRepository, dataSource } from 'src/constants/constant';

export const answerProviders = [
  {
    // El proveedor 
    provide: answerRepository ,

    // obtiene el repositorio de la entidad Answer
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Answer),

    // Indica que el proveedor necesita la inyección del 'DATA_SOURCE'
    inject: [dataSource],
  },
];
