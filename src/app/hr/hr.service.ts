import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewPasswordDTO } from './model/NewPasswordDTO';
import { UpdateUserDTO } from './model/UpdateUserDTO';
import { ShowUserDTO } from './model/ShowUserDTO';
import { ShowEngineerDTO } from '../engineer/model/ShowEngineerDTO';
import { ShowWorkOnProjectDTO } from '../engineer/model/ShowWorkOnProjectDTO';

@Injectable({
  providedIn: 'root'
})
export class HrService {

  constructor(private http: HttpClient) { }

  apiHost: string = "https://localhost:8443/api";
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  plainTextHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'text/plain' });

  public getUser(): Observable<ShowUserDTO> {
    return this.http.get<ShowUserDTO>(this.apiHost + '/user/user', { headers: this.headers });
  }

  public updateUser(dto: UpdateUserDTO): Observable<string> {
    return this.http.put<string>(this.apiHost + '/user/user', dto, { headers: this.headers });
  }

  public changePasswords(dto: NewPasswordDTO): Observable<string> {
    return this.http.put<string>(this.apiHost + '/user/change-password', dto, { headers: this.headers });
  }

  public getUsers(): Observable<ShowUserDTO[]> {
    return this.http.get<ShowUserDTO[]>(this.apiHost + '/user/all-workers', { headers: this.headers });
  }

  public getEngineer(username: string): Observable<ShowEngineerDTO> {
    const params = new HttpParams().set('username', username);
    return this.http.get<ShowEngineerDTO>(this.apiHost + '/user/engineer-info', { headers: this.headers, params: params });
  }

  getProjects(username: string): Observable<ShowWorkOnProjectDTO[]> {
    const params = new HttpParams().set('username', username);
    return this.http.get<ShowWorkOnProjectDTO[]>(this.apiHost + '/project/workers/projects', { headers: this.headers, params: params });
  }

  downloadPdf(): void {
    this.http.get(this.apiHost + '/user/pdf', {
      responseType: 'blob',
      headers: new HttpHeaders({ 'Cache-Control': 'no-cache' }) // Add cache control header
    }).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';

      // Set the "download" attribute to force download instead of opening in the browser
      link.download = 'Cv.pdf';

      // Programmatically click the link to trigger the download
      link.dispatchEvent(new MouseEvent('click'));

      // Cleanup: Revoke the URL object after the download
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);
    });
  }
}
