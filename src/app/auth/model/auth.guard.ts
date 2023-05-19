import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";




@Injectable
(
    {
        providedIn: 'root'
    }
)
export class AuthGuard implements CanActivate{
    constructor(private router: Router){
        

    }
    canActivate()
    {
        var rol : any;
        var check : boolean = false
        var role: string = "";
        
        if(localStorage.getItem('role') != null)
        {
          rol = localStorage.getItem('role')
          role = rol + ""
          role.split(',').forEach((item: string) => {
            if(item == "ROLE_HR")
              check = true
          });
        }
        if(check)
            return true;
        else
            this.router.navigate(['/login']);
            return false;
    }
    
}