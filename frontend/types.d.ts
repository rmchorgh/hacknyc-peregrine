export type Field = {
    apiName: string;
    type: "text" | "linegraph" | "bargraph";
    prompt: string;
}


export type ProfileType = {
    playgroundIds: string[];
}