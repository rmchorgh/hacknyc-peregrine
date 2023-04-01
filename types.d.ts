export enum Period {
    daily = 0,
    weekly = 1
}

export interface User {
    id: string
    template: Template[]
    period: Period
}

export interface Template {

}
