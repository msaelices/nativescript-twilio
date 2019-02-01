import './bundle-config';
import * as application from 'tns-core-modules/application';
import { initTwilio } from 'nativescript-twilio';
import { TwilioAppDelegate } from 'nativescript-twilio/delegate';

// Please fill these values
const ACCESS_TOKEN_URL = 'https://lin.ngrok.io/accessToken';
const ACCESS_TOKEN_HEADERS = {
  // 'Authorization': 'Token sometoken',
};

initTwilio(ACCESS_TOKEN_URL, ACCESS_TOKEN_HEADERS);

if (application.ios) {
  // register twilio app delegate in order to receive push notifications
  application.ios.delegate = TwilioAppDelegate;
}

application.start({ moduleName: 'main-page' });
