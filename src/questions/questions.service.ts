import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionsService {
  constructor(@InjectRepository(Question) private repo: Repository<Question>) {}

  async createQuestion(questionDto: CreateQuestionDto, user: User, id: number) {
    const { title, description } = questionDto;
    const question = new Question();
    question.title = title;
    question.description = description;
    question.workspace = user.workspaces[id - 1];
    question.workspace.user = user;
    await this.repo.save(question);
    return question;
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
