import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManagersProjectDTO } from './model/managersProjectDTO';
import { EmployeeDTO } from '../admin/model/employeeDTO';
import { ProjectDTO } from '../admin/model/ProjectDTO';
import { AddWorkerToProjectDTO } from '../admin/model/AddWorkerToProjectDTO';
import { RemoveEmployeeDTO } from './model/RemoveEmployeeDTO';
import { EmployeeWithDatesDTO } from './model/EmployeeWithDatesDTO';
import { NewPasswordDTO } from '../hr/model/NewPasswordDTO';
import { ShowUserDTO } from '../hr/model/ShowUserDTO';
import { UpdateUserDTO } from '../hr/model/UpdateUserDTO';
import { UpdateProjectDTO } from './model/UpdateProjectDTO';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  apiHost: string = "https://localhost:8443/api";
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  plainTextHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'text/plain' })

  getAllProjects(): (ManagersProjectDTO[]) {
    const resultList: ManagersProjectDTO[] = [];
    this.http.get<ManagersProjectDTO[]>(this.apiHost + "/project/past-projects", { headers: this.headers }).subscribe(res => {
      res.forEach(p => {
        const newProject: ManagersProjectDTO = {
          id: p.id,
          startedWorking: p.startedWorking,
          endedWorking: p.endedWorking,
          workDescription: p.workDescription,
          experience: p.experience,
          project: p.project
          // title: p.title,
          // description: p.description,
          // startTime: p.startTime,
          // endTime: p.endTime
        };
        resultList.push(newProject);
      });
    });
    return resultList;
  }

  getProjectEmployees(id: number): (EmployeeWithDatesDTO[]) {
    const resultList: EmployeeWithDatesDTO[] = [];
    this.http.get<EmployeeWithDatesDTO[]>(this.apiHost + "/project/workers-with-dates?projectId=" + id, { headers: this.headers }).subscribe(res => {
      res.forEach(e => {
        const newEmployee: EmployeeWithDatesDTO = {
          username: e.username,
          firstname: e.firstname,
          lastname: e.lastname,
          address: e.address,
          city: e.city,
          state: e.state,
          number: e.number,
          roles: e.roles,
          startedWorking: e.startedWorking,
          endedWorking: e.endedWorking
        };
        resultList.push(newEmployee);
      });
    });
    return resultList;
  }

  getSelectedProject(projId: number): (ProjectDTO) {
    const result: ProjectDTO = {
      title: "",
      description: "",
      endTime: new Date,
      startTime: new Date,
      id: 0
    }
    this.http.get<ProjectDTO>(this.apiHost + "/project/details?id=" + projId, { headers: this.headers }).subscribe(res => {
      result.title = res.title;
      result.description = res.description;
      result.startTime = res.startTime;
      result.endTime = res.endTime;
      result.id = res.id;
    })
    return result;
  }

  getAllNonEmployees(id: number): (EmployeeDTO[]) {
    const resultList: EmployeeDTO[] = [];
    this.http.get<EmployeeDTO[]>(this.apiHost + "/project/non-workers?projectId=" + id, { headers: this.headers }).subscribe(res => {
      res.forEach(e => {
        const newEmployee: EmployeeDTO = {
          username: e.username,
          firstname: e.firstname,
          lastname: e.lastname,
          address: e.address,
          city: e.city,
          state: e.state,
          number: e.number,
          roles: e.roles
        };
        resultList.push(newEmployee);
      });
    });
    return resultList;
  }

  addEmployeeToProject(dto: AddWorkerToProjectDTO) {
    this.http.post<string>(this.apiHost + "/project/add-worker", dto, { headers: this.headers }).subscribe(res => {

    })
  }

  removeEmployeeFromProject(dto: RemoveEmployeeDTO) {
    this.http.put<string>(this.apiHost + "/project/remove-worker", dto, { headers: this.headers }).subscribe(res => {

    })
  }


  public getUser(): Observable<ShowUserDTO> {
    return this.http.get<ShowUserDTO>(this.apiHost + '/user/user', { headers: this.headers });
  }

  public updateUser(dto: UpdateUserDTO): Observable<string> {
    return this.http.put<string>(this.apiHost + '/user/user', dto, { headers: this.headers });
  }

  public changePasswords(dto: NewPasswordDTO): Observable<string> {
    return this.http.put<string>(this.apiHost + '/user/change-password', dto, { headers: this.headers });
  }

  public updateProject(updateProjectDTO: UpdateProjectDTO): Observable<string> {
    return this.http.put<string>(this.apiHost + '/project/managed-update', updateProjectDTO, { headers: this.headers });
  }
}
