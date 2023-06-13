import { Component, OnInit } from '@angular/core';
import { EmployeeDTO } from '../model/employeeDTO';
import { AdminService } from '../admin.service';
import { FilterParamsDTO } from '../model/FilterParamsDTO';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent implements OnInit {
  employeeList: EmployeeDTO[] = []
  filterForm!: FormGroup;

  isModalOpen = false;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) {
  }

  ngOnInit() {
    this.getAllEmployees();
    this.initFilterForm();
  }

  public BlockUser(username: string) {
    this.adminService.BlockUser(username);
  }

  initFilterForm() {
    this.filterForm = this.formBuilder.group({
      name: [''],
      surname: [''],
      email: [''],
      dayWorking: [null]
    });
  }

  public getAllEmployees() {
    this.employeeList = this.adminService.getAllEmployees();
    console.log(this.employeeList)
  }

  applyFilter() {
    const filterParams: FilterParamsDTO = {
      firstname: this.filterForm.get('name')!.value,
      surname: this.filterForm.get('surname')!.value,
      email: this.filterForm.get('email')!.value,
      workDate: this.filterForm.get('dayWorking')!.value ? new Date(this.filterForm.get('dayWorking')!.value) : null
    };

    // Send the filterParams object to your backend API
    this.adminService.getFiltered(filterParams).subscribe(
      response => {
        this.employeeList = response;
        console.log(response);
      },
      error => {
        // Handle any errors that occurred during the request
        console.error(error);
      }
    );

    // Close the modal
    this.closeModal();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.filterForm.reset({
      name: '',
      surname: '',
      email: '',
      dayWorking: null
    });
    this.isModalOpen = false;
  }
}
