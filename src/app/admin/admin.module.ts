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
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminComponent } from "./admin.component";
import { AcceptRequestComponent } from './accept-request/accept-request.component';
import { AdminGuard } from "../auth/model/admin.guard";
import { AddPermissionComponent } from './add-permission/add-permission.component';
import { CreatePermissionComponent } from './create-permission/create-permission.component';
import { AllEmployeesComponent } from "./all-employees/all-employees.component";
import { AllProjectsComponent } from "./all-projects/all-projects.component";
import { CreateProjectComponent } from "./create-project/create-project.component";



const routes: Routes = [
    {
        path: 'admin',
        component:AdminComponent,
        canActivate: [AdminGuard],
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
            },
            {
                path: 'accept-request',
                component: AcceptRequestComponent
            },
            {
                path: 'add-permission',
                component:AddPermissionComponent
            },
            {
                path: 'create-permission',
                component:CreatePermissionComponent
            },
            {
                path: 'all-employees',
                component: AllEmployeesComponent
            },
            {
                path: 'all-projects',
                component: AllProjectsComponent
            },
            {
                path: 'create-project',
                component: CreateProjectComponent
            }
        ]
    }
]

@NgModule({
    declarations: [
        MakeCertificateComponent,
        AllCertificatesComponent,
        MakeCaEeComponent,
        SideMenuComponent,
        AdminComponent,
        AcceptRequestComponent,
        AddPermissionComponent,
        CreatePermissionComponent,
        AllEmployeesComponent,
        AllProjectsComponent,
        CreateProjectComponent
    ],
    imports: [
        MatToolbarModule,
        MatIconModule,
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
    ],
    exports: [SideMenuComponent]
})
export class AdminModule { }