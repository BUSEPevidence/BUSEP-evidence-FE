import { Project } from "./Project";

export interface ShowWorkOnProjectDTO {
    id: number;
    project: Project;
    startedWorking: Date;
    endedWorking: Date;
    workDescription: string;
    experience: string;
}