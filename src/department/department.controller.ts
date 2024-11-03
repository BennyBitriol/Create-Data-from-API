import { Controller, Get, Query } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @Get()
  @ApiQuery({
    name: 'skip',
    required: false,
    example: 0,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    example: 'John',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    example: 'asc',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    example: 'firstName',
  })
  @ApiQuery({
    name: 'filterKey',
    required: false,
    example: 'hair.color',
  })
  @ApiQuery({
    name: 'filterValue',
    required: false,
    example: 'brown',
  })
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
