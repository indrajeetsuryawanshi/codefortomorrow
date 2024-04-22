import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'src/service/entities/service.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Service]), JwtModule],

  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
