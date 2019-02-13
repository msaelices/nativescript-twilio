import * as common from './twilio.common';

export function initTwilio(url: string, headers?: any);
export function getAccessToken(): Promise<string>;
export function setupCallListener(listener: any);
export let callListener: any;

export declare class Call extends common.Call {
  disconnect(): void;
  mute(value: boolean): void;
}

export declare class Twilio extends common.Common {
  constructor(accessToken: string);
  makeCall(senderPhoneNumber: any, phoneNumber: any, callListener: any, options?: any): Call;
  toggleAudioOutput(toSpeaker: boolean): void;
}
