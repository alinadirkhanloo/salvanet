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
  {key:'کشاورز',value:8},
  {key:'مالک واحد تولیدی',value:12},
  {key:'مربی',value:9},
  {key:'دیده بان تولید',value:10},
  {key:'دیده بان امنیت غذایی',value:11}
];
