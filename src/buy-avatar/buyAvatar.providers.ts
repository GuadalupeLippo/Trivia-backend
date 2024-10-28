import { DataSource } from 'typeorm';
import { BuyAvatar } from './entities/buyAvatar.entity';
import { buyAvatarRepository, dataSource } from 'src/constants/constant';
export const buyAvatarProviders = [
    {
        provide: buyAvatarRepository,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(BuyAvatar),
        inject: [dataSource],
    },
];