import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  apiHost: string = "https://localhost:8443/";
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  plainTextHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'text/plain' })
}
