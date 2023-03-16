export interface ICultivar {
    id: number;
    code: string // maxLength: 4,minLength: 2
    name: string //maxLength: 32,minLength: 2
    description: string //maxLength: 512,minLength: 0
    hasVariety: boolean
}