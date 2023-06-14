import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NewPasswordDTO } from 'src/app/hr/model/NewPasswordDTO';
import { ShowUserDTO } from 'src/app/hr/model/ShowUserDTO';
import { UpdateUserDTO } from 'src/app/hr/model/UpdateUserDTO';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent {
  public user!: ShowUserDTO;
  changePasswordModalVisible: boolean = false;

  changePasswordForm: FormGroup;

  constructor(private service: AdminService, private formBuilder: FormBuilder, private toast: ToastrService) {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    this.service.getUser().subscribe(
      response => {
        this.user = response;
      },
      error => {
        console.error('Error updating work description:', error);
      }
    );
  }

  saveChanges() {
    const updateUserDTO: UpdateUserDTO = {
      username: this.user.username,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      address: this.user.address,
      city: this.user.city,
      state: this.user.state,
      number: this.user.number
    };
    this.service.updateUser(updateUserDTO).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Error updating engineer description:', error);
      }
    );
    window.location.reload();
  }

  openChangePasswordModal(): void {
    this.changePasswordModalVisible = true;
  }

  closeChangePasswordModal(): void {
    this.changePasswordModalVisible = false;
    this.changePasswordForm.reset();
  }

  changePasswords() {
    const newPasswordDTO: NewPasswordDTO = {
      currentPassword: this.changePasswordForm.value.currentPassword,
      newPassword: this.changePasswordForm.value.newPassword
    };

    this.service.changePasswords(newPasswordDTO).subscribe(
      response => {
        this.toast.success(response);
      },
      error => {
        console.error('Error updating engineer description:', error);
      }
    );
    // Reset the form data
    this.closeChangePasswordModal();
  }

  passwordsMatch(): boolean {
    const newPassword = this.changePasswordForm.value.newPassword;
    const confirmPassword = this.changePasswordForm.value.confirmPassword;
    return newPassword !== '' && newPassword === confirmPassword;
  }

  isUserLoaded(): boolean {
    return this.user !== undefined;
  }
}
