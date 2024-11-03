import { IAddress, IHair } from './user';

export interface IDepartment {
  male: number;
  female: number;
  ageRange: string;
  hair: IHair;
  addressUser: IAddress;
}
