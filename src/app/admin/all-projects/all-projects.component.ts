import { Component, OnInit } from '@angular/core';
import { ProjectDTO } from '../model/ProjectDTO';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {
  projectList: ProjectDTO[] = [];
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.getAllProjects();
  }

  public getAllProjects() {
    this.projectList = this.adminService.getAllProjects();
    console.log(this.projectList)
  }

  public addNewProject() {
    this.router.navigate(["/admin/create-project"])
  }

  viewEmployeesForProject(p : ProjectDTO) {
    this.router.navigate(['/admin/project-employees', p.id])
  }

}
