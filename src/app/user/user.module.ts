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
import { AllChildsComponent } from './all-childs/all-childs.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserComponent } from './user.component';



const routes: Routes = [
  {
    path: 'user',
    component:UserComponent,
    children: [
      {
        path: 'make-cert',
        component: MakeCaEeCertificateComponent
      },
      {
        path: 'all-childs',
        component: AllChildsComponent
      },
    ]
  }
]


@NgModule({
  declarations: [
    MakeCaEeCertificateComponent,
    AllChildsComponent,
    SideMenuComponent,
    UserComponent

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
    MatRadioModule,
    FormsModule,
    MatSelectModule,
    RouterModule.forChild(routes)
  ],
  exports: [SideMenuComponent]
})
export class UserModule { }
