import * as common from './twilio.common';

declare var NSDictionary: any;
declare var NSError: any;
declare var TVOCallDelegate: any;
declare var TwilioVoice: any;

export const getAccessToken = common.getAccessToken;


class CallDelegate extends NSObject implements TVOCallDelegate {
  static ObjCProtocols = [TVOCallDelegate];
  listener: any;

  public static initWithListener(listener: any): CallDelegate {
    let callDelegate = new CallDelegate();
    callDelegate.listener = listener;

    return callDelegate;
  }

  callDidConnect(call: TVOCall) {
    console.log('callDidConnect');
    this.listener.onConnected(call);
  }

  callDidDisconnectWithError(call: TVOCall, error: NSError) {
    console.log('callDidDisconnectWithError');
    this.listener.onDisconnected(call);
  }

  callDidFailToConnectWithError(call: TVOCall, error: NSError) {
    console.log('callDidFailToConnectWithError');
    this.listener.onConnectFailure(call, error);
  }
}

export class Twilio extends common.Common {

  public makeCall(senderPhoneNumber, phoneNumber, callListener, options: any = {}): any {
    const callDelegate = CallDelegate.initWithListener(callListener);

    options.From = senderPhoneNumber;
    options.To = phoneNumber;
    const params = NSDictionary.dictionaryWithDictionary(options);

    return TwilioVoice.callParamsDelegate(this.accessToken, params, callDelegate);
  }
}
