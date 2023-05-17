import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RegisterUser } from './login/model/RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  apiHost: string = "http://localhost:8083/";
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

executed = false;
  linkEntered(){
    const enteredURL = window.location.href;
    let param = enteredURL.split('=')[1]
    if(enteredURL.split('=')[1] == undefined)
    {
        param = "regular"
    }
    console.log(this.apiHost + 'api/auth/visitLink?request=' + param);
    return this.http.get(this.apiHost + 'api/auth/visitLink?request=' + param,{headers : this.headers}).subscribe(res => {
        console.log(res)
    });
  }
  public register(user: RegisterUser) {
    return this.http.post<RegisterUser>(this.apiHost + 'api/auth/register',user, { headers: this.headers }).subscribe(res => {
      console.log(res)
  });
  }
}
