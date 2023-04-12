import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { CertificateEECA } from '../model/certificat-ee-ca';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-make-ca-ee-certificate',
  templateUrl: './make-ca-ee-certificate.component.html',
  styleUrls: ['./make-ca-ee-certificate.component.css']
})

export class MakeCaEeCertificateComponent implements OnInit {

  issuers: string[] = []


  constructor(
    private userService: UserService,
    private toast: ToastrService,
  ) { }

  makeSertificateForm = new FormGroup({
    isCa: new FormControl("true", [Validators.required]),
    issuer: new FormControl("", [Validators.required]),
    certName: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]),
    subjectName: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    organization: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    organizationUnit: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    country: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    email: new FormControl("", [Validators.required, Validators.email]),
    yearsOfValidity: new FormControl(1, [Validators.required, Validators.pattern('^[0-9 ]+$')])
  });



  ngOnInit() {
    this.userService.GetAliases().subscribe(res => {
      this.issuers = res
    })
  }

  public makeCertificate() {

    let certificate: CertificateEECA = {
      subjectName: this.makeSertificateForm.get('subjectName')?.value ?? "",
      organization: this.makeSertificateForm.get('organization')?.value ?? "",
      orgainzationUnit: this.makeSertificateForm.get('orgainzationUnit')?.value ?? "",
      country: this.makeSertificateForm.get('country')?.value ?? "",
      email: this.makeSertificateForm.get('email')?.value ?? "",
      yearsOfValidity: this.makeSertificateForm.get('yearsOfValidity')?.value ?? 0,
    }

    let issuer = this.makeSertificateForm.get('issuer')?.value ?? ""
    let certName = this.makeSertificateForm.get('certName')?.value ?? ""

    if (this.makeSertificateForm.get('isCa') != null) {
      if (this.makeSertificateForm.get('isCa')?.value == "true") {
        this.userService.makeCertificateCA(certificate, issuer, certName).subscribe({
          next: (res:any) => {
            if(res == "Signer don't have valid certificate")
            this.toast.error("Signer don't have valid certificate");
            else
            this.toast.success('Created successfully');
          },
          error: (error) => {
            console.error(error);
            this.toast.error(error.error);
          }
        })
      } else {
        this.userService.makeCertificateEE(certificate, issuer, certName).subscribe({
          next: (res:any) => {
            if(res == "Signer don't have valid certificate")
            this.toast.error("Signer don't have valid certificate");
            else
            this.toast.success('Created successfully');
          },
          error: (error) => {
            console.error(error);
            this.toast.error(error.error);
          }
        })
      }
    }
  }
}
