import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RegisterUser } from '../login/model/RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router: Router,private authService : AuthService) { }
  public user: RegisterUser = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    state: '',
    number: '',
    title: [],
    adminApprove: false
  };
  public canReg : boolean = true;

  public roleList?: string[];
  public findChecked(){
    const firstNameInput = document.querySelector<HTMLInputElement>('#firstname');
  const lastNameInput = document.querySelector<HTMLInputElement>('#lastname');
  const usernameInput = document.querySelector<HTMLInputElement>('#username');
  const passwordInput = document.querySelector<HTMLInputElement>('#password');
  const repeatPasswordInput = document.querySelector<HTMLInputElement>('#passwordd');
  const addressInput = document.querySelector<HTMLInputElement>('#address');
  const cityInput = document.querySelector<HTMLInputElement>('#city');
  const stateInput = document.querySelector<HTMLInputElement>('#state');
  const numberInput = document.querySelector<HTMLInputElement>('#number');

  if (firstNameInput && lastNameInput && usernameInput && passwordInput && repeatPasswordInput && addressInput && cityInput && stateInput && numberInput) {
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const username = usernameInput.value;
    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;
    const address = addressInput.value;
    const city = cityInput.value;
    const state = stateInput.value;
    const number = numberInput.value;

    this.user.firstname = firstName;
    this.user.lastname = lastName;
    this.user.username = username;
    if(passwordInput.value == repeatPasswordInput.value)
    {
    this.user.password = password;
    this.canReg = true;
    }
    else this.canReg = false;
    this.user.address = address;
    this.user.city = city;
    this.user.state = state;
    this.user.number = number;
    this.user.adminApprove = false;
    if(this.isAdmin())this.user.adminApprove = true;
  } else {
    console.log('Input elements not found');
  }
  const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll<HTMLInputElement>('input[name="title"]:checked') as NodeListOf<HTMLInputElement>;

  checkboxes.forEach((checkbox: HTMLInputElement) => {
  const name: string = checkbox.id;
  this.user.title.push(name);
  this.roleList?.push(name);
  });
}
public register(){
  this.findChecked();
  this.authService.register(this.user)

}
public isAdmin()
{
  var rol : any;
  var check : boolean = false
  var role: string = "";
  if(localStorage.getItem('role') == null)return false
  
  if(localStorage.getItem('role') != null)
  {
    rol = localStorage.getItem('role')
    role = rol + ""
    role.split(',').forEach((item: string) => {
      if(item == "ROLE_ADMIN")
        check = true
    });
  }
  if(check)
    return true
  return false

}


  ngOnInit() {
  }

}
