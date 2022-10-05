import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreateQuestionDto } from './dto/request/create-question.dto';
import { CreateQuestionResponseDto } from './dto/response/create-question-response.dto';
import { Question } from './question.entity';

@Injectable()
export class QuestionsService {
  constructor(@InjectRepository(Question) private repo: Repository<Question>) {}

  async createQuestion(
    questionDto: CreateQuestionDto,
    user: User,
    id: number,
  ): Promise<CreateQuestionResponseDto> {
    const { title, description } = questionDto;
    const question = new Question();
    question.title = title;
    question.description = description;
    question.workspace = user.workspaces[id - 1];
    question.workspace.user = user;
    await this.repo.save(question);
    return {
      id: question.id,
      workspaceId: question.workspace.id,
      userId: question.workspace.user.id,
    };
  }

  async getQuestionById(id: number) {
    const found = await this.repo.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Workspace with ID "${id}" not found`);
    }
    return found;
  }

  async getAllQuestions(id: number) {
    const query = this.repo.createQueryBuilder('question');
    query.andWhere('question.workspaceId = :workspaceId', { workspaceId: id });
    const find = await query.getMany();
    console.log(find);
    return find;
  }
}
