import { Common } from './twilio.common';

export function getAccessToken(url: string, headers?: any): Promise<string>;

export declare class Twilio extends Common {
  constructor(accessToken: string);
  makeCall(phoneNumber: any, callListener: any, options?: any): any;
}
