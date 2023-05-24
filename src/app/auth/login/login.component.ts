import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginUser } from './model/LoginUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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
  ngOnInit() {
    this.authService.linkEntered()
    console.log("usao")
  }

  public login()
  {
    this.getValues();
    this.authService.login(this.user)
  }

  public goToPasswordless() {
    this.router.navigate(["/passwordless"]);
  }
  validateUsername() : boolean{
    const usernamePattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if(!this.username.match(usernamePattern)){
      return false
    } 
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
