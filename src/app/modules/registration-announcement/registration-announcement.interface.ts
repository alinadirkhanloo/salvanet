import { IDropdown } from "app/core/interfaces/dropdown/dropdonw.interface";

export interface IRegistrationAnnouncement {
  id?: number;
  title: string;
  startDate: string;
  endDate: string;
  code: string;
  description: string;
  isActive: boolean;
  rolesId: boolean;
}

export const Roles: IDropdown[] = [
  {key:'کشاورز',value:1},
  {key:'مالک واحد تولیدی',value:2},
  {key:'مربی',value:3},
  {key:'دیده بان تولید',value:4},
  {key:'دیده بان امنیت غذایی',value:5}
];
