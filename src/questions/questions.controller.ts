import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './question.entity';
import { QuestionsService } from './questions.service';

@Controller('workspaces/:workspaceId')
@UseGuards(AuthGuard())
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get('questions')
  getAllQuestions(
    @Param('workspaceId', ParseIntPipe) id: number,
  ): Promise<Question[]> {
    return this.questionsService.getAllQuestions(id);
  }
  @Get('questions/:questionId')
  getQuestion(
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<Question> {
    return this.questionsService.getQuestionById(questionId);
  }

  @Post('questions')
  @UsePipes(ValidationPipe)
  createWorkspace(
    @Body() createQuestionDto: CreateQuestionDto,
    @Param('workspaceId', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Question> {
    return this.questionsService.createQuestion(createQuestionDto, user, id);
  }
}
