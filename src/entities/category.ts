import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from 'typeorm';

import { Card } from '@entities/card';

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

  static findByName(name: string) {
    return this.createQueryBuilder('category')
      .where('category.name = :name', { name })
      .getOne();
  }

  static isValid(name) {
    return name.length > 2 ? true : false;
  }

  public get lastSeen() {
    if (!this.cards.length) return null;

    return this.cards.reduce((a, b) => {
      return a.seen_at > b.seen_at ? a : b;
    }).seen_at;
  }

  public shuffledCards() {
    let cards = this.cards;
    // Fisher-Yates shuffle algorithm
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }

  /**
   * Pick next card from stack and choose selection based
   * on user settings
   * @param algorithmic
   */

  public pickCard(algorithmic: boolean = true) {
    if (algorithmic) {
      // If Algorithmic Learning is activated, next card
      // will be picked from rated card stack
      let rated = [].concat(...this.cards.map((card) =>
        Array(Math.ceil(card.rate * 100)).fill(card)
      ));
      return rated[Math.floor(Math.random() * rated.length)];
    } else {
      // If Algorithmic Learning is deactivated, next
      // card will be picked from shuffled cards stack
      return this.shuffledCards()[0];
    }
  }
}
