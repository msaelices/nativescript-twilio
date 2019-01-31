import { Observable } from 'tns-core-modules/data/observable';
import { fetch } from 'tns-core-modules/fetch';

let accessTokenUrl:string = undefined;
let accessTokenHeaders: any = {};

export function setupAccessTokenBackend(url:string, headers: any = {}) {
  accessTokenUrl = url;
  accessTokenHeaders = headers;
  TwilioVoice.logLevel = TVOLogLevel.Verbose;
}

export function getAccessToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(accessTokenUrl, {headers: accessTokenHeaders})
      .then((response) => {
        if (response.ok) {
          return response.text()
        } else {
          reject(new Error(`Response with status code: ${response.status}`))
        }
      })
      .then((data) => {
        resolve(data);
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
