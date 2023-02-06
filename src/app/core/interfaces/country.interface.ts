export interface ICountryDivisionType extends ICountryDivision{
	displayName: string;
}

export interface ICountryDivision extends ICountry{
	code: number;
	id: number;
}

export interface ICountry{
	name: string;
}