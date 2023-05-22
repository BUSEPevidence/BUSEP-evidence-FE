import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { PermissionDTO } from '../model/PermissionDTO';

@Component({
  selector: 'app-create-permission',
  templateUrl: './create-permission.component.html',
  styleUrls: ['./create-permission.component.css']
})
export class CreatePermissionComponent {
  constructor(private router: Router,private adminService : AdminService) { }

  public user: PermissionDTO = {
    name:''
  };
  ngOnInit() {
  }

  public getValues()
  {
  
  // Retrieve the values
  const usernameInput = document.getElementById('username') as HTMLInputElement;

  this.user.name = usernameInput.value;
  }
  public addPermission()
  {
    this.getValues()
    console.log(this.user.name)
    const newUser: PermissionDTO = {
     name:this.user.name
    };
    this.adminService.createPermission(newUser)

  }

}
