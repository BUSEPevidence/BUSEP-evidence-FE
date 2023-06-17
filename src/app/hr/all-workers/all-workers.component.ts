import { Component, OnInit } from '@angular/core';
import { ShowUserDTO } from '../model/ShowUserDTO';
import { ShowEngineerDTO } from 'src/app/engineer/model/ShowEngineerDTO';
import { HrService } from '../hr.service';
import { ShowWorkOnProjectDTO } from 'src/app/engineer/model/ShowWorkOnProjectDTO';
import * as PDFJS from 'pdfjs-dist';

@Component({
  selector: 'app-all-workers',
  templateUrl: './all-workers.component.html',
  styleUrls: ['./all-workers.component.css']
})
export class AllWorkersComponent implements OnInit {
  users: ShowUserDTO[] = []
  chosenUser: ShowUserDTO | null = null;
  engineerModalVisible: boolean = false;
  projectsModalVisible: boolean = false;
  userModalVisible: boolean = false;
  showEngineer: ShowEngineerDTO | null = null;
  projects: ShowWorkOnProjectDTO[] | null = null;
  cvModalVisible = false;
  cvUrl: string = "";

  constructor(private service: HrService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.service.getUsers().subscribe(
      response => {
        this.users = response;
        console.error('Error getting users:');
      },
      error => {
        console.error('Error getting users:', error);
      }
    );
  }

  showUserDetails(user: ShowUserDTO): void {
    this.chosenUser = user;
    if (this.chosenUser)
      if (user.roles.includes("ROLE_ENGINEER")) {
        this.service.getEngineer(this.chosenUser?.username).subscribe(
          response => {
            this.showEngineer = response;
            this.openEngineerModal();
          },
          error => {
            console.error('Error getting users:', error);
          }
        );
      } else {
        this.openUserModal()
      }
  }

  openEngineerModal(): void {
    this.engineerModalVisible = true;
  }

  closeEngineerModal(): void {
    this.engineerModalVisible = false;
  }

  openProjectsModal(): void {
    if (this.chosenUser) {
      this.service.getProjects(this.chosenUser.username).subscribe(
        response => {
          this.projects = response;
        },
        error => {
          console.error('Error getting projects:', error);
        }
      );
      this.projectsModalVisible = true;
    }
  }

  closeProjectsModal(): void {
    this.projectsModalVisible = false;
  }

  openUserModal(): void {
    this.userModalVisible = true;
  }

  closeUserModal(): void {
    this.userModalVisible = false;
  }

  openCV() {
    this.service.downloadPdf();
  }

  formatDate(date: Date): string {
    const formattedDate = new Date(date).toLocaleDateString('en-US');
    return formattedDate;
  }
}
