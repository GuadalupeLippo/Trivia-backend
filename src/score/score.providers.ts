import { DataSource } from 'typeorm';
import { Score } from './entities/score.entity';
import { scoreRepository } from 'src/constants/constant';
export const scoreProviders = [
    {
        // El proveedor se identifica por la cadena 'PHOTO_REPOSITORY'
        provide: scoreRepository,

        // Define una fábrica que obtiene el repositorio de la entidad Photo
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Score),

        // Indica que el proveedor necesita la inyección del 'DATA_SOURCE'
        inject: ['DATA_SOURCE'],
    },
];