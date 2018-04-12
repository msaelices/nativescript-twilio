import { Observable } from 'tns-core-modules/data/observable';
import * as dialogs from 'tns-core-modules/ui/dialogs';

import * as Permissions from 'nativescript-permissions';
import { Twilio } from 'nativescript-twilio';

declare var android: any;

export class HelloWorldModel extends Observable {
  public message: string;
  public accessToken: string = '';
  public phoneNumber: string = '';
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

    Permissions.requestPermission(android.Manifest.permission.RECORD_AUDIO, 'Needed for making calls').then(() => {
      console.log('Permission granted!');
    }).catch(() => {
      console.log('Permission is not granted :(');
    });
  }

  public onCall(): void {
    console.log('Calling to ', this.phoneNumber);
    console.log('Access token:', this.accessToken);
    this.twilio = new Twilio(this.accessToken);
    const callListener = {
      onConnectFailure(call, error) {
        dialogs.alert(`connection failure: ${error}`)
      },
      onConnected (call) {
        dialogs.alert(`call connected`)
      },
      onDisconnected (call) {
        dialogs.alert('disconnected')
      }
    };

    let options = {};

    if (this.option1.key) {
      options[this.option1.key] = this.option1.value
    }
    if (this.option2.key) {
      options[this.option2.key] = this.option2.value
    }

    console.dir(options)
    this.twilio.makeCall(this.phoneNumber, callListener, options);
  }
}
