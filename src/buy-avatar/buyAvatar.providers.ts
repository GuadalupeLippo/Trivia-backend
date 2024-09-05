import { DataSource } from 'typeorm';
import { BuyAvatar } from './entities/buyAvatar.entity';
export const buyAvatarProviders = [
    {
        provide: 'BUYAVATAR_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(BuyAvatar),
        inject: ['DATA_SOURCE'],
    },
];