import { Injectable, Output, EventEmitter, NgZone } from "@angular/core";
import { getAccessToken, setupCallListener, setupPushListener, Twilio } from "nativescript-twilio";

@Injectable({
    providedIn: "root"
})
export class DataService {
  @Output() callEvent: EventEmitter<any> = new EventEmitter();
  @Output() disconnectedEvent: EventEmitter<any> = new EventEmitter();
  @Output() callError: EventEmitter<any> = new EventEmitter();
  storage: any;
  initialized: boolean = false;
  constructor(
      private ngZone: NgZone
  ) {
    this.storage = {
      store: "local"
    };
  }

  initializeTwilioListeners(): void {
    console.log("initializing twilio listeners...");
    if (! this.initialized) {
        this.ngZone.runOutsideAngular(() => {

            this.setupPushListener();
            this.setupCallListener();
            this.initialized = true;
            console.log("initialized twilio listeners outside of angular");
        })
    } else {
        console.log("Already initialized");
    }
  }

  private setupCallListener(): void {
    const call = {
      onConnectFailure: (call, error): void => {
        console.log(`connection failure: ${error}`);
      },
      onConnected: (call): void => {
        console.log("Call Connected: ", call);

        // this.ngZone.run(() => {
            this.callEvent.emit(call);
        // })

      },
      onDisconnected: (call): void => {
        console.log("Call disconnecting...");
        this.disconnectedEvent.emit(call);
        // if (this.storage.inboundCall === true) {
        //   console.log("CALL DISCONNECTED");
        //   this.storage.inboundCall = false;
        //   this.storage.activeCall = false;
        //   try {
        //     call.disconnect();
        //   } catch (e) {
        //     console.log("Error when disconnecting the call:", e);
        //   }
        //   console.log("Disconnected call.");
        //   return;
        // }
      }
    };

    setupCallListener(call);
  }

  private setupPushListener(): void {
    let listener = {
      onPushRegistered: (accessToken, deviceToken): void => {
        console.log("onPushRegisteredx", {
          accessToken: accessToken,
          deviceToken: deviceToken
        });
      },
      onPushRegisterFailure: (error): void => {
        console.log("onPushRegisterFailurex", error);
      },
      onIncomingCall: (customParameters): object => {
        console.log("Incomming call detected, setting audio session");
        // TVODefaultAudioDevice.audioDevice().enabled = true;
        const session = AVAudioSession.sharedInstance();
        session.setCategoryError(AVAudioSessionCategoryPlayAndRecord);
        session.setActiveWithOptionsError(
          true,
          AVAudioSessionSetActiveOptions.NotifyOthersOnDeactivation
        );
        return {
          from: customParameters.subscriber_name
        };
      },
      onAcceptCall: (customParameters): void => {
        this.storage.inboundCall = true;
        this.storage.customParameters = customParameters;
      }
    };

    setupPushListener(listener);
  }


}