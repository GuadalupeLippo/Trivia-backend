// Este proveedor permite que el repositorio de Photo esté disponible en toda la aplicación, facilitando las operaciones de base de datos relacionadas con la entidad Photo. Exporta un array de proveedores para la entidad Photo

import { DataSource } from 'typeorm';
import { Avatar } from './entities/avatar.entity';
import { avatarRepository, dataSource } from 'src/constants/constant';
export const avatarProviders = [
    {
        // El proveedor se identifica por la cadena 'PHOTO_REPOSITORY'
        provide: avatarRepository,

        // Define una fábrica que obtiene el repositorio de la entidad Photo
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Avatar),

        // Indica que el proveedor necesita la inyección del 'DATA_SOURCE'
        inject: [dataSource],
    },
];