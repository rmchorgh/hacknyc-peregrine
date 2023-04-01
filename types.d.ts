export enum Period {
	daily = 0,
	weekly = 1,
}

export interface User {
	id: string;
	playgrounds: Playground[];
	period: Period;
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
}
