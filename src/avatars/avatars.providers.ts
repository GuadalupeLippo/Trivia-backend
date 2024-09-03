// Este proveedor permite que el repositorio de Photo esté disponible en toda la aplicación, facilitando las operaciones de base de datos relacionadas con la entidad Photo. Exporta un array de proveedores para la entidad Photo

import { DataSource } from 'typeorm';
import { Avatar } from './entities/avatar.entity';
export const avatarProviders = [
    {
        // El proveedor se identifica por la cadena 'PHOTO_REPOSITORY'
        provide: 'AVATAR_REPOSITORY',

        // Define una fábrica que obtiene el repositorio de la entidad Photo
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Avatar),

        // Indica que el proveedor necesita la inyección del 'DATA_SOURCE'
        inject: ['DATA_SOURCE'],
    },
];