import { Injectable } from '@angular/core';
import { CertificateEECA } from './model/certificat-ee-ca';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  apiHost: string = "http://localhost:8083/";
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  makeCertificateEE(certificate: CertificateEECA, issuer: string, certName: string) {
    const params = new HttpParams().set('alias', issuer).set('certName', certName);
    return this.http.post(this.apiHost + 'admin/create-end-entity', certificate, { params, responseType: 'text' as 'text' });
  }

  makeCertificateCA(certificate: CertificateEECA, issuer: string, certName: string) {
    const params = new HttpParams().set('alias', issuer).set('certName', certName);
    return this.http.post(this.apiHost + 'admin/create-ca', certificate, { params, responseType: 'text' as 'text' });
  }

  public GetAliases() {
    return this.http.get<string[]>(this.apiHost + 'admin/get-trusted', { headers: this.headers });
  }

}
