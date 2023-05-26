export class ExperienceDTO {
    title: string = '';
    grade: number = 0;


    static createEmpty(): ExperienceDTO {
        return new ExperienceDTO();
    }
}