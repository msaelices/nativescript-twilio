import './bundle-config';
import * as application from 'tns-core-modules/application';
import { TwilioAppDelegate } from 'nativescript-twilio/delegate';

if (application.ios) {
  // register twilio app delegate in order to receive push notifications
  application.ios.delegate = TwilioAppDelegate;
}

application.start({ moduleName: 'main-page' });
