import { DataSource } from 'typeorm';
import { BuyScore } from './entities/buy-score.entity';
import { buyScoreRepository } from 'src/constants/constant';

export const buyAvatarProviders = [
    {
        provide: buyScoreRepository ,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(BuyScore),
        inject: ['DATA_SOURCE'],
    },
];