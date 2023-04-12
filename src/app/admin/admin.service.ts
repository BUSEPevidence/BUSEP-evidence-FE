import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Certificate } from './model/certificate';
import { Observable } from 'rxjs';
import { MakeRootCertDTO } from './model/makeRootCertDTO';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  apiHost: string = "http://localhost:8083/";
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  plainTextHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'text/plain' })

  getAllCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.apiHost + 'admin/get-all-from-store', {headers: this.headers})
  }

  revokeCertificate(alias: string) {
    return this.http.post(this.apiHost + "admin/revoke-certificate", alias, {headers: this.headers, responseType: 'text' as 'text'})
  }
  
  checkValidity(alias: string) {
    let params = new HttpParams().set('alias', alias)
    return this.http.get(this.apiHost + "admin/certificate-validity", {params: params, headers: this.headers, responseType: 'text' as 'text'} )
  }

  makeRootCertificate(dto: MakeRootCertDTO) {
    return this.http.post(this.apiHost + "admin/create-root", dto, {headers: this.headers, responseType: 'text' as 'text'})
  }

}
