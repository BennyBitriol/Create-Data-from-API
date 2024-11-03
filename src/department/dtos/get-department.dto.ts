import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class GetDepartmentDto {
  @Optional()
  @ApiProperty({
    required: false,
    example: 0,
  })
  skip: number;
  @Optional()
  @ApiProperty({
    required: false,
    example: 10,
  })
  limit: number;

  @Optional()
  @ApiProperty({
    required: false,
    example: 'HR',
  })
  search?: string;
  @Optional()
  @ApiProperty({
    required: false,
    example: 'asc',
  })
  order?: string;

  @Optional()
  @ApiProperty({
    required: false,
    example: 'name',
  })
  sortBy?: string;
  @Optional()
  @ApiProperty({
    required: false,
    example: 'name',
  })
  filterKey?: string;
  @Optional()
  @ApiProperty({
    required: false,
    example: 'HR',
  })
  filterValue?: string;
}
