import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginUser } from '../login/model/LoginUser';

@Component({
  selector: 'app-magic-login',
  templateUrl: './magic-login.component.html',
  styleUrls: ['./magic-login.component.css']
})
export class MagicLoginComponent {

  constructor(private router: Router,private authService : AuthService) { }

  
  public username: string = "";

  public getValues() {
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    this.username = usernameInput.value;
  }

  public magicLogin()
  {
    this.getValues();
    this.authService.magicLogin(this.username)
  }


}
