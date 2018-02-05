import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @Column({nullable: true, default: -1})
  strike: number;

  @ManyToOne(type => Category, category => category.cards)
  @JoinColumn()
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

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

  public updateStrike(answer: boolean) {
    this.strike = (answer ? this.strike + 1 : 0);
    this.save();
  }

  public get rate() {
    return Math.pow(1 / Math.E, (this.strike + (this.correct - this.wrong) / 100));
  }
}
