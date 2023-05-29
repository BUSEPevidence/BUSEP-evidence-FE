import { Component, OnInit } from '@angular/core';
import { ProjectDTO } from 'src/app/admin/model/ProjectDTO';
import { ManagerService } from '../manager.service';
import { ManagersProjectDTO } from '../model/managersProjectDTO';
import { Router } from '@angular/router';
import { UpdateProjectDTO } from '../model/UpdateProjectDTO';

@Component({
  selector: 'app-managers-projects',
  templateUrl: './managers-projects.component.html',
  styleUrls: ['./managers-projects.component.css']
})
export class ManagersProjectsComponent implements OnInit {

  projectList: ManagersProjectDTO[] = [];
  selectedProject: ManagersProjectDTO | null = null;

  projectModalVisible: boolean = false;


  constructor(private managerService: ManagerService, private router: Router) { }

  ngOnInit() {
    this.getManagersProjects();
  }

  viewEmployeesForProject(p: number) {
    this.router.navigate(['/manager/project-employees', p])
  }

  getManagersProjects() {
    this.projectList = this.managerService.getAllProjects();
  }

  formatDate(date: Date): string {
    const formattedDate = new Date(date).toLocaleDateString('en-US');
    return formattedDate;
  }

  saveChanges() {
    if (this.selectedProject) {
      const updateProjectDTO: UpdateProjectDTO = {
        projectId: this.selectedProject.project.id,
        title: this.selectedProject.project.title,
        description: this.selectedProject.project.description,
        startTime: this.selectedProject.project.startTime,
        endTime: this.selectedProject.project.endTime
      };
      this.managerService.updateProject(updateProjectDTO).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.error('Error project description:', error);
        }
      );
    }
    this.closeProjectModal();
    window.location.reload();
  }

  openProjectModal(p: ManagersProjectDTO): void {
    this.selectedProject = p;
    this.projectModalVisible = true;
  }

  closeProjectModal(): void {
    this.projectModalVisible = false;
    this.getManagersProjects();
  }

  formatDateModal(date: Date): string {
    const formattedDate = date.toISOString().slice(0, 16);
    return formattedDate;
  }

}
