import * as common from './twilio.common';
import { ad as utilsAd } from 'tns-core-modules/utils/utils';

declare var java: any;

const context = utilsAd.getApplicationContext();

export const getAccessToken = common.getAccessToken;
export const initTwilio = common.initTwilio;
export const setupCallListener = common.setupCallListener;
export const setupPushListener = common.setupPushListener;

export function unregisterPushNotifications(token: string, deviceToken: string, callback?: (error: any) => void) {
  console.warn('Not implemented yet');
}

export class Call extends common.Call {
  private _call: com.twilio.voice.Call;

  constructor(twilioCall: com.twilio.voice.Call) {
    super();
    this._call = twilioCall;
  }

  public disconnect(): void {
    this._call.disconnect();
  }

  public mute(value: boolean): void {
    this._call.mute(value);
  }
}

export class Twilio extends common.Common {

  constructor(accessToken: string) {
    super(accessToken);
  }

  public makeCall(senderPhoneNumber, phoneNumber, options: any = {}): common.Call {
    let optionsMap = new java.util.HashMap();

    optionsMap.put('From', senderPhoneNumber);
    optionsMap.put('CallerId', senderPhoneNumber);
    optionsMap.put('To', phoneNumber);

    Object.keys(options).forEach((key) => {
      optionsMap.put(key, options[key]);
    });

    const listener = new com.twilio.voice.Call.Listener(common.callListener);

    const twilioCall = com.twilio.voice.Voice.call(
      context,
      this.accessToken,
      optionsMap,
      listener
    );

    return new Call(twilioCall);
  }

  public toggleAudioOutput(toSpeaker: boolean): void {
    console.log('Not implemented yet');
  }
}
