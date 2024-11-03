import { Controller, Get, Query } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { GetDepartmentDto } from './dtos/get-department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @Get()
  async getMasterData(@Query() query: GetDepartmentDto) {
    try {
      return await this.departmentService.getMasterData(query);
    } catch (error) {
      return { error: 'Error while fetching master data' };
    }
  }
}
