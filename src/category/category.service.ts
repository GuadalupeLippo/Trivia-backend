import { Inject, Injectable , NotFoundException} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { categoryRepository, questionRepository } from 'src/constants/constant';
import { Category } from './entities/category.entity';
import { Question } from 'src/questions/entities/question.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(categoryRepository)
    private categoryRepository: Repository<Category>,
    @Inject(questionRepository)
    private questionRepository: Repository<Question>
  ){}

  async getCategoryByIdWithQuestionRandom(categoryId: number) : Promise<Category> {
    try{
    const category = await this.categoryRepository.findOne({ where: { id: categoryId },
    relations:['question'] });;
    if (!category) {
      throw new Error('Categoría no encontrada');
    }

    // Obtener las preguntas aleatorias asociadas a esa categoría
    const questionsRandom = await this.questionRepository
      .createQueryBuilder("question")
      .innerJoin("question.category", "category")
      .where("category.id = :categoryId", { categoryId: categoryId })
      .orderBy("RAND()")
      .take(50)
      .getMany();

    
    return {
      ...category,
      question: questionsRandom,
    };} catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async getCategoryById(categoryId:number){
    try{
    const category = await this.categoryRepository.findOne({ where: { id: categoryId },
      relations:['question'] });;
      if (!category) {
        throw new NotFoundException('Categoría no encontrada');
      }
      const questions = await this.questionRepository
      .createQueryBuilder("question")
      .innerJoin("question.category", "category")
      .where("category.id = :categoryId", { categoryId: categoryId })
      .getMany();

    
    return {
      ...category,
      question: questions,
  }} catch (err) {
    throw new NotFoundException(err.message);
  }
}


  async createOne(createcategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createcategoryDto)
    return this.categoryRepository.save(category)
  }
  
  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      relations: ['question',
        'game'
      ]
    })
    if (!categories.length) throw new NotFoundException("No categories in database")
    return categories
  }

  async updateCategory(id: number, updatecategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.preload({
      id: id,
      ...updatecategoryDto
    })
    if (!category) throw new NotFoundException(`Category with id ${id} not found`)
    return await this.categoryRepository.save(category)
  }

  async removeCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) throw new NotFoundException(`Category with id ${id} not found`);
    await this.categoryRepository.remove(category);
  }
  
}
