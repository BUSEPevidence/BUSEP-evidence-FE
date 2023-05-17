import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { HrComponent } from './hr/hr.component';
import { ManagerComponent } from './manager/manager.component';
import { EngineerComponent } from './engineer/engineer.component';
import { AuthGuard } from './auth/model/auth.guard';
import { AdminGuard } from './auth/model/admin.guard';
import { EngGuard } from './auth/model/engineer.guard';
import { ManGuard } from './auth/model/manager.guard';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
   { path: 'user', component: UserComponent },
   { path: 'admin', component: AdminComponent,canActivate: [AdminGuard]},
   { path: 'hr', component: HrComponent,canActivate: [AuthGuard]},
   { path: 'manager', component: ManagerComponent,canActivate: [ManGuard]},
   { path: 'engineer', component: EngineerComponent,canActivate: [EngGuard]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
