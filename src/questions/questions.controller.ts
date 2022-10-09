import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateQuestionDto } from './dto/request/create-question.dto';
import { CreateQuestionResponseDto } from './dto/response/create-question-response.dto';
import { Question } from './question.entity';
import { QuestionsService } from './questions.service';

@Controller('workspaces/:workspaceId/questions')
@ApiTags('questions')
@ApiBearerAuth('JWT-auth')
@ApiUnauthorizedResponse({ description: 'Invalid credentials' })
@UseGuards(AuthGuard())
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Create question' })
  @ApiNotFoundResponse({ description: 'Question not found' })
  @ApiResponse({ status: 409, description: 'Duplicated Question title' })
  @UsePipes(ValidationPipe)
  createWorkspace(
    @Param('workspaceId', ParseIntPipe) workspaceId: number,
    @GetUser() user: User,
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<any> {
    return this.questionsService.createQuestion(
      workspaceId,
      user,
      createQuestionDto,
    );
  }

  @Get()
  @ApiOkResponse({ description: 'Get all questions' })
  getAllQuestions(
    @Param('workspaceId', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Question[]> {
    return this.questionsService.getAllQuestions(id, user);
  }

  @Get('/:questionId')
  @ApiOkResponse({ description: 'Get question by id' })
  @ApiNotFoundResponse({ description: 'Question not found' })
  getQuestion(
    @Param('workspaceId', ParseIntPipe) workspaceId: number,
    @Param('questionId', ParseIntPipe) questionId: number,
    @GetUser() user: User,
  ): Promise<Question> {
    return this.questionsService.getQuestionById(questionId, workspaceId, user);
  }

  @Delete('/:questionId')
  @ApiOkResponse({ description: 'Deleted question by id' })
  @ApiNotFoundResponse({ description: 'Question not found' })
  deleteQuestion(
    @Param('workspaceId', ParseIntPipe) workspaceId: number,
    @Param('questionId', ParseIntPipe) questionId: number,
    @GetUser() user: User,
  ): Promise<Question> {
    return this.questionsService.deleteQuestion(questionId, workspaceId, user);
  }

  @Patch('/:questionId')
  @ApiOkResponse({ description: 'Updated question by id' })
  @ApiNotFoundResponse({ description: 'Question not found' })
  putQuestion(
    @Param('workspaceId', ParseIntPipe) workspaceId: number,
    @Param('questionId', ParseIntPipe) questionId: number,
    @GetUser() user: User,
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    return this.questionsService.updateQuestion(
      questionId,
      workspaceId,
      user,
      createQuestionDto,
    );
  }
}
