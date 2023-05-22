import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './model/auth.guard';
import { MatIconModule } from '@angular/material/icon';
import { AuthComponent } from './auth.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MagicLoginComponent } from './magic-login/magic-login.component';
import { MagicLinkComponent } from './magic-link/magic-link.component';


const routes: Routes = [
  {
    path: '',
    component:AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'passwordless',
        component: MagicLoginComponent
      },
      {
        path: 'magic-link',
        component: MagicLinkComponent
      }
    ]
  }
]


@NgModule({
  declarations: [
    SideMenuComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    MagicLoginComponent,
    MagicLinkComponent
  ],
  imports: [
    MatToolbarModule,
    RouterModule,
    CommonModule,
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
    RouterModule.forRoot(routes)
  ],
  exports: [SideMenuComponent]
})
export class AuthModule { }
