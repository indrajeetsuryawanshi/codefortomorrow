// service.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async addService(categoryId: number, serviceData: Service): Promise<Service> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const newService = this.serviceRepository.create({
      ...serviceData,
      category,
    });
    return await this.serviceRepository.save(newService);
  }

  async getAllServices(categoryId: number): Promise<Service[]> {
    const category = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.services', 'services')
      .where('category.id = :id', { id: categoryId })
      .getOne();

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category.services;
  }

  async removeService(categoryId: number, serviceId: number): Promise<any> {
    const service = await this.serviceRepository.findOne({
      where: { id: serviceId },
    });
    if (!service) {
      throw new NotFoundException('Service not found');
    }

    // Check if the service belongs to the specified category
    if (service.category.id !== categoryId) {
      throw new NotFoundException(
        'Service not found in the specified category',
      );
    }

    await this.serviceRepository.delete(serviceId);
  }
}
