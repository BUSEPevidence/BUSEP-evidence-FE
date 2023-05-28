import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewPasswordDTO } from '../hr/model/NewPasswordDTO';
import { ShowUserDTO } from '../hr/model/ShowUserDTO';
import { UpdateUserDTO } from '../hr/model/UpdateUserDTO';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  apiHost: string = "https://localhost:8443/api";
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  plainTextHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'text/plain' })

  public getUser(): Observable<ShowUserDTO> {
    return this.http.get<ShowUserDTO>(this.apiHost + '/user/user', { headers: this.headers });
  }

  public updateUser(dto: UpdateUserDTO): Observable<string> {
    return this.http.put<string>(this.apiHost + '/user/user', dto, { headers: this.headers });
  }

  public changePasswords(dto: NewPasswordDTO): Observable<string> {
    return this.http.put<string>(this.apiHost + '/user/change-password', dto, { headers: this.headers });
  }
}
