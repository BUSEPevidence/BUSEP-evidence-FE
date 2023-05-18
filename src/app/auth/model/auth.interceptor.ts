import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if(token) {
      const decT: any = jwtDecode(token);

    const expired = decT.exp * 1000;
    const currentTime = new Date().getTime();
    const remainingTime = expired - currentTime;
    const remainingMinutes = Math.floor(remainingTime / (1000 * 60));

    if  (remainingMinutes < 5) {
      
    }
    }
    if (token) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(authRequest);
    }

    return next.handle(request);
  }
}