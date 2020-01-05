import { Component, OnInit, NgZone } from "@angular/core";
import * as dialogs from 'tns-core-modules/ui/dialogs';

import { getAccessToken, setupCallListener, Twilio } from 'nativescript-twilio';
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "my-app",
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit{
    public senderPhoneNumber: string = '+14175224402';
    public receiverPhoneNumber: string = '+14176932641';

    private twilio: Twilio;

    constructor(private router: RouterExtensions, private zone: NgZone) {
        const callListener = {
            onConnectFailure: (call, error) => {
                dialogs.alert(`connection failure: ${error}`);
            },
            onConnected: (call) => {
                dialogs.alert("call connected");
                this.zone.run(() => {
                    this.router.navigate(["/call"], {
                        transition: { name: "fade", curve: "linear" },
                    });
                });
            },
            onDisconnected: (call) => {
                dialogs.alert("disconnected");
            }
        };
        setupCallListener(callListener);
    }

    ngOnInit(): void {


    }

    onCall(): void {
        console.log('STARTING ONCALL()')
        getAccessToken()
            .then((token) => {
                console.log(`Twilio access token: ${token}`);

                this.twilio = new Twilio(token);

                let options = {};

                let call = this.twilio.makeCall(this.senderPhoneNumber, this.receiverPhoneNumber, options);
            })
            .catch((error) => {
                console.error(error);
                dialogs.alert(error);
            });
    }
}
