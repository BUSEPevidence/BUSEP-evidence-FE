import { Component, OnInit } from '@angular/core';
import { ShowWorkOnProjectDTO } from '../model/ShowWorkOnProjectDTO';
import { EngineerService } from '../engineer.service';
import { UpdateWorkerTaskDTO } from '../model/UpdateWorkerTaskDTO';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  allProjects: ShowWorkOnProjectDTO[] = [];
  activeProjects: ShowWorkOnProjectDTO[] = [];
  displayedProjects: ShowWorkOnProjectDTO[] = [];
  selectedProject: ShowWorkOnProjectDTO | null = null;
  showActiveProjects: boolean = false;
  editWorkDescription: boolean = false;
  editExperience: boolean = false;
  projectsModified: boolean = false;

  constructor(private engineerService: EngineerService) { }

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects() {
    this.engineerService.getAllWorkerProjects().subscribe(
      (projects: ShowWorkOnProjectDTO[]) => {
        this.allProjects = projects;
        this.displayedProjects = this.allProjects;
      },
      error => {
        console.error('Failed to retrieve projects:', error);
      }
    );
    this.engineerService.getAllWorkerActiveProjects().subscribe(
      (projects: ShowWorkOnProjectDTO[]) => {
        this.activeProjects = projects;
      },
      error => {
        console.error('Failed to retrieve projects:', error);
      }
    );
  }

  toggleActiveProjects() {
    this.showActiveProjects = !this.showActiveProjects;
    this.displayedProjects = this.showActiveProjects ? this.activeProjects : this.allProjects;
  }

  formatDate(date: Date): string {
    const formattedDate = new Date(date).toLocaleDateString('en-US');
    return formattedDate;
  }

  showProjectDetails(dto: ShowWorkOnProjectDTO) {
    this.selectedProject = dto;
  }

  updateWorkDescription() {
    if (this.selectedProject) {
      const updatedData: UpdateWorkerTaskDTO = {
        projectId: this.selectedProject.project.id,
        task: this.selectedProject.workDescription
      };

      this.engineerService.updateWork(updatedData)
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.error('Error updating work description:', error);
          }
        );
      this.projectsModified = true;
    }
  }

  updateExperience() {
    if (this.selectedProject) {
      const updatedData: UpdateWorkerTaskDTO = {
        projectId: this.selectedProject.project.id,
        task: this.selectedProject.experience
      };

      this.engineerService.updateExperience(updatedData)
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.error('Error updating experience:', error);
          }
        );
      this.projectsModified = true;
    }
  }

  toggleEditWorkDescription() {
    this.editWorkDescription = !this.editWorkDescription;
  }

  toggleEditExperience() {
    this.editExperience = !this.editExperience;
  }

  closeModal() {
    this.selectedProject = null;
    if (this.projectsModified) {
      this.getAllProjects();
      this.projectsModified = false;
    }
  }
}
