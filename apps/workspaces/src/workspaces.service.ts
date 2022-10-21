import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { Workspace } from './workspace.entity';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace) private workspaceRepo: Repository<Workspace>,
  ) {}

  async createWorkspaces(workspace: CreateWorkspaceDto) {
    const newWorkspace = await this.workspaceRepo.create(workspace);

    const exists = await this.workspaceRepo.findOneBy(workspace);
    if (exists) {
      throw new ConflictException('Workspace title already exists');
    }
    try {
      await this.workspaceRepo.save(newWorkspace);
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return newWorkspace;
  }

  async getAllWorkspaces() {
    return this.workspaceRepo.find();
  }
}
