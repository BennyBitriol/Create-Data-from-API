import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentService } from './department.service';
import axios from 'axios';
import { IUser } from './interfaces/user';

jest.mock('axios'); // Mock the axios module

describe('DepartmentService', () => {
  let service: DepartmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartmentService],
    }).compile();

    service = module.get<DepartmentService>(DepartmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetchMasterData', () => {
    it('should fetch master data with provided parameters', async () => {
      // Arrange: Set up the mock response for axios
      const mockResponse = {
        data: {
          users: [
            {
              id: 1,
              firstName: 'John',
              lastName: 'Doe',
              gender: 'male',
              age: 30,
              hair: { color: 'brown' },
              company: { department: 'Engineering' },
              address: { postalCode: '12345' },
            },
            {
              id: 2,
              firstName: 'Jane',
              lastName: 'Doe',
              gender: 'female',
              age: 25,
              hair: { color: 'black' },
              company: { department: 'Engineering' },
              address: { postalCode: '67890' },
            },
          ],
        },
      };
      (axios.get as jest.Mock).mockResolvedValue(mockResponse);

      const query = { skip: 0, limit: 10 };

      // Act: Call the method
      const users = await service['fetchMasterData'](query);

      // Assert: Check that axios was called with the correct parameters
      expect(axios.get).toHaveBeenCalledWith(
        'https://dummyjson.com/users/filter',
        {
          params: {
            limit: 10,
            skip: 0,
            order: 'asc',
            sortBy: 'id',
          },
        },
      );
      expect(users).toEqual(mockResponse.data.users);
    });
  });

  describe('groupDataByDepartment', () => {
    it('should group users by department and calculate statistics', () => {
      const users = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          gender: 'male',
          age: 30,
          hair: { color: 'brown' },
          company: { department: 'Engineering' },
          address: { postalCode: '12345' },
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Doe',
          gender: 'female',
          age: 25,
          hair: { color: 'black' },
          company: { department: 'Engineering' },
          address: { postalCode: '67890' },
        },
        {
          id: 3,
          firstName: 'Mike',
          lastName: 'Smith',
          gender: 'male',
          age: 40,
          hair: { color: 'blonde' },
          company: { department: 'Marketing' },
          address: { postalCode: '54321' },
        },
      ];

      const groupedData = service['groupDataByDepartment'](users as IUser[]);

      expect(groupedData).toEqual({
        Engineering: {
          male: 1,
          female: 1,
          ageRange: '25-30',
          hair: { brown: 1, black: 1 },
          addressUser: {
            JohnDoe: '12345',
            JaneDoe: '67890',
          },
        },
        Marketing: {
          male: 1,
          female: 0,
          ageRange: '40-40',
          hair: { blonde: 1 },
          addressUser: {
            MikeSmith: '54321',
          },
        },
      });
    });
  });
});
