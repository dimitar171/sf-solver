import { Workspace } from '../workspaces/workspace.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { User } from 'src/auth/user.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.questions, {
    eager: false,
  })
  workspace: Workspace;
  @Column()
  workspaceId: number;

  @ManyToOne(() => User)
  @JoinTable()
  creator: User;

  @Column()
  creatorId: number;
  //CreatedAtDate
  //Points
}
