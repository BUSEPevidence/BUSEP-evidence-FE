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

}
