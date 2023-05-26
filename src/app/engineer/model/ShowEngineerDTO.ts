import { ShowEngineerDetailsDTO } from "./ShowEngineerDetailsDTO";
import { ShowExperienceDTO } from "./ShowExperienceDTO";
import { ShowUserDTO } from "./ShowUserDTO";

export interface ShowEngineerDTO {
    user: ShowUserDTO;
    experiences: ShowExperienceDTO[];
    details: ShowEngineerDetailsDTO;
}