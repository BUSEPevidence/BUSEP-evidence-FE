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
import { EngineerComponent } from "./engineer.component";
import { EngGuard } from "../auth/model/engineer.guard";
import { ProjectsComponent } from './projects/projects.component';
import { ProfileComponent } from './profile/profile.component';



const routes: Routes = [
    {
        path: 'engineer',
        component: EngineerComponent,
        canActivate: [EngGuard],
        children: [
            {
                path: 'projects',
                component: ProjectsComponent
            },
            {
                path: 'info',
                component: ProfileComponent
            },
        ]
    }
]

@NgModule({
    declarations: [
        SideMenuComponent,
        EngineerComponent,
        ProjectsComponent,
        ProfileComponent

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
export class EngineerModule { }