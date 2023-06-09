import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginUser } from './model/LoginUser';
import { NotificationService } from 'src/app/admin/notification.service';
import { LoginUserFA } from './model/LoginUserFA';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router,private authService : AuthService) { }

  username: string = ''
  password: string = ''
  fa: string = ''
  public user: LoginUserFA = {
    username: '',
    password: '',
    fa : ''
  };

  public getValues()
  {
  
  // Retrieve the values
  const usernameInput = document.getElementById('username') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const faInput = document.getElementById('fa') as HTMLInputElement;

  this.user.username = usernameInput.value;
  this.user.password = passwordInput.value;
  this.user.fa = faInput.value;

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
  public forgotPassword()
  {
    this.getValues();
    if (this.user.username == "")alert("Fill username")
    else
    {
    this.authService.forgot(this.user.username)
    }
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
