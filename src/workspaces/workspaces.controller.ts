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
import { GetUser } from '../auth/get-user.decorator';
import { Workspace } from './workspace.entity';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspacesService } from './workspaces.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('workspaces')
@ApiTags('workspaces')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('jwt'))
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}

  @Get('/all')
  @ApiOkResponse({ description: 'Get all workspaces' })
  getAllWorkspaces(): Promise<Workspace[]> {
    return this.workspacesService.getAllWorkspaces();
  }

  @Get()
  @ApiOkResponse({ description: 'Get all User Workspaces' })
  getUserWorkspaces(@GetUser() user: User): Promise<Workspace[]> {
    return this.workspacesService.getUserWorkspaces(user);
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get workspace by Id' })
  getWorkspaceById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Workspace> {
    return this.workspacesService.getWorkspaceById(id, user);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Create workspace' })
  @UsePipes(ValidationPipe)
  createWorkspace(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
    @GetUser() user: User,
  ): Promise<Workspace> {
    return this.workspacesService.createWorkspace(createWorkspaceDto, user);
  }

  @Post('/:id/join')
  @ApiCreatedResponse({ description: 'Eegister to a workspace' })
  joinWorkspace(@GetUser() user: User): Promise<Workspace> {
    return this.workspacesService.joinWorkspace(user);
  }
}
