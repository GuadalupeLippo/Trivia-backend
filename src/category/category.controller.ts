import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createOne(createCategoryDto);
  }

  //este endpoint es el que va a traer solo 50 preguntas mas alla de las que haya cargadas
  @Get(':id')
  async getCategoryByIdWithQuestions(@Param('id',ParseIntPipe) id: number) {
      const categoryWithQuestion = await this.categoryService.getCategoryByIdWithQuestionRandom(id);
      return categoryWithQuestion;
  } 
 //este endpoint nos trae todas las preguntas cargadas
  @Get(':id/allquestions')
  async getCategoryById(@Param('id',ParseIntPipe) id: number) {
      const category = await this.categoryService.getCategoryById(id);
      return category
  } 


  @Get()
  findAll() {
    return this.categoryService.findAll();
  }


  @Patch(':id')
  updateCategory(@Param('id',ParseIntPipe) id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(+id, updateCategoryDto);
  }

  @Delete(':id')
  removeCategory(@Param('id',ParseIntPipe) id: string) {
    return this.categoryService.removeCategory(+id);
  }
}
