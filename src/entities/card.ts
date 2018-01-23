import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';

import { Category } from './category';

@Entity('card')
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  front: string;

  @Column()
  back: string;

  @Column({nullable: true, default: 0})
  correct: number;

  @Column({nullable: true, default: 0})
  wrong: number;

  @ManyToOne(type => Category, category => category.cards)
  @JoinColumn()
  category: Category;

  constructor (
    front: string,
    back: string,
    category: Category
  ) {
    super();
    this.front = front;
    this.back = back;
    this.category = category;
  }

  public views() {
    return this.correct + this.wrong;
  }
}
