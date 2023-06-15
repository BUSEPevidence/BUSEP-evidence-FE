import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../menu.service';
import { NotificationService } from '../notification.service';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs'

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent {

  constructor(
    private readonly menuService: MenuService,
    private readonly router: Router,
    private readonly notificationService : NotificationService,
  ) { 

    this.reloadPage()
    
  }
  reloadPage(): void {
    window.location.reload
  }
  
  public stompClient: Stomp.Client | undefined;
  public msg = [];
  

  ngOnInit(): void {
    const str = localStorage.getItem('logs');
    if(str != undefined)
    {
      const arr = str.split("\n");
      arr.forEach((element) => {
        if(element != "null"){
          const table = document.querySelector('.log-table') as HTMLTableElement;
          const tableRow = table.insertRow();

          const tableCell = tableRow.insertCell();
          tableCell.textContent = element;
          
        }
      });
    }
    this.initConn()
    
    


    
  }
  initConn()
  {
    console.log("Socket Initialized 1st step")
    const serverUrl = 'https://localhost:8443/logSocket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    console.log("Socket Initialized")
    this.stompClient.connect({}, (frame) => {
        this.stompClient?.subscribe('/logger/logg', (message) => { 
          console.log(message.body + " eo message")

          const table = document.querySelector('.log-table') as HTMLTableElement;
          if(table != null)
          {
          const tableRow = table.insertRow();

          const tableCell = tableRow.insertCell();
          tableCell.textContent = message.body;
          }
          const x = localStorage.getItem('logs')
              let c : string = ""
              c = x + "\n" + message.body
              localStorage.setItem('logs', c);
        });
});
  }
}
  


