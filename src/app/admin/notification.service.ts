import { Injectable } from "@angular/core";
import * as SockJS from "sockjs-client";
import * as Stomp from 'stompjs'

@Injectable({
    providedIn: 'root'
  })
  export class NotificationService {
    constructor() {
        this.initializeWebSocketConnection();
        
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
        this.stompClient.connect({}, function(frame) {
          that.stompClient?.subscribe('/topic/notification', (message) => {
           console.log(message)
          });
        });
      }
  }