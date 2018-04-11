import { Observable } from 'tns-core-modules/data/observable';
import { Twilio } from 'nativescript-twilio';

export class HelloWorldModel extends Observable {
  public message: string;
  private twilio: Twilio;

  constructor() {
    super();

    this.twilio = new Twilio();
    this.message = this.twilio.message;
  }
}
