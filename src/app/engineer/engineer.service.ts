import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShowWorkOnProjectDTO } from './model/ShowWorkOnProjectDTO';
import { UpdateWorkerTaskDTO } from './model/UpdateWorkerTaskDTO';
import { ShowEngineerDTO } from './model/ShowEngineerDTO';
import { ExperienceDTO } from './model/ExperienceDTO';
import { UpdateEngineerDTO } from './model/UpdateEngineerDTO';
import { NewPasswordDTO } from './model/NewPasswordDTO';

@Injectable({
  providedIn: 'root'
})
export class EngineerService {

  constructor(private http: HttpClient) { }

  apiHost: string = "https://localhost:8443/api";
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  plainTextHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'text/plain' })

  public getAllWorkerProjects(): Observable<ShowWorkOnProjectDTO[]> {
    return this.http.get<ShowWorkOnProjectDTO[]>(this.apiHost + '/project/past-projects', { headers: this.headers })
  }

  public getAllWorkerActiveProjects(): Observable<ShowWorkOnProjectDTO[]> {
    return this.http.get<ShowWorkOnProjectDTO[]>(this.apiHost + '/project/active-projects', { headers: this.headers })
  }

  public updateExperience(dto: UpdateWorkerTaskDTO): Observable<string> {
    return this.http.put<string>(this.apiHost + '/project/experience', dto, { headers: this.headers });
  }

  public updateWork(dto: UpdateWorkerTaskDTO): Observable<string> {
    return this.http.put<string>(this.apiHost + '/project/update-work', dto, { headers: this.headers });
  }

  public getEngineer(): Observable<ShowEngineerDTO> {
    return this.http.get<ShowEngineerDTO>(this.apiHost + '/user/engineer', { headers: this.headers });
  }

  public addExperience(dto: ExperienceDTO): Observable<string> {
    return this.http.put<string>(this.apiHost + '/user/engineer/experience', dto, { headers: this.headers });
  }

  public updateEngineer(dto: UpdateEngineerDTO): Observable<string> {
    return this.http.put<string>(this.apiHost + '/user/engineer', dto, { headers: this.headers });
  }

  public changePasswords(dto: NewPasswordDTO): Observable<string> {
    return this.http.put<string>(this.apiHost + '/user/change-password', dto, { headers: this.headers });
  }

  public uploadCV(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.put<string>(this.apiHost + '/user/engineer/upload', formData);
  }
}
