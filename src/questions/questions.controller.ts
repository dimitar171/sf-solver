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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
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
@UseGuards(AuthGuard())
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get()
  @ApiOkResponse({ description: 'Get all questions' })
  getAllQuestions(
    @Param('workspaceId', ParseIntPipe) id: number,
  ): Promise<Question[]> {
    return this.questionsService.getAllQuestions(id);
  }
  @Get('/:questionId')
  @ApiCreatedResponse({ description: 'Get question by id' })
  getQuestion(
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<Question> {
    return this.questionsService.getQuestionById(questionId);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Create Questions' })
  @UsePipes(ValidationPipe)
  createWorkspace(
    @Body() createQuestionDto: CreateQuestionDto,
    @Param('workspaceId', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<CreateQuestionResponseDto> {
    return this.questionsService.createQuestion(createQuestionDto, user, id);
  }
}
