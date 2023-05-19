import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { MakeRootCertDTO } from '../model/makeRootCertDTO';
import { RegisterUser } from 'src/app/auth/login/model/RegisterUser';

@Component({
  selector: 'app-accept-request',
  templateUrl: './accept-request.component.html',
  styleUrls: ['./accept-request.component.css']
})
export class AcceptRequestComponent {


  constructor(private adminService: AdminService, private router: Router) { }
  resultList: RegisterUser[] = [];

  ngOnInit() {
    this.getRequests()
  }


  public getRequests() {
    this.resultList = this.adminService.getRequests();
    console.log(this.resultList)
    
  }
  public approveRequest(user : RegisterUser)
  {
    this.adminService.approveRequest(user)

  }
  public denieRequest(user : RegisterUser)
  {
    this.adminService.denieRequest(user)

  }

}
