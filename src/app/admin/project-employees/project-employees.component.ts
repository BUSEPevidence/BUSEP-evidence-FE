import { Component, OnInit } from '@angular/core';
import { EmployeeDTO } from '../model/employeeDTO';
import { AdminService } from '../admin.service';
import { ProjectDTO } from '../model/ProjectDTO';
import { AddWorkerToProjectDTO } from '../model/AddWorkerToProjectDTO';

@Component({
  selector: 'app-project-employees',
  templateUrl: './project-employees.component.html',
  styleUrls: ['./project-employees.component.css']
})
export class ProjectEmployeesComponent implements OnInit {
  employeeList: EmployeeDTO[] = []
  project: ProjectDTO = {
    title: "",
    description: "",
    startTime: new Date(),
    endTime: new Date(),
    id: 0
  };
  selectedEmployee!: EmployeeDTO;
  nonEmployeeList: EmployeeDTO[] = [];

  constructor(private adminService: AdminService) { }



  ngOnInit() {
    const url = window.location.href;
    const id = this.extractIdFromUrl(url);
    console.log("ID IS::::: "+id)
    this.getAllEmployees(parseInt(id));
    this.getProject(parseInt(id));
    this.getAllNonEmployees(parseInt(id))
  }

  public getProject(id: number) {
    this.project = this.adminService.getSelectedProject(id);
  }

  public getAllEmployees(id: number) {
    this.employeeList = this.adminService.getProjectEmployees(id);
  }

  public getAllNonEmployees(id: number) {
    this.nonEmployeeList = this.adminService.getAllNonEmployees(id);
  }
  
  public extractIdFromUrl(url: string) {
    const segments = url.split('/');
    return segments[segments.length - 1];
  }

  public addEmployeeToProject() {
    const dto: AddWorkerToProjectDTO = {
      projectId: this.project.id,
      username: this.selectedEmployee.username,
      description: ""
    }
    this.adminService.addEmployeeToProject(dto);
  }

}
