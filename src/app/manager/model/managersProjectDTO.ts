import { ProjectDTO } from "src/app/admin/model/ProjectDTO";

export interface ManagersProjectDTO {
    id: number;
    startedWorking: Date;
    endedWorking: Date;
    workDescription: string;
    experience: string;
    project: ProjectDTO
}
