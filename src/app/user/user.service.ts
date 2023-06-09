import { Injectable } from '@angular/core';
import { CertificateEECA } from './model/certificat-ee-ca';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certificate } from '../admin/model/certificate';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  apiHost: string = "https://localhost:8443/";
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  makeCertificateEE(certificate: CertificateEECA, issuer: string, certName: string) {
    const params = new HttpParams().set('alias', issuer).set('certName', certName);
    return this.http.post(this.apiHost + 'admin/create-end-entity', certificate, { params, responseType: 'text' as 'text' });
  }
  getAllChildren(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.apiHost + 'admin/get-all-childs', {headers: this.headers})
  }

  makeCertificateCA(certificate: CertificateEECA, issuer: string, certName: string) {
    const params = new HttpParams().set('alias', issuer).set('certName', certName);
    return this.http.post(this.apiHost + 'admin/create-ca', certificate, { params, responseType: 'text' as 'text' });
  }

  public GetAliases() {
    return this.http.get<string[]>(this.apiHost + 'admin/get-trusted', { headers: this.headers });
  }

}
