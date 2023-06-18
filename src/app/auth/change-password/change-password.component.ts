import { Component } from '@angular/core';
import { NewPasswordDTO } from 'src/app/hr/model/NewPasswordDTO';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  constructor(private router: Router,private authService : AuthService) { }

  username: string = ''
  password: string = ''
  public user: NewPasswordDTO = {
    newPassword: '',
    currentPassword: '',
  };

  public getValues()
  {
  
  // Retrieve the values
  const usernameInput = document.getElementById('username') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;

  this.user.currentPassword = usernameInput.value;
  this.user.newPassword = passwordInput.value;

  }
  ngOnInit() {
  }

  public changePassword()
  {
    this.getValues()
    this.authService.changePassword(this.user)
  }

}
