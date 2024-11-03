import { Controller, Get, Query } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { GetDepartmentSearchDto } from './dtos/get-department-search.dto';
import { GetDepartmentFilterDto } from './dtos/get-department-filter.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @Get('/search')
  async getMasterData(@Query() query: GetDepartmentSearchDto) {
    try {
      return await this.departmentService.getMasterData(query);
    } catch (error) {
      return { error: 'Error while fetching master data' };
    }
  }
  @Get('/filter')
  async getFilteredData(@Query() query: GetDepartmentFilterDto) {
    try {
      return await this.departmentService.getFilteredData(query);
    } catch (error) {
      return { error: 'Error while fetching filtered data' };
    }
  }
}
