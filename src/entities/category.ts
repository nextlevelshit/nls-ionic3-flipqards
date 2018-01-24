import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from 'typeorm';

import { Card } from './card';



@Entity('category')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Card, card => card.category, { eager: true })
  @JoinTable()
  cards: Card[];

  constructor (name) {
    super();
    this.name = name;
  }

  static all() {
    return this.createQueryBuilder('category')
      .orderBy('category.name')
      .getMany();
  }

  static findByName(name: string) {
    return this.createQueryBuilder('category')
        .where('category.name = :name', { name })
        .getOne();
  }

  static isValid(name) {
    return true;
  }
}
