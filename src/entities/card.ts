import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Category } from './category';

@Entity('card')
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(type => Category, category => category.cards)
  category: Category;

  constructor (
    content: string,
    category: Category
  ) {
    super();
    this.content = content;
    this.category = category
  }
}
