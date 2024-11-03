import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { lastValueFrom, from } from 'rxjs';
import { IUser } from './interfaces/user';
import { GetDepartmentDto } from './dtos/get-department.dto';
import { GetDepartmentFilterDto } from './dtos/get-department-filter.dto';
import { GetDepartmentSearchDto } from './dtos/get-department-search.dto';

@Injectable()
export class DepartmentService {
  private async fetchMasterData({
    skip,
    limit,
    search,
    order,
    sortBy,
    filterKey,
    filterValue,
  }: GetDepartmentDto) {
    // Create a params object for the Axios request
    const params: { [key: string]: any } = {
      limit: limit ?? 10, // Default to 10 records
      skip: skip ?? 0, // Default to 0 records
    };

    let url = 'https://dummyjson.com/users';

    console.log('search', search);

    // Include filter key and value if provided
    if (filterKey && filterValue) {
      params.key = filterKey;
      params.value = filterValue;
      url += `/filter`;
    } else {
      // Include search query if provided
      if (search) {
        params.q = search;
        url += `/search`;
      }
    }

    if (order) {
      params.order = order;
    }

    if (sortBy) {
      params.sortBy = sortBy;
    }

    // Make the API call using Axios
    const api = from(
      axios.get(url, {
        params, // Pass the params object directly
      }),
    );

    console.log('url', url, 'params', params);

    const response = await lastValueFrom(api);

    return response.data.users as unknown as IUser[];
  }
  private groupDataByDepartment(users: IUser[]) {
    const departmentSummary = new Map();

    users.forEach((user) => {
      const department = user.company?.department || 'Unknown Department';
      let deptSummary = departmentSummary.get(department);

      // Initialize department summary if it doesn't exist
      if (!deptSummary) {
        deptSummary = {
          male: 0,
          female: 0,
          ageRange: '',
          hair: {},
          addressUser: {},
        };
        departmentSummary.set(department, deptSummary);
      }

      // Gender count
      if (user.gender === 'male') deptSummary.male++;
      else if (user.gender === 'female') deptSummary.female++;

      // Age range calculation
      if (!deptSummary.minAge || user.age < deptSummary.minAge)
        deptSummary.minAge = user.age;
      if (!deptSummary.maxAge || user.age > deptSummary.maxAge)
        deptSummary.maxAge = user.age;

      // Hair color summary
      const hairColor = user.hair?.color;
      if (hairColor) {
        deptSummary.hair[hairColor] = (deptSummary.hair[hairColor] || 0) + 1;
      }

      // Address information
      const fullName = `${user.firstName}${user.lastName}`;
      deptSummary.addressUser[fullName] = user.address?.postalCode || 'N/A';
    });

    // Set age range and finalize data structure
    departmentSummary.forEach((deptSummary) => {
      deptSummary.ageRange = `${deptSummary.minAge || 'N/A'}-${deptSummary.maxAge || 'N/A'}`;
      delete deptSummary.minAge;
      delete deptSummary.maxAge;
    });

    // Convert Map back to object
    return Object.fromEntries(departmentSummary);
  }

  public async getMasterData(query: GetDepartmentSearchDto) {
    const users = await this.fetchMasterData(query);
    return this.groupDataByDepartment(users);
  }

  public async getFilteredData(query: GetDepartmentFilterDto) {
    const users = await this.fetchMasterData(query);
    return this.groupDataByDepartment(users);
  }
}
