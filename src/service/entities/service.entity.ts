import { Category } from 'src/category/entities/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serviceName: string;

  @Column()
  type: string;

  @ManyToOne(() => Category, (category) => category.services)
  category: Category;

  @Column('simple-array')
  priceOptions: string[];
}
