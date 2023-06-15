import { trigger, transition, query, style, stagger, animate } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { MenuService } from "../menu.service";
import { NotificationService } from "../notification.service";



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
    private readonly notificationService : NotificationService
  ) { }

  ngOnInit(): void {
    this.notificationService.initializeWebSocketConnection()
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
  logOut()
  {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('refreshToken')
  }
  dodat(){
  this.router.navigate(["/admin/logg"])
    .then(() => {
      window.location.reload();
    });
}
  

  isHidden() {
    if(localStorage.getItem('token') != null)
        return true;
    return false;
  }

  isHiddenLogout() {
    if(localStorage.getItem('token') == null)
        return true;
    return false;
  }
  isHiddenEngineer()
  {
    var rol : any;
    var check : boolean = false
    var role: string = "";
    
    if(localStorage.getItem('role') != null)
    {
      rol = localStorage.getItem('role')
      role = rol + ""
      role.split(',').forEach((item: string) => {
        if(item == "ROLE_ENGINEER")
          check = true
      });
    }
    if(check)
      return false
    return true

  }
  isHiddenManager()
  {
    var rol : any;
    var check : boolean = false
    var role: string = "";
    
    if(localStorage.getItem('role') != null)
    {
      rol = localStorage.getItem('role')
      role = rol + ""
      role.split(',').forEach((item: string) => {
        if(item == "ROLE_MANAGER")
          check = true
      });
    }
    if(check)
      return false
    return true

  }
  isHiddenHr()
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
      return false
    return true

  }
}
