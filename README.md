# NativeScript Twilio

`nativescript-twilio` is a plugin that exposes the [Twilio Voice SDK](https://www.twilio.com/docs/libraries), the leading platform for Voice solutions.

## (Optional) Prerequisites / Requirements

Note: For now it only works for Android, so it's required having an Android device.

* Having a Twilio account.
* Server with an URL endpoint that returns a JSON with an active [Access Token](https://www.twilio.com/docs/iam/access-tokens)


## Installation

Describe your plugin installation steps. Ideally it would be something like:

```javascript
tns plugin add nativescript-twilio
```

## Usage

### Demo App

If you want a quickstart, clone the repo, `cd src`, and `npm run demo.android`.

### Integrating into your NativeScript app

```javascript
  import { getAccessToken, Twilio } from 'nativescript-twilio';
  import * as dialogs from 'tns-core-modules/ui/dialogs';

  // The following endpoint should return a JSON like this:
  // {"token": "somevalidtwilioaccesstoken"}
  const accessTokenUrl = 'http://yourserver/path/to/access-token';
  const headers = {'Authorization': 'Token sometoken'};

  getAccessToken(accessTokenURL, headers)
    .then((token) => { // token is now a valid Twilio Access Token
      const twilio = new Twilio(token);

      const callListener = {
        onConnectFailure(call, error) {
          dialogs.alert(`connection failure: ${error}`);
        },
        onConnected (call) {
          dialogs.alert(`call connected`);
        },
        onDisconnected (call) {
          dialogs.alert('disconnected');
        }
      };

      this.twilio.makeCall(this.phoneNumber, callListener);
    })
```

## License

Apache License Version 2.0, April 2018
