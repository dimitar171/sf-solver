import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiGatewayService } from './api-gateway.service';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateWorkspaceDto } from './dtos/create-workspace.dto';
@Controller()
export class ApiGatewayController {
  constructor(private readonly appService: ApiGatewayService) {}

  @Post('/signup')
  async signUp(@Body() user: CreateUserDto) {
    return this.appService.signUp(user);
  }
  @Post('/signin')
  async signIn(@Body() user: CreateUserDto) {
    return this.appService.signIn(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/workspaces')
  async createWorkspaces(
    @Req() request,
    @Body() createWorkspace: CreateWorkspaceDto,
  ) {
    return this.appService.createWorkspaces(request.user, createWorkspace);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/workspaces')
  async getWorkspaces(@Req() request) {
    return this.appService.getWorkspaces(request.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/workspaces/:workspaceId/questions')
  async createQuestions(
    @Req() request,
    @Body() createWorkspace: CreateQuestionDto,
    @Param('workspaceId', ParseIntPipe) workspaceId: number,
  ) {
    return this.appService.createQuestions(
      createWorkspace,
      workspaceId,
      request.user,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/workspaces/:workspaceId/questions')
  async getQuestions(
    @Req() request,
    @Param('workspaceId', ParseIntPipe) workspaceId: number,
  ) {
    return this.appService.getQuestions(workspaceId, request.user);
  }
}
