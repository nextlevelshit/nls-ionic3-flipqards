import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('category')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  constructor (name) {
    super();
    this.name = name;
  }

  static all() {
    return this.createQueryBuilder('category')
      .orderBy('category.name')
      .getMany();
  }

  static findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder('category')
        .where('category.name = :name', { firstName })
        .getMany();
  }
}
