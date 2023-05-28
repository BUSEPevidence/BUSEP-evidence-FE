export interface EmployeeWithDatesDTO {
    username: string;
    firstname: string;
    lastname: string;
    address: string;
    city: string;
    state: string;
    number: string;
    roles: string[];
    startedWorking: Date;
    endedWorking: Date;
}
