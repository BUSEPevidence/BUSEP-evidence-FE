import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/auth/login/model/RegisterUser';
import { AdminService } from '../admin.service';
import { RolePermissionDTO } from '../model/RolePermissionDTO';
import { RolePermDTO } from '../model/RolePermDTO';

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.css']
})
export class AddPermissionComponent {
  constructor(private adminService: AdminService, private router: Router) { }
  resultList: RolePermissionDTO[] = [];
  roleList: RolePermDTO[] = [];
  permList: RolePermDTO[] = [];
  selectedRole!: RolePermDTO;
  selectedPerm! : RolePermDTO;
  

  ngOnInit() {
    this.getRequests()
    this.getAllPerm()
    this.getAllRoles()

  }


  public getRequests() {
    this.resultList = this.adminService.getPerms();
    console.log(this.resultList)
    
  }

  public deletePermission(user : RolePermissionDTO)
  {
    console.log(user)
    this.adminService.deletePermission(user)

  }
  public addPermission()
  {
    console.log(this.selectedRole.name + " " + this.selectedPerm.name)
    const newUser: RolePermissionDTO = {
     role:this.selectedRole.name,
     permission:this.selectedPerm.name
    };
    this.adminService.addPermission(newUser)

  }
  public getAllPerm() {
    this.permList = this.adminService.getAllPerms();
    console.log(this.permList)
    
    if (this.permList.length > 0) {
      this.selectedPerm = this.permList[0];
    }
    
  
    
  }
  public getAllRoles() {
    this.roleList = this.adminService.getAllRoles()
    console.log(this.roleList)
    if (this.roleList.length > 0) {
      this.selectedRole = this.roleList[0];
    }
    
    
  }

 

}
