import { Common } from './twilio.common';
import * as app from 'tns-core-modules/application';

declare var com: any;

export class Twilio extends Common {

  constructor(accessToken: string) {
    super(accessToken);
  }

  public makeCall(phoneNumber, callListener, options: any = {}): any {
    let optionsMap = new java.util.HashMap();

    optionsMap.put('To', phoneNumber);

    Object.keys(options).forEach((key) => {
      optionsMap.put(key, options[key]);
    })

    const listener = new com.twilio.voice.Call.Listener(callListener)

    // TODO: instead of returning an Android Call class, declare a non-platform
    // specific class which wrapps iOS and Android
    return com.twilio.voice.Voice.call(
      app.android.context,
      this.accessToken,
      optionsMap,
      listener
    );
  }
}
