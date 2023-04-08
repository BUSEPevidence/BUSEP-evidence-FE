import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-make-certificate',
  templateUrl: './make-certificate.component.html',
  styleUrls: ['./make-certificate.component.css']
})
export class MakeCertificateComponent implements OnInit {

  constructor() { }

  makeSertificateForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    cn: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    surname: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    givenName: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    organization: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    organizationUnit: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    country: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    uid: new FormControl("", [Validators.required, Validators.pattern('^[0-9 ]+$')])
  });


  ngOnInit() {
  }

}
