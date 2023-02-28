export interface ICountryDivisionType extends ICountryDivision{
	displayName: string;
}

export interface ICountryDivision extends ICountry{
	code: string;
	id: number;
	typeId:number;
	superDivisionLabel:string;
	superDivisionId:number;
	fullAddress:string
}

export interface ICountry{
	name: string;
}