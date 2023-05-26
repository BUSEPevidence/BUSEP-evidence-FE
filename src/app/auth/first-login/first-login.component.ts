import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginUser } from '../login/model/LoginUser';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent {
  constructor(private router: Router,private authService : AuthService) { }

  username: string = ''
  password: string = ''
  public user: LoginUser = {
    username: '',
    password: '',
  };

  public getValues()
  {
  
  // Retrieve the values
  const usernameInput = document.getElementById('username') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;

  this.user.username = usernameInput.value;
  this.user.password = passwordInput.value;

  }
  getDecodedAccessToken(token: string): any {
  
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
  ngOnInit() {
    this.authService.linkEntered()
    console.log("usao")
  }

  public resetPassword()
  {
    console.log("usao u reset")
    this.user.password = this.password
    this.authService.resetPassword(this.user)
    this.authService.flagUp()
    localStorage.clear()
    this.router.navigate(["/login"]);
  }

  public goToPasswordless() {
    this.router.navigate(["/passwordless"]);
  }
  validatePasswords() : boolean{
    if(this.username != this.password)
      return false
    return true
  }
  validatePassword() : boolean{
    const passwordPattern = /^(?=.*\d).+$/;
    if(!this.password.match(passwordPattern)){
      return false
    } 
    return true
  }

}
function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}

