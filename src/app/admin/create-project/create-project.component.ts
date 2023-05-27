import { Component, OnInit } from '@angular/core';
import { CreateProjectDTO } from '../model/CreateProjectDTO';
import { ProjectDTO } from '../model/ProjectDTO';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {

  constructor(private adminService : AdminService) { }

  public project: CreateProjectDTO = {
    title: '',
    description: '',
    startTime: new Date,
    endTime: new Date
  }

  public getValues() {
    const titleInput = document.getElementById('title') as HTMLInputElement;
    const descriptionInput = document.getElementById('description') as HTMLInputElement;
    const startTimeInput = document.getElementById('start-time') as HTMLInputElement;
    const endTimeInput = document.getElementById('end-time') as HTMLInputElement;
    
    this.project.title = titleInput.value;
    this.project.description = descriptionInput.value;
    this.project.startTime = new Date(startTimeInput.value);
    this.project.endTime = new Date(endTimeInput.value);
    
  }

 

  public addProject() {
    this.getValues()
    console.log("Start time: " + this.project.startTime)
    console.log("End time: " + this.project.endTime)
    const newProj: CreateProjectDTO = {
      title: this.project.title,
      description: this.project.description,
      startTime: this.project.startTime,
      endTime: this.project.endTime
    };
    this.adminService.createProject(newProj);
  }
}
