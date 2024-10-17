import { Inject, Injectable , NotFoundException} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { categoryRepository } from 'src/constants/constant';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(categoryRepository)
    private categoryRepository: Repository<Category>,
  ){}

  async createOne(createcategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createcategoryDto)
    return this.categoryRepository.save(category)
  }
  
  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find()
    if (!categories.length) throw new NotFoundException("No categories in database")
    return categories
  }

  async update(id: number, updatecategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.preload({
      id: id,
      ...updatecategoryDto
    })
    if (!category) throw new NotFoundException(`Category with id ${id} not found`)
    return await this.categoryRepository.save(category)
  }

  async remove(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) throw new NotFoundException(`Category with id ${id} not found`);
    await this.categoryRepository.remove(category);
  }
}
