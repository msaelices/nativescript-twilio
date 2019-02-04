
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import * as application from "tns-core-modules/application";
import { AppModule } from "./app.module";

import { initTwilio } from "nativescript-twilio";
import { TwilioAppDelegate } from "nativescript-twilio/delegate";

// Please fill these values
const accessTokenURL: string = "";
const authorizationHeader: any = {
  // 'Authorization': 'Token sometoken',
};

// Init Twilio
initTwilio(accessTokenURL, authorizationHeader);

if (application.ios) {
  // register twilio app delegate in order to receive incoming calls
  application.ios.delegate = TwilioAppDelegate;
}

platformNativeScriptDynamic({ createFrameOnBootstrap: true }).bootstrapModule(AppModule);