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

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }


  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: string) {
    return this.categoryService.remove(+id);
  }
}
