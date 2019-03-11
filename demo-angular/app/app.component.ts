import { Component } from "@angular/core";
import * as dialogs from 'tns-core-modules/ui/dialogs';

import { getAccessToken, setupCallListener, Twilio } from 'nativescript-twilio';

@Component({
    selector: "my-app",
    templateUrl: "./app.component.html",
})
export class AppComponent {
    public senderPhoneNumber: string = '';
    public receiverPhoneNumber: string = '';

    private twilio: Twilio;

    constructor() {
      const callListener = {
          onConnectFailure: (call, error) => {
              dialogs.alert(`connection failure: ${error}`);
          },
          onConnected: (call) => {
              dialogs.alert("call connected");
          },
          onDisconnected: (call) => {
              dialogs.alert("disconnected");
          }
      };
      setupCallListener(callListener);
    }

    onCall(): void {
        getAccessToken()
            .then((token) => {
                console.log(`Twilio access token: ${token}`);

                this.twilio = new Twilio(token);

                let options = {};

                this.twilio.makeCall(this.senderPhoneNumber, this.receiverPhoneNumber, options);
            })
            .catch((error) => {
                console.error(error);
                dialogs.alert(error);
            });
    }
}
