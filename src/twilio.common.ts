import { Observable } from 'tns-core-modules/data/observable';
import * as app from 'tns-core-modules/application';
import { fetch } from 'tns-core-modules/fetch';

export function getAccessToken(url:string, headers: any = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(url, {headers})
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          reject(new Error(`Response with status code: ${response.status}`))
        }
      })
      .then((data) => {
        resolve(data.token);
      })
      .catch((error) => {
        reject(error);
      })
  });
}

export abstract class Common extends Observable {
  public accessToken: string;

  constructor(accessToken: string) {
    super();

    this.accessToken = accessToken;
  }

  public abstract makeCall(senderPhoneNumber, phoneNumber, callListener, options): any;
}
