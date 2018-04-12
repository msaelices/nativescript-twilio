import { Observable } from 'tns-core-modules/data/observable';
import * as Permissions from 'nativescript-permissions';
import { Twilio } from 'nativescript-twilio';

declare var android: any;

export class HelloWorldModel extends Observable {
  public message: string;
  private twilio: Twilio;

  constructor() {
    super();

    Permissions.requestPermission(android.Manifest.permission.RECORD_AUDIO, 'Needed for making calls').then(() => {
      console.log('Permission granted!');
      this.twilio = new Twilio();
      this.message = this.twilio.message;
    }).catch(() => {
      console.log('Permission is not granted :(');
    });
  }
}
