import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspacesService } from './workspaces.service';

@Controller()
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}

  @EventPattern('workspace-created')
  createWorkspace(workspace: CreateWorkspaceDto) {
    return this.workspacesService.createWorkspaces(workspace);
  }
  @MessagePattern({ cmd: 'get-all-workspaces' })
  getAllWorkspaces() {
    return this.workspacesService.getAllWorkspaces();
  }
}
