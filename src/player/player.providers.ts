import { DataSource } from 'typeorm';
import { Player } from './entities/player.entity';
import { dataSource, playerRepository } from 'src/constants/constant';

export const playerProviders = [
    {
        provide: playerRepository,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Player),
        inject: [dataSource],
    },
];