// import { DataSource } from 'typeorm';
// import { Difficulty } from './entities/difficulty.entity';
// import { dataSource, difficultyRepository } from 'src/constants/constant';

// export const questionProviders = [
//     {
//         provide: difficultyRepository,
//         useFactory: (dataSource: DataSource) => dataSource.getRepository(Difficulty),
//         inject: [dataSource],
//     },
// ];