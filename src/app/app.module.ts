import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './auth/model/auth.interceptor';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    AuthModule
  ],
  providers: [
    {
       provide: HTTP_INTERCEPTORS,
       useClass: TokenInterceptor,
       multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
