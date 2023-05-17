import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RegisterUser } from './login/model/RegisterUser';
import { LoginUser } from './login/model/LoginUser';
import jwt_decode from 'jwt-decode';
interface TokenInterface
{
  token:string;
}
interface RolesInterface
{
  roles:string;
}

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
    if(param != "regular")
    {

    
    console.log(this.apiHost + 'api/auth/visitLink?request=' + param);
    return this.http.get(this.apiHost + 'api/auth/visitLink?request=' + param,{headers : this.headers}).subscribe(res => {
        console.log(res)
    });
    
  }
  return null;
  }
  public register(user: RegisterUser) {
    return this.http.post<RegisterUser>(this.apiHost + 'api/auth/register',user, { headers: this.headers }).subscribe(res => {
      console.log(res)
  });
  }
  getDecodedAccessToken(token: string): any {
  
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
  public getRoles(user: string) {
    var ret : string = ""
     this.http.get<RolesInterface>(this.apiHost + 'api/auth/getRoles?request='+user, { headers: this.headers }).subscribe(res => {
      localStorage.setItem('role',res.roles)
  });
  }

  public login(user: LoginUser) {
    return this.http.post<TokenInterface>(this.apiHost + 'api/auth/login',user, { headers: this.headers }).subscribe(res => {
      localStorage.setItem('token',res.token)
      this.getRoles(this.getDecodedAccessToken(res.token).sub)
  });
  }
}

