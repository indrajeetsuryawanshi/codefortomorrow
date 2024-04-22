import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { Service } from './entities/service.entity';
import { AuthGuard } from 'src/auth/auth.service';

@Controller('category/:categoryId/service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @UseGuards(AuthGuard)
  @Post()
  async addService(
    @Param('categoryId') categoryId: number,
    @Body() serviceData: Service,
  ): Promise<Service> {
    return this.serviceService.addService(categoryId, serviceData);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllServices(
    @Param('categoryId') categoryId: number,
  ): Promise<Service[]> {
    return this.serviceService.getAllServices(categoryId);
  }

  @UseGuards(AuthGuard)
  @Delete(':serviceId')
  async removeService(
    @Param('categoryId') categoryId: number,
    @Param('serviceId') serviceId: number,
  ): Promise<void> {
    const result = await this.serviceService.removeService(
      categoryId,
      serviceId,
    );
    if (!result) {
      throw new NotFoundException('Service not found');
    }
  }
}
