import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('category')
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    static findByName(firstName: string, lastName: string) {
      return this.createQueryBuilder('category')
          .where('category.name = :name', { firstName })
          .getMany();
  }
}
