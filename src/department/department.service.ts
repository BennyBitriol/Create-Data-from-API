import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { lastValueFrom, from } from 'rxjs';
import { IUser } from './interfaces/user';

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
  }: MasterDataQuery) {
    // Create a params object for the Axios request
    const params: { [key: string]: any } = {
      limit,
      skip,
      order: order ?? 'asc', // Default to ascending order
      sortBy: sortBy ?? 'id', // Default to sorting by id
    };

    // Include filter key and value if provided
    if (filterKey && filterValue) {
      params.key = filterKey;
      params.value = filterValue;
    }

    // Include search query if provided
    if (search) {
      params.search = search;
    }

    // Make the API call using Axios
    const api = from(
      axios.get('https://dummyjson.com/users/filter', {
        params, // Pass the params object directly
      }),
    );

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

  public async getMasterData(query: MasterDataQuery) {
    const users = await this.fetchMasterData(query);
    return this.groupDataByDepartment(users);
  }
}

export interface MasterDataQuery {
  skip: number;
  limit: number;
  search?: string;
  order?: string;
  sortBy?: string;
  filterKey?: string;
  filterValue?: string;
}
