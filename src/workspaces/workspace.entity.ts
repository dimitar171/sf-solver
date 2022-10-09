import { Question } from '../questions/question.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class Workspace extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.workspaces, { eager: false })
  user: User;
  @Column()
  userId: number;

  @OneToMany(() => Question, (question) => question.workspace, {
    eager: true,
  })
  questions: Question[];
}
