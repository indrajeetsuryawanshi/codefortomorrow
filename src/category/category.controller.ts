import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/auth/auth.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createCategory(@Body() categoryData: Category): Promise<Category> {
    return this.categoryService.createCategory(categoryData);
  }

  @UseGuards(AuthGuard)
  @Get('categories')
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @UseGuards(AuthGuard)
  @Put(':categoryId')
  async updateCategory(
    @Param('categoryId') categoryId: number,
    @Body() categoryData: Category,
  ): Promise<Category> {
    const updatedCategory = await this.categoryService.updateCategory(
      categoryId,
      categoryData,
    );
    if (!updatedCategory) {
      throw new NotFoundException('Category not found');
    }
    return updatedCategory;
  }

  @UseGuards(AuthGuard)
  @Delete(':categoryId')
  async removeEmptyCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<void> {
    return this.categoryService.removeEmptyCategory(categoryId);
  }
}
