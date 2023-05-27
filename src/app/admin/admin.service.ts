import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Certificate } from './model/certificate';
import { Observable } from 'rxjs';
import { MakeRootCertDTO } from './model/makeRootCertDTO';
import { downDTO } from './model/downDTO';
import { RegisterUser } from '../auth/login/model/RegisterUser';
import { RolePermissionDTO } from './model/RolePermissionDTO';
import { RolePermDTO } from './model/RolePermDTO';
import { PermissionDTO } from './model/PermissionDTO';
import { EmployeeDTO } from './model/employeeDTO';
import { ProjectDTO } from './model/ProjectDTO';
import { CreateProjectDTO } from './model/CreateProjectDTO';
import { start } from '@popperjs/core';
import { AddWorkerToProjectDTO } from './model/AddWorkerToProjectDTO';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  apiHost: string = "https://localhost:8443/";
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  plainTextHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'text/plain' })

  getAllCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.apiHost + 'admin/get-all-from-store', {headers: this.headers})
  }

  revokeCertificate(alias: string) {
    return this.http.post(this.apiHost + "admin/revoke-certificate", alias, {headers: this.headers, responseType: 'text' as 'text'})
  }
  downloadCertificate(dto: downDTO) {
    return this.http.post(this.apiHost + "admin/download-certificate", dto,{ headers: this.headers} )
  }
  
  checkValidity(alias: string) {
    let params = new HttpParams().set('alias', alias)
    return this.http.get(this.apiHost + "admin/certificate-validity", {params: params, headers: this.headers, responseType: 'text' as 'text'} )
  }

  makeRootCertificate(dto: MakeRootCertDTO) {
    return this.http.post(this.apiHost + "admin/create-root", dto, {headers: this.headers, responseType: 'text' as 'text'})
  }
  approveRequest(dto: RegisterUser) {
    return this.http.post<string>(this.apiHost + "api/auth/approve", dto, {headers: this.headers}).subscribe(res => {
      console.log(res);
      
    })
  }
  denieRequest(dto: RegisterUser) {
    return this.http.post<string>(this.apiHost + "api/auth/denie", dto, {headers: this.headers}).subscribe(res => {
      console.log(res);
      window.location.reload()
      
    })
  }

  deletePermission(dto: RolePermissionDTO) {
    return this.http.post<string>(this.apiHost + "role/deletePermission", dto, {headers: this.headers}).subscribe(res => {
      console.log(res);
      window.location.reload()
      
    })
  }
  addPermission(dto: RolePermissionDTO) {
    return this.http.post<string>(this.apiHost + "role/addPermission", dto, {headers: this.headers}).subscribe(res => {
      console.log(res);
      window.location.reload()
      
    })
  }
  createPermission(dto: PermissionDTO) {
    return this.http.post<string>(this.apiHost + "permission/addPermission", dto, {headers: this.headers}).subscribe(res => {
      
    })
  }

  createProject(dto: CreateProjectDTO) {
    return this.http.post<string>(this.apiHost + "api/project", dto, {headers:this.headers}).subscribe(res => {

    });
  }
    
  getRequests():(RegisterUser[]) {
    var c : string = ""
    const resultList: RegisterUser[] = [];
    this.http.get<RegisterUser[]>(this.apiHost + "admin/get-requests", {headers: this.headers}).subscribe(res => {
    res.forEach(user => {
 
      const newUser: RegisterUser = {
        username: user.username,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
        address: user.address,
        city: user.city,
        state: user.state,
        number: user.number,
        title: user.title,
        adminApprove: user.adminApprove
      };
      resultList.push(newUser);
    });
  });
  
  return resultList
  }

  getAllEmployees(): (EmployeeDTO[]) {
    const resultList: EmployeeDTO[] = [];
    this.http.get<EmployeeDTO[]>(this.apiHost + "api/user/all-workers", {headers: this.headers}).subscribe(res => {
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

  getProjectEmployees(id: number): (EmployeeDTO[]) {
    const resultList: EmployeeDTO[] = [];
    this.http.get<EmployeeDTO[]>(this.apiHost + "api/project/active-workers?projectId=" + id, {headers: this.headers}).subscribe(res => {
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
  
  getAllNonEmployees(id: number): (EmployeeDTO[]) {
    const resultList: EmployeeDTO[] = [];
    this.http.get<EmployeeDTO[]>(this.apiHost + "api/project/non-workers?projectId=" + id, {headers: this.headers}).subscribe(res => {
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

  getAllProjects(): (ProjectDTO[]) {
    const resultList: ProjectDTO[] = [];
    this.http.get<ProjectDTO[]>(this.apiHost + "api/project", {headers: this.headers}).subscribe(res => {
      res.forEach(p => {
        const newProject: ProjectDTO = {
          id: p.id,
          title: p.title,
          description: p.description,
          startTime: p.startTime,
          endTime: p.endTime
        };
        resultList.push(newProject);
      });
    });
    return resultList;
  }

  getSelectedProject(projId: number) : (ProjectDTO) {
    const result: ProjectDTO ={
      title : "",
      description : "",
      endTime : new Date,
      startTime : new Date,
      id : 0
    }
    this.http.get<ProjectDTO>(this.apiHost + "api/project/details?id=" + projId, {headers: this.headers}).subscribe( res => {
      result.title = res.title;
      result.description = res.description;
      result.startTime = res.startTime;
      result.endTime = res.endTime;
      result.id = res.id;
    })
    return result;
  }


  getPerms():(RolePermissionDTO[]) {
    var c : string = ""
    const resultList: RolePermissionDTO[] = [];
    this.http.get<RolePermissionDTO[]>(this.apiHost + "role/getForDelete", {headers: this.headers}).subscribe(res => {
    res.forEach(user => {
 
      const newUser: RolePermissionDTO = {
        role: user.role,
        permission: user.permission
      };
      resultList.push(newUser);
    });
  });
  
  return resultList
  }

  getAllPerms():(RolePermDTO[]) {
    var c : string = ""
    const resultList: RolePermDTO[] = [];
    this.http.get<RolePermDTO[]>(this.apiHost + "permission/getAll", {headers: this.headers}).subscribe(res => {
    res.forEach(user => {
 
      const newUser: RolePermDTO = {
        name: user.name,
      };
      resultList.push(newUser);
    });
  });
  
  return resultList
  }

  getAllRoles():(RolePermDTO[]) {
    var c : string = ""
    const resultList: RolePermDTO[] = [];
    this.http.get<RolePermDTO[]>(this.apiHost + "role/getAll", {headers: this.headers}).subscribe(res => {
    res.forEach(user => {
 
      const newUser: RolePermDTO = {
        name: user.name,
      };
      resultList.push(newUser);
    });
  });
  
  return resultList
  }

  addEmployeeToProject(dto: AddWorkerToProjectDTO) {
    this.http.post<string>(this.apiHost + "api/project/add-worker", dto, {headers: this.headers}).subscribe( res=> {

    })
  }




}
