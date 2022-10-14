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
  UseInterceptors,
  CacheTTL,
  CacheInterceptor,
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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('workspaces')
@ApiTags('workspaces')
@ApiBearerAuth('JWT-auth')
@ApiUnauthorizedResponse({ description: 'Invalid credentials' })
@UseGuards(AuthGuard('jwt'))
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Create workspace' })
  @ApiResponse({ status: 409, description: 'Duplicated workspace title' })
  @UsePipes(ValidationPipe)
  createWorkspace(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
    @GetUser() user: User,
  ): Promise<Workspace> {
    return this.workspacesService.createWorkspace(createWorkspaceDto, user);
  }

  @Get('/all')
  @ApiOkResponse({ description: 'Get all workspaces' })
  @UseInterceptors(CacheInterceptor)
  getAllWorkspaces(): Promise<Workspace[]> {
    return this.workspacesService.getAllWorkspaces();
  }

  @Get()
  @ApiOkResponse({ description: 'Get all User Workspaces' })
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  getUserWorkspaces(@GetUser() user: User): Promise<Workspace[]> {
    return this.workspacesService.getUserWorkspaces(user);
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get workspace by Id' })
  @ApiNotFoundResponse({ description: 'Workspace not found' })
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  getWorkspaceById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Workspace> {
    return this.workspacesService.getWorkspaceById(id, user);
  }

  @Post('/:id/join')
  @ApiOkResponse({ description: 'Register to a workspace' })
  joinWorkspace(@GetUser() user: User): Promise<Workspace> {
    return this.workspacesService.joinWorkspace(user);
  }
}
