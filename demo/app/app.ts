import './bundle-config';
import * as application from 'tns-core-modules/application';
import { initTwilio } from 'nativescript-twilio';
import { TwilioAppDelegate } from 'nativescript-twilio/delegate';

// Please fill these values
const accessTokenUrl = '';
const accessTokenHeaders = {
  // 'Authorization': 'Token sometoken',
};

initTwilio(accessTokenUrl, accessTokenHeaders);


if (application.ios) {
  // register twilio app delegate in order to receive push notifications
  application.ios.delegate = TwilioAppDelegate;
}

application.start({ moduleName: 'main-page' });
