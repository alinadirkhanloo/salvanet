export interface IPerson{
	id?:number;
	nationalCode?:string;
	firstName: string;
	lastName: string;
	gender: number;
	identityCardNumber: number;
	birthDate: string;
	birthPlaceId?:string;
	religion: number;
	sect: number;
	militaryStatus: number;
	maritalStatus: number;
	employmentStatus: number;
	numberOfChildren: number;
	studying:boolean;
	levelOfEducation: number;
	address: string;
	identityCardIssuingPlaceId: number;
	nationalityId: number;
	residencePlaceId: number;
	simnumber?:string;
}

// {
// 	"firstName": "string",
// 	"lastName": "string",
// 	"gender": 1,
// 	"identityCardNumber": "56656",
// 	"birthDate": "string",
// 	"religion": 1,
// 	"sect": "5454",
// 	"militaryStatus": 1,
// 	"maritalStatus": 1,
// 	"employmentStatus": 1,
// 	"numberOfChildren": 1,
// 	"isStudying":false,
// 	"levelOfEducation": 1,
// 	"address": "string",
// 	"identityCardIssuingPlaceId": "5454545",
// 	"nationalityId": "545454848",
// 	"residencePlaceId": "54545",
// }
