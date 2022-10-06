import { Test, TestingModule } from '@nestjs/testing';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';

describe('Workspaces Controller', () => {
  let controller: WorkspacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkspacesController],
      providers: [
        {
          provide: WorkspacesService,
          useValue: {
            getAllWorkspaces: jest.fn().mockResolvedValue([
              { name: 'wk1', title: 'Test 1', id: 1 },
              { name: 'wk2', title: 'Test 2', id: 2 },
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<WorkspacesController>(WorkspacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllWorkplaces', () => {
    it('should get an array of cats', async () => {
      await expect(controller.getAllWorkspaces()).resolves.toEqual([
        {
          name: 'wk1',
          title: 'Test 1',
          id: 1,
        },
        {
          name: 'wk2',
          title: 'Test 2',
          id: 2,
        },
      ]);
    });
  });
});
