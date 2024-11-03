import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';

describe('DepartmentController', () => {
  let controller: DepartmentController;
  let service: DepartmentService;

  const mockDepartmentService = {
    getMasterData: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentController],
      providers: [
        {
          provide: DepartmentService,
          useValue: mockDepartmentService,
        },
      ],
    }).compile();

    controller = module.get<DepartmentController>(DepartmentController);
    service = module.get<DepartmentService>(DepartmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMasterData', () => {
    it('should return master data successfully', async () => {
      const mockData = [
        { id: 1, name: 'HR' },
        { id: 2, name: 'IT' },
      ];
      mockDepartmentService.getMasterData.mockResolvedValue(mockData);

      const result = await controller.getMasterData(0, 10, 'HR', 'asc', 'name');
      expect(result).toEqual(mockData);
      expect(service.getMasterData).toHaveBeenCalledWith({
        skip: 0,
        limit: 10,
        search: 'HR',
        order: 'asc',
        sortBy: 'name',
        filterKey: undefined,
        filterValue: undefined,
      });
    });

    it('should handle errors and return an error message', async () => {
      mockDepartmentService.getMasterData.mockRejectedValue(
        new Error('Service Error'),
      );

      const result = await controller.getMasterData(0, 10);
      expect(result).toEqual({ error: 'Error while fetching master data' });
      expect(service.getMasterData).toHaveBeenCalledWith({
        skip: 0,
        limit: 10,
        search: undefined,
        order: undefined,
        sortBy: undefined,
        filterKey: undefined,
        filterValue: undefined,
      });
    });
  });
});
