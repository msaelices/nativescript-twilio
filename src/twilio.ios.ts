import * as common from "./twilio.common";
import { CallDelegate } from "./delegate";

declare var NSDictionary: any;
declare var NSError: any;
declare var TVOCallDelegate: any;
declare var TwilioVoice: any;

export const getAccessToken = common.getAccessToken;
export const initTwilio = common.initTwilio;
export const setupCallListener = common.setupCallListener;

export class Twilio extends common.Common {
  public makeCall(senderPhoneNumber, phoneNumber, options: any = {}): any {
    const callDelegate = new CallDelegate();

    options.From = senderPhoneNumber;
    options.To = phoneNumber;
    const params = NSDictionary.dictionaryWithDictionary(options);

    return TwilioVoice.callParamsDelegate(
      this.accessToken,
      params,
      callDelegate
    );
  }
}
