import { IRole } from "../interfaces/role.interface";

export const RoleList: IRole[] = [
    { name: 'TOTALADMIN', code: 1, displayName: "مدیر سامانه" },
    { name: 'REGIONADMIN', code: 2, displayName: "مدیر منطقه" },
    { name: 'PROVINCEADMIN', code: 3, displayName: "مدیر استان" },
    { name: 'COUNTYADMIN', code: 4, displayName: "مدیر شهرستان" },
    { name: 'CITYADMIN', code: 5, displayName: "مدیر شهر یا دهستان" },
    { name: 'VILLAGEADMIN', code: 6, displayName: "رئیس هسته علمی روستا" },
    { name: 'VILLAGESECRETARY', code: 7, displayName: "دبیر هسته علمی روستا" },
    { name: 'FARMER', code: 8, displayName: "کشاورز" },
    { name: 'COACH', code: 9, displayName: "مربی" },
    { name: 'FOODSECURITYSCOUT', code: 10, displayName: "دیده بان امنیت غذایی" },
    { name: 'PRODUCTIONSCOUT', code: 11, displayName: "دیده بان تولید" },
    { name: 'LANDOWNER', code: 12, displayName: "مالک زمین" },
]

// ['TOTALADMIN','REGIONADMIN','PROVINCEADMIN','COUNTYADMIN','CITYADMIN','VILLAGEADMIN','VILLAGESECRETARY','FARMER','COACH',
// 'PRODUCTIONSCOUT','FOODSECURITYSCOUT','LANDOWNER']
