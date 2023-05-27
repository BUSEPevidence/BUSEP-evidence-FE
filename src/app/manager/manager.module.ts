import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ManagerComponent } from "./manager.component";
import { ManGuard } from "../auth/model/manager.guard";
import { ManagerProfileComponent } from './manager-profile/manager-profile.component';



const routes: Routes = [
    {
        path: 'manager',
        component: ManagerComponent,
        canActivate: [ManGuard],
        children: [
            {
                path: 'info',
                component: ManagerProfileComponent
            },
        ]
    }
]

@NgModule({
    declarations: [
        SideMenuComponent,
        ManagerComponent,
        ManagerProfileComponent

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
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        RouterModule.forChild(routes)
    ],
    exports: [SideMenuComponent]
})
export class ManagerModule { }