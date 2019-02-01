import * as common from './twilio.common';
import { ad as utilsAd } from 'tns-core-modules/utils/utils';

declare var com: any;
declare var java: any;

const context = utilsAd.getApplicationContext();

export const getAccessToken = common.getAccessToken;
export const initTwilio = common.initTwilio;
export const setupCallListener = common.setupCallListener;

export class Twilio extends common.Common {

  constructor(accessToken: string) {
    super(accessToken);
  }

  public makeCall(senderPhoneNumber, phoneNumber, options: any = {}): any {
    let optionsMap = new java.util.HashMap();

    optionsMap.put('From', senderPhoneNumber);
    optionsMap.put('CallerId', senderPhoneNumber);
    optionsMap.put('To', phoneNumber);

    Object.keys(options).forEach((key) => {
      optionsMap.put(key, options[key]);
    })

    const listener = new com.twilio.voice.Call.Listener(common.callListener)

    return com.twilio.voice.Voice.call(
      context,
      this.accessToken,
      optionsMap,
      listener
    );
  }
}
