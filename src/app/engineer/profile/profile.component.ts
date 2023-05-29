import { Component, Input, OnInit } from '@angular/core';
import { ShowEngineerDTO } from '../model/ShowEngineerDTO';
import { EngineerService } from '../engineer.service';
import { ShowUserDTO } from '../model/ShowUserDTO';
import { ExperienceDTO } from '../model/ExperienceDTO';
import { UpdateEngineerDTO } from '../model/UpdateEngineerDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewPasswordDTO } from '../model/NewPasswordDTO';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public engineer!: ShowEngineerDTO;
  public user!: ShowUserDTO;
  newExperience: ExperienceDTO = new ExperienceDTO();
  newExperienceModalVisible: boolean = false;
  changePasswordModalVisible: boolean = false;

  changePasswordForm: FormGroup;



  constructor(private service: EngineerService, private formBuilder: FormBuilder, private toast: ToastrService) {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getEngineerProfile();
  }

  getEngineerProfile() {
    this.service.getEngineer().subscribe(
      response => {
        this.engineer = response;
        this.user = this.engineer.user;
      },
      error => {
        console.error('Error getting engineer:', error);
      }
    );
  }

  addExperience() {
    this.service.addExperience(this.newExperience).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Error updating work description:', error);
      }
    );
    this.newExperience.grade = 0;
    this.newExperience.title = "";
    window.location.reload();
    this.closeNewExperienceModal();
  }

  saveChanges() {
    const updateEngineerDTO: UpdateEngineerDTO = {
      firstname: this.engineer.user.firstname,
      lastname: this.engineer.user.lastname,
      address: this.engineer.user.address,
      city: this.engineer.user.city,
      state: this.engineer.user.state,
      number: this.engineer.user.number
    };
    this.service.updateEngineer(updateEngineerDTO).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Error updating engineer description:', error);
      }
    );
    window.location.reload();
  }

  openNewExperienceModal(): void {
    this.newExperienceModalVisible = true;
  }


  closeNewExperienceModal(): void {
    this.newExperienceModalVisible = false;
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

  handleCVUpload(event: any) {
    const file = event.target.files[0];
    this.service.uploadCV(file).subscribe(
      response => {
        this.toast.success(response);
      },
      error => {
        console.error('Error updating engineer description:', error);
      }
    );
    event.target.value = null;
    window.location.reload();
  }

  openCV(): void {
    window.open(this.engineer.details.CvUrl, '_blank');
  }

  isUserLoaded(): boolean {
    return this.user !== undefined;
  }
}
