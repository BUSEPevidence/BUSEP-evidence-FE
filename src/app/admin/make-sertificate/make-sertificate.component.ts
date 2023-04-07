import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-make-sertificate',
  templateUrl: './make-sertificate.component.html',
  styleUrls: ['./make-sertificate.component.css']
})
export class MakeSertificateComponent implements OnInit {

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
