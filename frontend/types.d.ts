export type Field = {
    apiName: string;
    type: "text" | "linegraph" | "bargraph";
    prompt: string;
}


export enum Period {
	daily = 0,
	weekly = 1,
}

export interface API {
    name: string;
    key: string;
}

export interface User {
	id: string;
	playgrounds: Playground[];
	period: Period;
    apis: API[];

}
export interface Playground {
	id: string;
	template: Template[];
}

export enum TemplateType {
	rawText = 0,
	generatedText = 1,
	generatedGraph = 2,
}

export interface Template {
	type: TemplateType;
	params?: string[];
	key: string;
    emailSubject?: string;
    emailRecipients?: string[];
    emailDescription?: string;
    playgroundName: string;
    playgroundId: string;
}
