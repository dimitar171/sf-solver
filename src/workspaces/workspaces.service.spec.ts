import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Workspace } from './workspace.entity';
import { WorkspacesService } from './workspaces.service';

const mockWorkspace = {
  username: 'Dimitar',
  id: 'someId',
  password: 'somePassword',
};

describe('WorkspacesService', () => {
  let service: WorkspacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkspacesService,
        {
          provide: getRepositoryToken(Workspace),
          useValue: {
            find: jest.fn().mockResolvedValue(mockWorkspace),
          },
        },
      ],
    }).compile();

    service = module.get<WorkspacesService>(WorkspacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAllWorkspaces', () => {
    it('should return all workspaces', async () => {
      const workspaces = await service.getAllWorkspaces();
      console.log(workspaces);
      expect(workspaces).toEqual(mockWorkspace);
    });
  });
});
