import { Common } from './twilio.common';

export function initTwilio(url: string, headers?: any);
export function getAccessToken(): Promise<string>;
export function setupCallListener(listener: any);
export let callListener: any;

export declare class Twilio extends Common {
  constructor(accessToken: string);
  makeCall(senderPhoneNumber: any, phoneNumber: any, callListener: any, options?: any): any;
}
