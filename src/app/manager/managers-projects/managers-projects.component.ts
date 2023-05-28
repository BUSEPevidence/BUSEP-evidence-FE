import { Component, OnInit } from '@angular/core';
import { ProjectDTO } from 'src/app/admin/model/ProjectDTO';
import { ManagerService } from '../manager.service';
import { ManagersProjectDTO } from '../model/managersProjectDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managers-projects',
  templateUrl: './managers-projects.component.html',
  styleUrls: ['./managers-projects.component.css']
})
export class ManagersProjectsComponent implements OnInit {
  
  projectList: ManagersProjectDTO[] = [];
  
  constructor(private managerService: ManagerService, private router: Router) { }

  ngOnInit() {
    this.getManagersProjects();
  }

  viewEmployeesForProject(p: number) {
    this.router.navigate(['/manager/project-employees', p])
  }

  addNewProject(){
    //todo
  }

  getManagersProjects() {
    this.projectList = this.managerService.getAllProjects();
  }

}
