import { RouterModule, Routes } from "@angular/router";
import { MakeSertificateComponent } from "./make-sertificate/make-sertificate.component";
import { NgModule } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


const routes: Routes = [
    {
        path: 'admin',
        children: [
            {
                path: 'make-sert',
                component: MakeSertificateComponent
            }
        ]
    }
]

@NgModule({
    declarations: [
        MakeSertificateComponent
    ],
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        CommonModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        RouterModule.forChild(routes)
    ]
})
export class AdminModule {}