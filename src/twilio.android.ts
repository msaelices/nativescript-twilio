import * as common from './twilio.common';
import * as app from 'tns-core-modules/application';

declare var com: any;
declare var java: any;

export const getAccessToken = common.getAccessToken;

export class Twilio extends common.Common {

  constructor(accessToken: string) {
    super(accessToken);
  }

  public makeCall(phoneNumber, callListener, options: any = {}): any {
    let optionsMap = new java.util.HashMap();

    optionsMap.put(new java.lang.String('To'), phoneNumber);

    Object.keys(options).forEach((key) => {
      optionsMap.put(new java.lang.String(key), options[key]);
    })

    const listener = new com.twilio.voice.Call.Listener(callListener)

    // TODO: instead of returning an Android Call class, declare a non-platform
    // specific class that wraps both iOS and Android
    return com.twilio.voice.Voice.call(
      app.android.context,
      this.accessToken,
      optionsMap,
      listener
    );
  }
}
