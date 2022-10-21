import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { CreateWorkspaceDto } from './dtos/create-workspace.dto';

@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject('QUESTIONS_SERVICE') private clientQuest: ClientProxy,
    @Inject('WORKSPACES_SERVICE') private clientWork: ClientProxy,
  ) {}

  async getHello() {
    return this.clientQuest.send({ cmd: 'greeting' }, 'Progressive Coder');
  }

  async createWorkspaces(workspace: CreateWorkspaceDto) {
    return this.clientWork.emit('workspace-created', workspace);
  }

  async getWorkspaces() {
    return this.clientWork.send(
      {
        cmd: 'get-all-workspaces',
      },
      '',
    );
  }
  async createQuestions(question: CreateQuestionDto, id: number) {
    question.workspaceId = id;
    return this.clientQuest.emit('question_created', question);
  }

  async getQuestions(id: number) {
    return this.clientQuest.send(
      {
        cmd: 'get-all-questions',
      },
      id,
    );
  }
}
