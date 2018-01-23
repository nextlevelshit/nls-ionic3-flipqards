import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';

import { Category } from './category';

@Entity('card')
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  // @Column('int')
  // count: number;

  // @Column('int')
  // correct: number;

  // @Column('int')
  // wrong: number;

  @ManyToOne(type => Category, category => category.cards)
  @JoinColumn()
  category: Category;

  // @OneToOne(type => Card, { eager: true })
  // @JoinColumn()
  // link: Card;

  constructor (
    content: string,
    category: Category,
    link?: Card
  ) {  // @OneToOne(type => Card, { eager: true })
  // @JoinColumn()
  // link: Card;
    super();
    this.content = content;
    this.category = category;
    // this.link = link ? link : null

    // console.log('adding card', content, category);
  }
}
