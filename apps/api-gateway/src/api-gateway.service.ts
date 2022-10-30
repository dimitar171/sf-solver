import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateWorkspaceDto } from './dtos/create-workspace.dto';

@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject('QUESTIONS_SERVICE') private clientQuest: ClientProxy,
    @Inject('WORKSPACES_SERVICE') private clientWork: ClientProxy,
    @Inject('AUTH_SERVICE') private clientAuth: ClientProxy,
  ) {}

  async signUp(user: CreateUserDto) {
    return this.clientAuth.emit('sign-up', user);
  }

  async signIn(user: CreateUserDto) {
    return this.clientAuth.send(
      {
        cmd: 'sign-in',
      },
      user,
    );
  }

  async createWorkspaces(creator: string, workspace: CreateWorkspaceDto) {
    workspace.createdBy = creator;
    return this.clientWork.emit('workspace-created', workspace);
  }

  async getWorkspaces(creator: string) {
    return this.clientWork.send(
      {
        cmd: 'get-all-workspaces',
      },
      creator,
    );
  }
  async createQuestions(
    question: CreateQuestionDto,
    id: number,
    creator: string,
  ) {
    question.workspaceId = id;
    question.createdBy = creator;
    return this.clientQuest.emit('question_created', question);
  }

  async getQuestions(id: number, creator: string) {
    return this.clientQuest.send(
      {
        cmd: 'get-all-questions',
      },
      { id, creator },
    );
  }
}
