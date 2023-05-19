import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token) {
      const decT: any = jwtDecode(token);

      const expired = decT.exp * 1000;
      const currentTime = new Date().getTime();
      const remainingTime = expired - currentTime;
      const remainingMinutes = Math.floor(remainingTime / (1000 * 60));

      console.log(remainingMinutes)

      if (remainingMinutes < 5 && refreshToken) {
        // Add the refresh token to the request headers
        request = request.clone({
          headers: request.headers
            .set('Authorization', `Bearer ${token}`)
            .set('refreshToken', refreshToken)
        });
      } else if(token) {
        request = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`)
        });
      }
    }

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          let tokenR = event.headers.get("tokenR");
          if(tokenR != null) {
            localStorage.setItem('token',tokenR)
          }
          // Handle the response here
          // You can access the response headers, status, body, etc.
          console.log('Response received:', event);
        }
      })
    );
  }
}