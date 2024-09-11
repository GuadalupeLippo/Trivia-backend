import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { dataSource, userRepository } from 'src/constants/constant';

export const userProviders = [
    {
        provide: userRepository,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: [dataSource],
    },
];