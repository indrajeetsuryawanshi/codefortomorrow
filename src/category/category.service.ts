import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(categoryData: Category): Promise<Category> {
    const newCategory = this.categoryRepository.create(categoryData);
    return await this.categoryRepository.save(newCategory);
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async updateCategory(
    categoryId: number,
    categoryData: Category,
  ): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!existingCategory) {
      return null;
    }
    await this.categoryRepository.merge(existingCategory, categoryData);
    return await this.categoryRepository.save(existingCategory);
  }

  async removeEmptyCategory(categoryId: number): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.services.length > 0) {
      throw new NotFoundException('Category is not empty');
    }

    await this.categoryRepository.delete(categoryId);
  }
}
