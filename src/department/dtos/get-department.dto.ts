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
    example: 'John',
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
    example: 'firstName',
  })
  sortBy?: string;
  @Optional()
  @ApiProperty({
    required: false,
    example: 'hair.color',
  })
  filterKey?: string;
  @Optional()
  @ApiProperty({
    required: false,
    example: 'Red',
  })
  filterValue?: string;
}
