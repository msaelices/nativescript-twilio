# NativeScript Twilio

`nativescript-twilio` is a plugin that exposes the [Twilio Voice SDK](https://www.twilio.com/docs/libraries), the leading platform for Voice solutions.

Note: For now it only for making outbound calls, both for Android and iOS

## Prerequisites / Requirements

* Having a Twilio account, with API Keys and a TwiML app configured.
* Server with an URL endpoint that returns a JSON with an active [Access Token](https://www.twilio.com/docs/iam/access-tokens). You can setup your own server by downloading one of these:

  * [voice-quickstart-server-java](https://github.com/twilio/voice-quickstart-server-java)
  * [voice-quickstart-server-node](https://github.com/twilio/voice-quickstart-server-node)
  * [voice-quickstart-server-php](https://github.com/twilio/voice-quickstart-server-php)
  * [voice-quickstart-server-python](https://github.com/twilio/voice-quickstart-server-python)

## Plugin installation on your Nativescript app

```javascript
tns plugin add nativescript-twilio
```

## Usage

### Demo App

#### Setup

* If you want to avoid filling the input fields with the right values (backend endpoint URL, caller phone, etc) you can edit the `demo/app/main_view_model.ts` file and set the `accessTokenUrl`, `authorizationHeader`, `senderPhoneNumber` and `phoneNumber` variables.

* In order to receive incoming calls, you will need to setup Push Notifications on Android and Apple's VoIP services on iOS. So, depending on your platform, you would need:

  * On Android (**Note: not implemented yet**):

    1. [Generate `google-services.json`](https://github.com/twilio/voice-quickstart-android/blob/master/README.md#7-generate-google-servicesjson)
    2. [Add a Push Credential using your FCM Server API Key](https://github.com/twilio/voice-quickstart-android/blob/master/README.md#8-add-a-push-credential-using-your-fcm-server-api-key)
    3. [Configure the server to receive a push notification](https://github.com/twilio/voice-quickstart-android/blob/master/README.md#9-receiving-an-incoming-notification).

  * On iOS:

    1. [Create VoIP Service Certificate](https://github.com/twilio/voice-quickstart-swift#7-create-voip-service-certificate), with the application ID `org.nativescript.demotwilio`. Don't forget to configure Push Notifications after create the App by editing it in the Apple Provisioning Portal.
    2. [Create a Push Credential with your VoIP Service Certificate](https://github.com/twilio/voice-quickstart-swift#8-create-a-push-credential-with-your-voip-service-certificate)
    3. [Configure Xcode project settings for push notifications](https://github.com/twilio/voice-quickstart-swift#9-configure-xcode-project-settings-for-push-notifications)
    4. Receive an incoming call


#### Running the Demo app

* Clone the repo, `cd src`, and `npm run demo.android` or `npm run demo.ios`.

### Integrating into your NativeScript app

* On the `main.ts` or `app.ts` file, put this code in order to init Twilio:

```javascript

  import * as application from 'tns-core-modules/application';
  import { initTwilio } from 'nativescript-twilio';
  import { TwilioAppDelegate } from 'nativescript-twilio/delegate';

  // The following endpoint should return the raw token in the request body
  const accessTokenUrl = 'http://yourserver/path/to/access-token';
  const accessTokenHeaders = {'Authorization': 'Token sometoken'};

  initTwilio(accessTokenUrl, accessTokenHeaders);

  if (application.ios) {
    // register twilio app delegate in order to receive incoming calls
    application.ios.delegate = TwilioAppDelegate;
  }
```

* In some place in your code (i.e. in some UI component `loaded` event) you need to setUp the call listener, which will handle the call's connection events:

```javascript
  import { setupCallListener, setupPushListener } from 'nativescript-twilio';

  // listener for inbound/outbound calls
  const callListener = {
    onConnectFailure(call, error) {
      dialogs.alert(`connection failure: ${error}`);
    },
    onConnected (call) {
      dialogs.alert('call connected');
    },
    onDisconnected (call) {
      dialogs.alert('disconnected');
    }
  };

  setupCallListener(callListener);

  // listener for push notifications (incoming calls)
  const pushListener = {
    onPushRegistered(accessToken, deviceToken) {
      dialogs.alert('push registration succeded');
    },
    onPushRegisterFailure (error) {
      dialogs.alert(`push registration failed: ${error}`);
    }
  };

  setupPushListener(pushListener);
```

* On the component for making outbound calls, put the following code:

```javascript

  import * as dialogs from 'tns-core-modules/ui/dialogs';
  import { getAccessToken, Twilio } from 'nativescript-twilio';

  const phoneNumber = '+1555365432';

  getAccessToken() // it will use the Twilio configuration set before
    .then((token) => {
      const twilio = new Twilio(token);

      const call = twilio.makeCall(phoneNumber);

      // example of muting the call after 10 seconds
      setTimeout(() => {
        console.log('Muting call after 10 seconds...');
        call.mute(true);
      }, 10000);

      // example of disconnecting the call after 30 seconds
      setTimeout(() => {
        console.log('Disconnecting call after 30 seconds...');
        call.disconnect();
      }, 30000);

    })
```

## API

### Functions

| Function                                 | Description                                                   |
| ---------------------------------------- | -------------------------------------------------------- |
| `initTwilio(url: string, headers?: any)` | Initialize Twilio passing the endpoint to the access token backend |
| `getAccessToken(): Promise<string>`      | Ask the backend for an access token. Returns a Promise with the token retrieved |
| `setupCallListener(listener: any)`       | Setup the call listener, passing an object with `onConnectFailure`, `onConnected` and `onDisconnected` callbacks |
| `setupPushListener(listener: any)`       | Setup the push notifications listener, passing an object with `onPushRegistered` and `onPushRegisterFailure` callbacks |
| `unregisterPushNotifications(token: string, deviceToken: string, callback?: (error: any) => void)` | Unregister push notifications (incoming calls) |

### Twilio Methods

| Method                          | Description                                                   |
| ------------------------------- | ------------------------------------------------------------- |
| `makeCall(senderPhoneNumber: any, phoneNumber: any, options?: any): Call` | Make an outbound call. |
| `toggleAudioOutput(toSpeaker: boolean)` | _iOS Only_ Set the audio session output to the speaker or not. |

### Call Methods

| Method                          | Description                                                  |
| ------------------------------- | ------------------------------------------------------------ |
| `mute(value: boolean)`          | Mute the call.                                               |
| `disconnect()`                  | Hang-up the call.                                            |

## License

Apache License Version 2.0, April 2018
