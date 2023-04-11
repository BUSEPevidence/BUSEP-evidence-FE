import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MakeRootCertDTO } from '../model/makeRootCertDTO';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-make-certificate',
  templateUrl: './make-certificate.component.html',
  styleUrls: ['./make-certificate.component.css']
})
export class MakeCertificateComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  makeSertificateForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    cn: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    organization: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    organizationUnit: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    country: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    yearsOfValidity: new FormControl("", Validators.required)
  });


  ngOnInit() {
  }

  public makeCertificate() {
    const certificateToCreate: MakeRootCertDTO = {
      organization: "" + this.makeSertificateForm.get('organization')?.value,
      orgainzationUnit: "" + this.makeSertificateForm.get('organizationUnit')?.value,
      country: "" + this.makeSertificateForm.get('country')?.value,
      email: "" + this.makeSertificateForm.get('email')?.value,
      yearsOfValidity: this.makeSertificateForm.get('yearsOfValidity')?.value as unknown as number,
      rootName: "" + this.makeSertificateForm.get('cn')?.value
    }

    this.adminService.makeRootCertificate(certificateToCreate).subscribe(res => {
      console.log(res)
    })
  }

}
