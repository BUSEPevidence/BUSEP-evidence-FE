import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import * as SockJS from "sockjs-client";
import * as Stomp from 'stompjs'

@Injectable({
    providedIn: 'root'
  })
  export class NotificationService {
    constructor(private toastr: ToastrService) {

        
      }
      public stompClient: Stomp.Client | undefined;
      public msg = [];
      initializeWebSocketConnection() {
        console.log("Socket Initialized 1st step")
        const serverUrl = 'https://localhost:8443/socket';
        const ws = new SockJS(serverUrl);
        this.stompClient = Stomp.over(ws);
        const that = this;
        // tslint:disable-next-line:only-arrow-functions
        console.log("Socket Initialized")
        this.stompClient.connect({}, (frame) => {
            that.stompClient?.subscribe('/topic/notification', (message) => {
              this.toastr.warning(message.body, 'Warning');
              console.log(message.body)
            });
            
          });
      }
      public getConn(){
        return this.stompClient
      }
  }