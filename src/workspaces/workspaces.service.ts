import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Workspace } from './workspace.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace) private repo: Repository<Workspace>,
  ) {}

  async createWorkspace(workspaceDto: CreateWorkspaceDto, user: User) {
    const { title, description } = workspaceDto;
    const workspace = new Workspace();
    workspace.title = title;
    workspace.description = description;
    workspace.user = user;
    const exists = await this.repo.findOneBy({ title });
    if (exists) {
      throw new ConflictException('Workspace title already exists');
    }
    try {
      await this.repo.save(workspace);
    } catch (error) {
      throw new InternalServerErrorException();
    }
    delete workspace.user;
    return workspace;
  }

  async getWorkspaceById(id: number, user: User) {
    const found = await this.repo.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException(`Workspace with ID "${id}" not found`);
    }
    return found;
  }

  async getAllWorkspaces() {
    const workspace = this.repo.find();
    return workspace;
  }

  async getUserWorkspaces(user: User) {
    const query = this.repo.createQueryBuilder('workspace');
    query.where('workspace.userId = :userId', { userId: user.id });
    const workspace = await query.getMany();
    return workspace;
  }

  async joinWorkspace(user: User) {
    const workspace = new Workspace();
    return workspace;
  }
}
