import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Workspace } from '../workspaces/workspace.entity';
import { WorkspacesModule } from '../workspaces/workspaces.module';
import { WorkspacesService } from '../workspaces/workspaces.service';
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
