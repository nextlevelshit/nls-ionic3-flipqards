import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('settings')
export class Settings extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 1})
  algorithmicLearning: boolean;

  @Column({default: 0})
  stats: boolean;

  @Column({ default: 0})
  synchronize: boolean;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor (
  ) {
    super();
  }
}
