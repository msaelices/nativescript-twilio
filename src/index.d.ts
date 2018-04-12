import { Common } from './twilio.common';
export declare class Twilio extends Common {
  constructor(accessToken: string);
  makeCall(phoneNumber: any, callListener: any, options?: any): any;
}
