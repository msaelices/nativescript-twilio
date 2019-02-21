import * as common from './twilio.common';

export function initTwilio(url: string, headers?: any);
export function getAccessToken(): Promise<string>;
export function setupCallListener(listener: any);
export function setupPushListener(listener: any);
export function unregisterPushNotifications(token: string, deviceToken: string, callback?: (error: any) => void);
export function callIt(listener: object, method: string, ...args);

export let callListener: any;
export let pushListener: any;

export declare class Call extends common.Call {
  disconnect(): void;
  mute(value: boolean): void;
}

export declare class Twilio extends common.Common {
  constructor(accessToken: string);
  makeCall(senderPhoneNumber: any, phoneNumber: any, options?: any): Call;
  toggleAudioOutput(toSpeaker: boolean): void;
}
