import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { CreateWorkspaceDto } from './dtos/create-workspace.dto';
@Controller('/workspaces')
export class ApiGatewayController {
  constructor(private readonly appService: ApiGatewayService) {}

  @Get('/greeting')
  async getHello() {
    return this.appService.getHello();
  }

  @Post()
  async createWorkspaces(@Body() createWorkspace: CreateWorkspaceDto) {
    return this.appService.createWorkspaces(createWorkspace);
  }

  @Get()
  async getWorkspaces() {
    return this.appService.getWorkspaces();
  }

  @Post('/:workspaceId/questions')
  async createQuestions(
    @Body() createWorkspace: CreateQuestionDto,
    @Param('workspaceId', ParseIntPipe) workspaceId: number,
  ) {
    return this.appService.createQuestions(createWorkspace, workspaceId);
  }

  @Get('/:workspaceId/questions')
  async getQuestions(@Param('workspaceId', ParseIntPipe) workspaceId: number) {
    return this.appService.getQuestions(workspaceId);
  }
}
