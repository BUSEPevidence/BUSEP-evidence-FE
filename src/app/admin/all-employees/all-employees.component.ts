import { Component, OnInit } from '@angular/core';
import { EmployeeDTO } from '../model/employeeDTO';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent implements OnInit {
  employeeList: EmployeeDTO[] = []
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getAllEmployees();
  }


  public getAllEmployees() {
    this.employeeList = this.adminService.getAllEmployees();
    console.log(this.employeeList)
  }
}
