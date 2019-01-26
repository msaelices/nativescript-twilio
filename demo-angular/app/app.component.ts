import { Component } from "@angular/core";
import * as dialogs from 'tns-core-modules/ui/dialogs';

import { getAccessToken, Twilio } from 'nativescript-twilio';

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {

    public accessTokenURL: string = '';
    public authorizationHeader: any = { 'Authorization': 'Some-Bearer-Token-Here' };

    public senderPhoneNumber: string = '';
    public receiverPhoneNumber: string = '';

    private twilio: Twilio;

    constructor() {}

    onCall(): void {
        getAccessToken(this.accessTokenURL, this.authorizationHeader)
            .then((token) => {
                console.log(`Twilio access token: ${token}`);

                this.twilio = new Twilio(token);
                const callListener = {
                    onConnectFailure: (call, error) => {
                        dialogs.alert(`connection failure: ${error}`);
                    },
                    onConnected: (call) => {
                        dialogs.alert(`call connected`);
                    },
                    onDisconnected: (call) => {
                        dialogs.alert('disconnected');
                    }
                };

                let options = {};

                this.twilio.makeCall(this.senderPhoneNumber, this.receiverPhoneNumber, callListener, options);
            })
            .catch((error) => {
                console.error(error);
                dialogs.alert(error);
            })
    }
}