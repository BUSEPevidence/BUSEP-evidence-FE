import { trigger, transition, query, style, stagger, animate } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuService } from "../menu.service";
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from "src/app/admin/admin.service";
import { AuthService } from "../auth.service";
import { NotificationService } from "src/app/admin/notification.service";



@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
  animations: [
    trigger('menuLoading', [
      transition(':enter', [
        query('.item', [
          style({
            opacity: 0,
            transform: 'translateX(-100px)'
          }),
          stagger(100, [
            animate('600ms 0.2s ease-in-out',
              style({
                opacity: 1,
                transform: 'translateX(0px)'
              }))
          ])
        ])
      ])
    ])
  ]
})
export class SideMenuComponent implements OnInit {

  private burgerState: boolean = true;
  constructor(
    private readonly menuService: MenuService,
    private readonly router: Router,
    private readonly authService : AuthService,
  ) { }

  ngOnInit(): void {
  }
  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(["/"]);
  }

  toggleBurger() {
    this.burgerState = !this.burgerState
    this.menuService.setBurgerState(this.burgerState)
  }

  isHidden() {
    if(localStorage.getItem('token') != null)
        return true;
    return false;
  }
  isHiddenAdmin()
  {
    var rol : any;
    var check : boolean = false
    var role: string = "";
    
    if(localStorage.getItem('role') != null)
    {
      rol = localStorage.getItem('role')
      role = rol + ""
      role.split(',').forEach((item: string) => {
        if(item == "ROLE_ADMIN")
          check = true
      });
    }
    if(check)
      if(this.isAdmin())
        return false
    return true

  }
  isAdmin() : boolean
  {
    var hide = localStorage.getItem('hide')
    if(hide!= null)
      if(hide == "1")
        return false
    return true
  }
  isHiddenLogout() {
    if(localStorage.getItem('token') == null)
        return true;
    return false;
  }
}
