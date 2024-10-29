import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createOne(createCategoryDto);
  }

  //este endpoint es el que va a traer solo 50 preguntas mas alla de las que haya cargadas
  @Get(':id')
  async getCategoryByIdWhitQuestionsRandom(@Param('id',ParseIntPipe) id: number) {
      const category = await this.categoryService.getCategoryByIdWithQuestionRandom(id);
      return category
  } 

 //este endpoint nos trae todas las preguntas cargadas
  @Get(':id/allquestions')
  async getCategoryById(@Param('id',ParseIntPipe) id: number) {
      const category = await this.categoryService.getCategoryById(id);
      return category
  } 


  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }


  @Patch(':id')
  async updateCategory(@Param('id',ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryService.updateCategory(+id, updateCategoryDto);
  }

  @Delete(':id')
  async removeCategory(@Param('id',ParseIntPipe) id: number) {
    return await this.categoryService.removeCategory(+id);
  }
}
