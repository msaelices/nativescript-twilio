import { Observable } from 'tns-core-modules/data/observable';
import * as app from 'tns-core-modules/application';

export abstract class Common extends Observable {
  public accessToken: string;

  constructor(accessToken: string) {
    super();

    this.accessToken = accessToken;
  }

  public abstract makeCall(phoneNumber, callListener, options): any;
}
