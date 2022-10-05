import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { Workspace } from './workspace.entity';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspacesService } from './workspaces.service';

@Controller('workspaces')
@UseGuards(AuthGuard())
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}

  @Get('/all')
  getAllWorkspaces(): Promise<Workspace[]> {
    return this.workspacesService.getAllWorkspaces();
  }

  @Get()
  getUserWorkspaces(@GetUser() user: User): Promise<Workspace[]> {
    return this.workspacesService.getUserWorkspaces(user);
  }

  @Get('/:id')
  getWorkspaceById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Workspace> {
    return this.workspacesService.getWorkspaceById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createWorkspace(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
    @GetUser() user: User,
  ): Promise<Workspace> {
    return this.workspacesService.createWorkspace(createWorkspaceDto, user);
  }

  @Post('/:id/join')
  joinWorkspace(@GetUser() user: User): Promise<Workspace> {
    return this.workspacesService.joinWorkspace(user);
  }
}
