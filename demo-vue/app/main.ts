import Vue from 'nativescript-vue';
import * as application from 'tns-core-modules/application';
import App from './components/App.vue';
import { initTwilio } from "nativescript-twilio";
import { TwilioAppDelegate } from "nativescript-twilio/delegate";

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = true; // TNS_ENV === 'production';

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

new Vue({
  render: h => h('frame', [h(App)])
}).$start();



