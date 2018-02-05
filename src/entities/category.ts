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
      .innerJoinAndSelect('category.cards', 'cards')
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

  // static ratedCards(id) {
  // }

  public shuffledCards() {
    let cards = this.cards;
    // Fisher-Yates shuffle algorithm
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }
}
