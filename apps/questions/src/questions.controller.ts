import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionsService } from './questions.service';

@Controller()
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}
  @MessagePattern({ cmd: 'greeting' })
  getGreetingMessage(name: string): string {
    return `Hello ${name}`;
  }
  @EventPattern('question_created')
  createQuestions(question: CreateQuestionDto) {
    return this.questionsService.createQuestions(question);
  }
  @MessagePattern({ cmd: 'get-all-questions' })
  getAllQuestions(workspaceId: number) {
    return this.questionsService.getAllQuestions(workspaceId);
  }
}
