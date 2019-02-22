import * as common from "./twilio.common";
import { CallDelegate } from "./delegate";

declare var NSDictionary: any;
declare var NSError: any;

export const getAccessToken = common.getAccessToken;
export const initTwilio = common.initTwilio;
export const setupCallListener = common.setupCallListener;
export const setupPushListener = common.setupPushListener;

export function unregisterPushNotifications(token: string, deviceToken: string, callback?: (error: any) => void) {
  TwilioVoice.unregisterWithAccessTokenDeviceTokenCompletion(token, deviceToken, callback);
}

export class Call extends common.Call {
  private _call: TVOCall;

  constructor(twilioCall: TVOCall) {
    super();
    this._call = twilioCall;
  }

  public disconnect(): void {
    this._call.disconnect();
  }

  public mute(value: boolean): void {
    this._call.muted = value;
  }
}

export class Twilio extends common.Common {
  public makeCall(senderPhoneNumber, phoneNumber, options: any = {}): common.Call {
    const callDelegate = new CallDelegate();

    options.From = senderPhoneNumber;
    options.To = phoneNumber;
    const params = NSDictionary.dictionaryWithDictionary(options);

    const connectOptions = TVOConnectOptions.optionsWithAccessTokenBlock(
      this.accessToken, (builder) => {
        builder.params = params;
      });

    const twilioCall = TwilioVoice.connectWithOptionsDelegate(
      connectOptions,
      callDelegate
    );
    return new Call(twilioCall);
  }

  public toggleAudioOutput(toSpeaker: boolean): void {
    let audioSession = AVAudioSession.sharedInstance();

    try {
      let output = toSpeaker ?
        AVAudioSessionPortOverride.Speaker : AVAudioSessionPortOverride.None;
      audioSession.overrideOutputAudioPortError(output);
      console.debug(`audioSession output set with toSpeaker: ${toSpeaker}`);
    } catch (err) {
      console.error('Error setting audioSession output: ', err);
    }
  }
}
