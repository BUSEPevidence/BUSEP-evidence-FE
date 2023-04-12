import { RouterModule, Routes } from "@angular/router";
import { MakeCertificateComponent } from "./make-certificate/make-certificate.component";
import { NgModule } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AllCertificatesComponent } from "./all-certificates/all-certificates.component";
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MakeCaEeComponent } from "./make-ca-ee/make-ca-ee.component";
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';



const routes: Routes = [
    {
        path: 'admin',
        children: [
            {
                path: 'make-root',
                component: MakeCertificateComponent
            },
            {
                path: 'all-cert',
                component: AllCertificatesComponent
            },
            {
                path: 'make-cert',
                component: MakeCaEeComponent
            }
        ]
    }
]

@NgModule({
    declarations: [
        MakeCertificateComponent,
        AllCertificatesComponent,
        MakeCaEeComponent
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
        MatSnackBarModule,
        MatRadioModule,
        MatSelectModule,
        ToastrModule.forRoot(),
        RouterModule.forChild(routes)
    ]
})
export class AdminModule { }