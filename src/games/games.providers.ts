import { DataSource } from 'typeorm';
import { Game } from './entities/game.entity';
import { dataSource, gameRepository } from 'src/constants/constant';
export const gameProviders = [
    {
        // El proveedor se identifica por la cadena 'PHOTO_REPOSITORY'
        provide: gameRepository,

        // Define una fábrica que obtiene el repositorio de la entidad Photo
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Game),

        // Indica que el proveedor necesita la inyección del 'DATA_SOURCE'
        inject: [dataSource],
    },
];