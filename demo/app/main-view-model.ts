import { Observable } from 'tns-core-modules/data/observable';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import { isAndroid } from 'tns-core-modules/platform';
import { device } from "tns-core-modules/platform";
import * as Permissions from 'nativescript-permissions';
import { getAccessToken, Twilio , unregisterPushNotifications} from 'nativescript-twilio';

declare var android: any;

export class HelloWorldModel extends Observable {
  public message: string;
  public senderPhoneNumber: string = '+14175224402'; // Assign the default phone number from where the call will originate, or the client that it originates from i.e. client:alice
  public phoneNumber: string = '+14176932641'; // Assign the default receiving phone number or client i.e. +12345678
  public option1: any = {
    key: '',
    value: '',
  };
  public option2: any = {
    key: '',
    value: '',
  };
  private twilio: Twilio;

  constructor() {
    super();

    if (isAndroid) {
      Permissions.requestPermission(android.Manifest.permission.RECORD_AUDIO, 'Needed for making calls').then(() => {
        console.log('Permission granted!');
      }).catch(() => {
        console.log('Permission is not granted :(');
      });
    }
  }

  public onCall(): void {
    getAccessToken()
      .then((token) => {
        console.log(`Twilio access token: ${token}`);

        this.twilio = new Twilio(token);

        let options = {};
        if (this.option1.key) {
          options[this.option1.key] = this.option1.value;
        }
        if (this.option2.key) {
          options[this.option2.key] = this.option2.value;
        }

        console.log('Calling to ', this.phoneNumber);
        let call = this.twilio.makeCall(this.senderPhoneNumber, this.phoneNumber, options);
      })
    .catch((error) => {
      console.error(error);
      dialogs.alert(error);
    });
  }
}
