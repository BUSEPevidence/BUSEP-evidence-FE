import { Component, OnInit } from '@angular/core';
import { AddWorkerToProjectDTO } from 'src/app/admin/model/AddWorkerToProjectDTO';
import { ProjectDTO } from 'src/app/admin/model/ProjectDTO';
import { EmployeeDTO } from 'src/app/admin/model/employeeDTO';
import { ManagerService } from '../manager.service';
import { RemoveEmployeeDTO } from '../model/RemoveEmployeeDTO';
import { EmployeeWithDatesDTO } from '../model/EmployeeWithDatesDTO';

@Component({
  selector: 'app-manager-project-employees',
  templateUrl: './manager-project-employees.component.html',
  styleUrls: ['./manager-project-employees.component.css']
})
export class ManagerProjectEmployeesComponent implements OnInit {
  
  employeeList: EmployeeWithDatesDTO[] = []
  project: ProjectDTO = {
    title: "",
    description: "",
    startTime: new Date(),
    endTime: new Date(),
    id: 0
  };
  selectedEmployee!: EmployeeDTO;
  nonEmployeeList: EmployeeDTO[] = [];
  description: string = '';

  constructor(private managerService: ManagerService) { }

  ngOnInit() {
    const url = window.location.href;
    const id = this.extractIdFromUrl(url);
    this.getAllEmployees(parseInt(id));
    this.getProject(parseInt(id));
    this.getAllNonEmployees(parseInt(id));
  }

  public getProject(id: number) {
    this.project = this.managerService.getSelectedProject(id);
    console.log(this.project.title)
  }

  public getAllEmployees(id: number) {
    this.employeeList = this.managerService.getProjectEmployees(id);
  }

  public getAllNonEmployees(id: number) {
    this.nonEmployeeList = this.managerService.getAllNonEmployees(id);
  }
  
  public extractIdFromUrl(url: string) {
    const segments = url.split('/');
    return segments[segments.length - 1];
  }

  public addEmployeeToProject() {
    const dto: AddWorkerToProjectDTO = {
      projectId: this.project.id,
      username: this.selectedEmployee.username,
      description: this.description
    }
    this.managerService.addEmployeeToProject(dto);
    window.location.reload()
  }

  setDescription(d: string) {
    this.description = d;
  }

  removeEmployeeFromProject(employee: EmployeeDTO){
    const dto: RemoveEmployeeDTO = {
      projectId: this.project.id,
      username: employee.username
    }

    this.managerService.removeEmployeeFromProject(dto);
    window.location.reload();
  }

}
