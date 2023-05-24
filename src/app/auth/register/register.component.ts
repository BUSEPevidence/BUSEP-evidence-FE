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
  firstname: string = ''
  username: string = ''
  password: string = ''
  repeater: string = ''
  lastname: string = ''
  address: string = ''
  city: string = ''
  state: string = ''
  number: string = ''
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
  onFirstnameChange() {
    // Perform action on text change
    //console.log('Firstname changed:', this.firstname);
  }
  onLastnameChange() {
    // Perform action on text change
    //console.log('Lastname changed:', this.lastname);
  }
  onAddressChange() {
    // Perform action on text change
    //console.log('Address changed:', this.address);
  }
  onUsernameChange() {
    // Perform action on text change
    //console.log('Username changed:', this.username);
  }
  onPasswordChange() {
    // Perform action on text change
    //console.log('Password changed:', this.password);
  }
  onCityChange() {
    // Perform action on text change
    //console.log('City changed:', this.city);
  }
  onStateChange() {
    // Perform action on text change
    //console.log('State changed:', this.state);
  }
  onNumberChange() {
    // Perform action on text change
    //console.log('Validate changed:', this.validate());
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
  validateFirstname() : boolean{
    const bigFirst = /^[A-Z][a-z]*$/;
    if(!this.firstname.match(bigFirst)){
      return false
    } 
    return true
  }
  validateLastname() : boolean{
    const bigFirst = /^[A-Z][a-z]*$/;
    if(!this.lastname.match(bigFirst)){
      return false
    } 
    return true
  }
  validateNumber() : boolean{
    const numbers = /^\d+$/
    if(!this.number.match(numbers)){
      return false
    } 
    return true
  }
  validateAddress() : boolean{
    const addressPattern = /^[A-Z][A-Za-z]+(?:\s[A-Z][A-Za-z]+)*$/
    if(!this.address.match(addressPattern)){
      return false
    } 
    return true
  }
  validateCity() : boolean{
    const addressPattern = /^[A-Z][A-Za-z]+(?:\s[A-Z][A-Za-z]+)*$/
    if(!this.city.match(addressPattern)){
      return false
    } 
    return true
  }
  validateState() : boolean{
    const addressPattern = /^[A-Z][A-Za-z]+(?:\s[A-Z][A-Za-z]+)*$/
    if(!this.state.match(addressPattern)){
      return false
    } 
    return true
  }
  validateRepeat() : boolean{
    if(this.password != this.repeater)
    {
      console.log("razliciti passwordi")
      return false;
    }
    return true
  }
  validate() : boolean{
    if(!(this.firstname != '' && this.lastname != '' && this.address != '' && this.username != '' && this.password != '' && this.city != '' && this.state != '' && this.number != ''))
    {
      return false
    }
    const usernamePattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const bigFirst = /^[A-Z][a-z]*$/;
    const passwordPattern = /^(?=.*\d).+$/;
    const addressPattern = /^[A-Z][A-Za-z]+(?:\s[A-Z][A-Za-z]+)*$/
    const numbers = /^\d+$/
    if(!this.username.match(usernamePattern)){
      console.log("puko username")
      return false
    } 
    if(!this.firstname.match(bigFirst)) {
      console.log("puko firstname")
      return false;
    }
    if(!this.lastname.match(bigFirst)){
      console.log("puko lastname")
      return false;
    } 
    if(!this.password.match(passwordPattern)) {
      console.log("puko password")
      return false;
    } 
    if(!this.state.match(addressPattern)) {
      console.log("puko state")
      return false;
    } 
    if(!this.city.match(addressPattern)) {
      console.log("puko city")
      return false;
    } 
    if(!this.address.match(addressPattern)) {
      console.log("puko address")
      return false;
    } 
    if(!this.number.match(numbers)) {
      console.log("puko number")
      return false;
    } 
    if(this.password != this.repeater)
    {
      console.log("razliciti passwordi")
      return false;
    }
    return true
  }
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
