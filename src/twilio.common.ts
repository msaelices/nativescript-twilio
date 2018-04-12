import { Observable } from 'tns-core-modules/data/observable';
import * as app from 'tns-core-modules/application';
import * as dialogs from 'tns-core-modules/ui/dialogs';


export class Common extends Observable {
  public message: string;

  constructor() {
    super();
    this.message = Utils.SUCCESS_MSG();

    const callListener = new com.twilio.voice.Call.Listener({
      onConnectFailure(call, error) {
        console.log('connect failure')
      },
      onConnected (call) {
        console.log('connected')
      },
      onDisconnected (call) {
        console.log('disconnected')
      }
    })
    // TODO: get from plugin params
    const accessToken = 'PUTANACCESSTOKENHERE';
    const phoneNumber = '+34606039750'

    let params = new java.util.HashMap();
    params.put('To', phoneNumber);

    // make a test outbound call
    // TODO: put this in a plugin method
    const call = com.twilio.voice.Voice.call(
      app.android.context,
      accessToken,
      params,
      callListener
    );
  }

  public greet() {
    return "Hello, NS";
  }
}

export class Utils {
  public static SUCCESS_MSG(): string {
    let msg = `Your plugin is working on ${app.android ? 'Android' : 'iOS'}.`;

    setTimeout(() => {
      dialogs.alert(`${msg} For real. It's really working :)`).then(() => console.log(`Dialog closed.`));
    }, 2000);

    return msg;
  }
}
