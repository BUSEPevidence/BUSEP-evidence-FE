import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { RegisterUser } from './login/model/RegisterUser';
import { LoginUser } from './login/model/LoginUser';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NewPasswordDTO } from '../hr/model/NewPasswordDTO';
import { LoginUserFA } from './login/model/LoginUserFA';
interface TokenInterface
{
  token:string;
  refreshToken:string;
}
interface RolesInterface
{
  roles:string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient,private router:Router) { }

  apiHost: string = "https://localhost:8443/";
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

  public magicLinkEntered() {
    const enteredURL = window.location.href;
    console.log("Usao na link: " + enteredURL);
    let paramIndex = enteredURL.indexOf('?token=');
    let param = paramIndex !== -1 ? enteredURL.substring(paramIndex + 7) : '';
    let magicLinkValid : boolean = false;
  // Split the URL to get the magicLinkId
    let magicLinkIdIndex = enteredURL.indexOf('&id=');
    let magicLinkId = magicLinkIdIndex !== -1 ? enteredURL.substring(magicLinkIdIndex + 4) : '';
    
    console.log("Token: " + param);
    console.log("Magic link id: " + magicLinkId);

    return this.http.get<TokenInterface>(this.apiHost + 'api/auth/magic-link?token=' + param + '&id=' + magicLinkId, {headers : this.headers}).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.router.navigate(['magic-link'])
        }
        return throwError(() => new Error(error));
      })
    ).subscribe(
      res => {
        localStorage.setItem('token',res.token);
        localStorage.setItem('refreshToken',res.refreshToken);
        this.getRoles(this.getDecodedAccessToken(res.token).sub);
      }
    );
  }


  public register(user: RegisterUser) {
    return this.http.post<RegisterUser>(this.apiHost + 'api/auth/register',user, { headers: this.headers }).subscribe(res => {
      console.log(res)
      window.location.reload()
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
    var checker : boolean = false;
     this.http.get<RolesInterface>(this.apiHost + 'api/auth/getRoles?request='+user, { headers: this.headers }).subscribe(res => {
      localStorage.setItem('role',res.roles)
      var rol : any;
        var check : string = ""
        var role: string = "";
          rol = localStorage.getItem('role')
          role = rol + ""
          role.split(',').forEach((item: string) => {
            if(item == "ROLE_ADMIN")
            {
              console.log(user)
              this.http.get<boolean>(this.apiHost + 'admin/check-time?username='+user, { headers: this.headers }).subscribe(res => {
                console.log(res + " res")
                check = "/admin"
                checker = res
                
                if(!res)
                {
                  localStorage.setItem('hide','1')
                  this.router.navigate(["/first-login"]);
                }
              })
     
              
            }
              if(item == "ROLE_ENGINEER")
              check = "/engineer"
              if(item == "ROLE_HR")
              check = "/hr"
              if(item == "ROLE_MANAGER")
              check = "/manager"
              
          });
          console.log(checker)
          if(checker)
            this.router.navigate(["/first-login"]);
          else
            this.router.navigate([check]);
  });
  }

  public login(user: LoginUserFA) {
    return this.http.post<TokenInterface>(this.apiHost + 'api/auth/login',user, { headers: this.headers }).subscribe(res => {
      localStorage.setItem('token',res.token)
      localStorage.setItem('refreshToken',res.refreshToken)
      this.getRoles(this.getDecodedAccessToken(res.token).sub)
  });
  }
  public forgot(username : string) {
    return this.http.post<TokenInterface>(this.apiHost + 'api/auth/password?username=' + username, { headers: this.headers }).subscribe(res => {
      console.log(res)
  });
  }
  public resetPassword(user: LoginUser) {
    var tkn = localStorage.getItem('token')
    var userr
    if(tkn != null)
      userr = this.getDecodedAccessToken(tkn).sub
    user.username = userr
    return this.http.post<string>(this.apiHost + 'admin/password',user, { headers: this.headers }).subscribe(res => {
  });
  }
  public flagUp() {
    var tkn = localStorage.getItem('token')
    var userr
    if(tkn != null)
      userr = this.getDecodedAccessToken(tkn).sub
    return this.http.get<string>(this.apiHost + 'admin/first-login?id=' + userr, { headers: this.headers }).subscribe(res => {
    console.log(res)
    this.router.navigate(["/login"]);
  });
  }
  public isAdminView() : boolean {
    var tkn = localStorage.getItem('token')
    var user
    if(tkn != null)
      user = this.getDecodedAccessToken(tkn).sub
    var checker : boolean = false
      this.http.get<boolean>(this.apiHost + 'admin/check-time?username='+user, { headers: this.headers }).subscribe(res => {
      checker = res
  });
  return checker
  }


  public magicLogin(username: String) {
    const postBody = "{\"username\":\"" + username + "\"}";
    return this.http.post(this.apiHost + 'api/auth/passwordless', postBody,{ headers: this.headers }).subscribe( () => console.log("USPJESAN PASSWORDLESS"));
  }

  public changePassword(changeDto: NewPasswordDTO) {
    return this.http.put(this.apiHost + 'api/user/change-pswrd', changeDto,{ headers: this.headers }).subscribe( () => console.log("USPJESAN PASSWORDLESS"));
  }

}

