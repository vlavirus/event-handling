import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  readonly VAPID_PUBLIC_KEY = "BI0OKWncKRuNh1vB9d2ewGj_uNXyKhUBBBClkf9u1gYK2dJ280YdXf-J3X7eoY0eXfRKvzLDL8P1LhVnlVUOLy0";

  sub = {
    "endpoint":"https://fcm.googleapis.com/fcm/send/fnYJmD92ZDc:APA91bHd_y8yCLH77z3mXcWWbo4F1TonqStyruec-ZmeDUx7wpO0nOKClvWyEN43xycpOuM7NMnHyVbOh3S4SXPYqHXF86DDnSCJS9tQpHNjcQKVGE81HUttNquLYiHrk2TqBEoPxGlB",
    "expirationTime":null,
    "keys": {
      "p256dh":"BBX6F4osOhLq45imVW5HCaqepQ7w9rLVJB-fL27K1okcEQx3xmdyeaxGU0NNplxlobugZ23WonQUcTul2KFZSME",
      "auth":"QzG4GGda4AzCeYbtLGZ8mQ"
    }
  }

  payload = {
    "notification": {
      "data": { url: 'https://www.google.com/'},
      "title": 'Hello World',
      "vibrate": [100, 50, 100]
    }
  }

  constructor(
    private swPush: SwPush,
    // private newsletterService: NewsletterService
  ) { }

  ngOnInit(): void {
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        console.log(JSON.stringify(sub));
        // this.newsletterService.addPushSubscriber(sub).subscribe();
      })
      .catch(err => console.error("Could not subscribe to notifications", err));
  }

  pushSubscription() {
    if (!this.swPush.isEnabled) {
      console.log("Notification is not enable");
    }



}
