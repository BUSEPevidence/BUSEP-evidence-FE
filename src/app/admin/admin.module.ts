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





const routes: Routes = [
    {
        path: 'admin',
        children: [
            {
                path: 'make-cert',
                component: MakeCertificateComponent
            },
            {
                path: 'all-cert',
                component: AllCertificatesComponent
            }
        ]
    }
]

@NgModule({
    declarations: [
        MakeCertificateComponent,
        AllCertificatesComponent
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
        ToastrModule.forRoot(),
        RouterModule.forChild(routes)
    ]
})
export class AdminModule {}