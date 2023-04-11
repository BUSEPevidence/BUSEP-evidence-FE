import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakeCaEeCertificateComponent } from './make-ca-ee-certificate/make-ca-ee-certificate.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';


const routes: Routes = [
  {
    path: 'user',
    children: [
      {
        path: 'make-cert',
        component: MakeCaEeCertificateComponent
      },
    ]
  }
]


@NgModule({
  declarations: [
    MakeCaEeCertificateComponent,
  ],
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    HttpClientModule,
    MatRadioModule,
    FormsModule,
    MatSelectModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
