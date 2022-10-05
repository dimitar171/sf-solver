import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Workspace } from 'src/workspaces/workspace.entity';
import { WorkspacesModule } from 'src/workspaces/workspaces.module';
import { WorkspacesService } from 'src/workspaces/workspaces.service';
import { AuthModule } from '../auth/auth.module';
import { Question } from './question.entity';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Workspace, User]),
    AuthModule,
    WorkspacesModule,
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, WorkspacesService],
})
export class QuestionsModule {}
