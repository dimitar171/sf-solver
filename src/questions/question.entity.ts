import { Workspace } from 'src/workspaces/workspace.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

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
}
