import { DataSource } from 'typeorm';
import { Question } from './entities/question.entity';
import { dataSource, questionRepository } from 'src/constants/constant';

export const questionProviders = [
    {
        provide: questionRepository,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Question),
        inject: [dataSource],
    },
];