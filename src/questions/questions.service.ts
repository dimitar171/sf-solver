import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from 'src/workspaces/workspace.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreateQuestionDto } from './dto/request/create-question.dto';
import { CreateQuestionResponseDto } from './dto/response/create-question-response.dto';
import { Question } from './question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question) private questionRepo: Repository<Question>,
    @InjectRepository(Workspace) private workspaceRepo: Repository<Workspace>,
  ) {}

  async createQuestion(
    workspaceId: number,
    user: User,
    data: CreateQuestionDto,
  ) {
    const workspace = await this.workspaceRepo.findOne({
      where: { id: workspaceId },
    });
    if (!workspace) {
      throw new NotFoundException(
        `Workspace with ID "${workspaceId}" not found`,
      );
    }
    const question = this.questionRepo.create({
      ...data,
      workspace,
      creator: user,
    });
    const exists = await this.questionRepo.findOneBy(data);
    if (exists) {
      throw new ConflictException('Workspace title already exists');
    }
    try {
      await this.questionRepo.save(question);
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return question;
  }

  async getAllQuestions(wId: number, user: User) {
    const questions = await this.questionRepo.find({
      where: { workspace: { id: wId }, creatorId: user.id },
    });
    return questions;
  }

  async getQuestionById(qid: number, wid: number, user: User) {
    const question = await this.questionRepo.findOne({
      where: { id: qid, workspaceId: wid, creatorId: user.id },
    });
    if (!question) {
      throw new NotFoundException(`Question with ID "${qid}" not found`);
    }
    return question;
  }

  async deleteQuestion(qid: number, wid: number, user: User) {
    const question = await this.questionRepo.findOne({
      where: { id: qid, workspaceId: wid, creatorId: user.id },
    });
    if (!question) {
      throw new NotFoundException(`Question with ID "${qid}" not found`);
    }
    return this.questionRepo.remove(question);
  }

  async updateQuestion(
    qid: number,
    wid: number,
    user: User,
    data: Partial<Question>,
  ) {
    const question = await this.questionRepo.findOne({
      where: { id: qid, workspaceId: wid, creatorId: user.id },
    });
    if (!question) {
      throw new NotFoundException(`Question with ID "${qid}" not found`);
    }
    await this.questionRepo.update(
      {
        id: qid,
      },
      data,
    );
    return question;
  }
}
