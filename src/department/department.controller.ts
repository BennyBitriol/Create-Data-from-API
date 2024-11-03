import { Controller, Get, Query } from '@nestjs/common';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @Get()
  async getMasterData(
    @Query('skip') skip: number,
    @Query('limit') limit: number,
    @Query('search') search?: string,
    @Query('order') order?: string,
    @Query('sortBy') sortBy?: string,
    @Query('filterKey') filterKey?: string,
    @Query('filterValue') filterValue?: string,
  ) {
    try {
      return await this.departmentService.getMasterData({
        skip,
        limit,
        search,
        order,
        sortBy,
        filterKey,
        filterValue,
      });
    } catch (error) {
      return { error: 'Error while fetching master data' };
    }
  }
}
