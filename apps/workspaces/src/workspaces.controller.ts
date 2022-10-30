import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspacesService } from './workspaces.service';

@Controller()
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}

  @EventPattern('workspace-created')
  createWorkspace(data: CreateWorkspaceDto) {
    // console.log(workspace);
    console.log(data);
    return this.workspacesService.createWorkspaces(data);
  }
  @MessagePattern({ cmd: 'get-all-workspaces' })
  getAllWorkspaces(data: string) {
    return this.workspacesService.getAllWorkspaces(data);
  }
}
