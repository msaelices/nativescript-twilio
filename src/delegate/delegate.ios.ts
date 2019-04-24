import * as common from '../twilio.common';

import { ios as iosUtils } from 'tns-core-modules/utils/utils';

export class CallDelegate extends NSObject implements TVOCallDelegate {
  static ObjCProtocols = [TVOCallDelegate];

  callDidConnect(call: TVOCall) {
    console.error("callDidConnect");
    common.callIt(common.callListener, 'onConnected', call);
  }

  callDidDisconnectWithError(call: TVOCall, error: NSError) {
    if (!error) {
      console.error("callDidDisconnect");
    } else {
      console.error("callDidDisconnectWithError", error);
    }
    common.callIt(common.callListener, 'onDisconnected', call);
  }

  callDidFailToConnectWithError(call: TVOCall, error: NSError) {
    console.debug("callDidFailToConnectWithError", error);
    common.callIt(common.callListener, 'onConnectFailure', call, error);
  }
}

export class TwilioAppDelegate extends UIResponder
  implements UIApplicationDelegate, PKPushRegistryDelegate, TVONotificationDelegate, CXProviderDelegate {
  public static ObjCProtocols = [UIApplicationDelegate, PKPushRegistryDelegate, TVONotificationDelegate, CXProviderDelegate];

  callInvite: TVOCallInvite;
  call: TVOCall;
  callKitProvider: CXProvider;
  callKitCallController: CXCallController;
  deviceTokenString: string;
  incomingPushCompletionCallback: () => void;
  callKitCompletionCallback: () => void;
  audioDevice: TVODefaultAudioDevice;

  applicationDidFinishLaunchingWithOptions(
    application: UIApplication,
    launchOptions
  ): boolean {
    console.debug("applicationWillFinishLaunchingWithOptions: ", this);

    // this should be done before performing any other actions with the SDK
    // (such as connecting a Call, or accepting an incoming Call)
    this.audioDevice = TVODefaultAudioDevice.audioDevice();
    TwilioVoice.audioDevice = this.audioDevice;

    let center = UNUserNotificationCenter.currentNotificationCenter();

    center.requestAuthorizationWithOptionsCompletionHandler(
      UNAuthorizationOptions.Alert |
        UNAuthorizationOptions.Sound |
        UNAuthorizationOptions.Badge,
      (granted, error) => {
        console.debug(
          `requestAuthorizationWithOptionsCompletionHandler: ${granted}`
        );
        console.debug(error);
      }
    );
    application.registerForRemoteNotifications();
    console.debug(PKPushTypeVoIP);

    // register push kip
    let voipRegistry = PKPushRegistry.alloc().initWithQueue(null);
    voipRegistry.delegate = this;
    voipRegistry.desiredPushTypes = NSSet.setWithObject(PKPushTypeVoIP);

    let mainBundle = iosUtils.getter(NSBundle, NSBundle.mainBundle);
    let appName = mainBundle.infoDictionary.objectForKey('CFBundleDisplayName');

    let configuration = CXProviderConfiguration.alloc().initWithLocalizedName(appName);
    configuration.maximumCallGroups = 1;
    configuration.maximumCallsPerCallGroup = 1;

    this.callKitProvider = CXProvider.alloc().initWithConfiguration(configuration);
    this.callKitCallController = CXCallController.alloc().init();
    this.callKitProvider.setDelegateQueue(this, null);

    return true;
  }

  applicationDidBecomeActive(application: UIApplication): void {
    console.debug(`applicationDidBecomeActive:  ${application}`);

    console.debug("is registered", application.registeredForRemoteNotifications);
  }

  applicationDidRegisterForRemoteNotificationsWithDeviceToken(
    application: UIApplication,
    deviceToken: NSData
  ) {
    let token = deviceToken.toString().replace(/[<\s>]/g, "");
    console.debug(`applicationDidRegisterForRemoteNotificationsWithDeviceToken with device token ${token}`);
  }

  applicationDidFailToRegisterForRemoteNotificationsWithError(
    application: UIApplication,
    error: NSError
  ) {
    console.error("failed to register push ", error);
    common.callIt(common.pushListener, 'onPushRegisterFailure', error);
  }

  applicationDidReceiveRemoteNotification(
    application: UIApplication,
    userInfo: NSDictionary<any, any>
  ) {
    console.debug(
      "applicationDidReceiveRemoteNotification:" + JSON.stringify(userInfo)
    );
  }

  applicationDidReceiveRemoteNotificationFetchCompletionHandler(
    application: UIApplication,
    userInfo: NSDictionary<any, any>,
    completionHandler: any
  ) {
    console.debug(
      "applicationDidReceiveRemoteNotificationFetchCompletionHandler:" +
        JSON.stringify(userInfo)
    );

    completionHandler(UIBackgroundFetchResult.NewData);
  }

  applicationDidEnterBackground(application: UIApplication) {
    console.debug("APP_ENTER_IN_BACKGROUND");
  }
  applicationWillEnterForeground(application: UIApplication) {
    console.debug("APP_ENTER_IN_FOREGROUND");
  }

  applicationWillTerminate(application: UIApplication) {}

  pushRegistryDidInvalidatePushTokenForType(
    registry: PKPushRegistry,
    type: string
  ) {
    console.error("PUSHKIT : INVALID_PUSHKIT_TOKEN");
  }

  pushRegistryDidReceiveIncomingPushWithPayloadForType(
    registry: PKPushRegistry,
    payload: PKPushPayload,
    type: string
  ) {
    let application = UIApplication.sharedApplication;

    console.debug(
      "PUSHKIT : INCOMING VOIP NOTIFICATION :",
      payload.dictionaryPayload.description
    );
  }

  pushRegistryDidReceiveIncomingPushWithPayloadForTypeWithCompletionHandler(
    registry: PKPushRegistry,
    payload: PKPushPayload,
    type: string,
    completion: () => void
  ) {
    let application = UIApplication.sharedApplication;

    console.debug(
      "PUSHKIT : INCOMING VOIP NOTIFICATION WITH COMPLETION:",
      payload.dictionaryPayload.description
    );

    // Save for later when the notification is properly handled.
    this.incomingPushCompletionCallback = completion;

    if (type === PKPushTypeVoIP) {
      TwilioVoice.handleNotificationDelegate(payload.dictionaryPayload, this);
    }
  }

  pushRegistryDidUpdatePushCredentialsForType(
    registry: PKPushRegistry,
    pushCredentials: PKPushCredentials,
    type: string
  ) {
    console.debug(`PUSHKIT : VOIP_TOKEN : ${type}`);

    if (type !== PKPushTypeVoIP) {
        return;
    }

    common.getAccessToken()
      .then((accessToken) => {
        let deviceToken = (pushCredentials.token as NSData).description;

        const callback = (error) => {
          if (error) {
            console.error('An error occurred while registering:', error.localizedDescription);
            common.callIt(common.pushListener, 'onPushRegisterFailure', error);
          }
          else {
            console.debug(`Successfully registered for VoIP push notifications with deviceToken ${deviceToken}`);
            common.callIt(common.pushListener, 'onPushRegistered', accessToken, deviceToken);
          }
        };

        TwilioVoice.registerWithAccessTokenDeviceTokenCompletion(accessToken, deviceToken, callback);

        this.deviceTokenString = deviceToken;
      })
      .catch((error) => {
        console.error('Error getting access token:', error);
        return;
      });
  }

  // TVONotificationDelegate interface implementation
  callInviteReceived(callInvite: TVOCallInvite) {
    console.debug("callInviteReceived");
    this.handleCallInviteReceived(callInvite);
  }

  cancelledCallInviteReceived(cancelledCallInvite: TVOCancelledCallInvite) {
    console.debug("cancelledCallInviteReceived");
    this.handleCallInviteCanceled(cancelledCallInvite);
  }

  notificationError(error: NSError) {
    console.error("notificationError: ", error.localizedDescription);
  }
  // End of TVONotificationDelegate interface implementation

  handleCallInviteReceived(callInvite: TVOCallInvite) {
    console.debug("handleCallInviteReceived");

    if (this.call) {
        console.debug("Already an active call.");
        console.debug("  >> Ignoring call from %@", callInvite.from);
        this.incomingPushHandled();
        return;
    }

    this.callInvite = callInvite;

    this.reportIncomingCall(callInvite.from, callInvite.uuid);
  }

  handleCallInviteCanceled(callInviteCanceled: TVOCancelledCallInvite) {
    console.debug("handleCallInviteCanceled");
    // performEndCallAction(callInvite.uuid);
    this.callInvite = null;
    this.incomingPushHandled();
  }

  incomingPushHandled() {
      if (this.incomingPushCompletionCallback) {
          this.incomingPushCompletionCallback();
          this.incomingPushCompletionCallback = null;
      }
  }

  reportIncomingCall(from: String, uuid: any) {
    let callHandle = new CXHandle({
      type: CXHandleType.Generic,
      value: from.toString(),
    });

    let callUpdate = new CXCallUpdate();

    callUpdate.remoteHandle = callHandle;
    callUpdate.supportsDTMF = true;
    callUpdate.supportsHolding = true;
    callUpdate.supportsGrouping = false;
    callUpdate.supportsUngrouping = false;
    callUpdate.hasVideo = false;

    let callback = (error: NSError) => {
      if (error) {
          console.error(`Failed to report incoming call successfully: ${error.localizedDescription}`);
          return;
      }
      TwilioVoice.logLevel = TVOLogLevel.All;
      console.debug("Incoming call successfully reported.");
    };

    this.callKitProvider.reportNewIncomingCallWithUUIDUpdateCompletion(uuid, callUpdate, callback);
  }

  // CXProviderDelegate interface implementation
  providerDidReset(provider: CXProvider) {
    console.debug('providerDidReset');
    this.audioDevice.enabled = true;
  }

  providerDidActivateAudioSession(provider: CXProvider, audioSession: AVAudioSession) {
    console.debug('providerDidActivateAudioSession');
    this.audioDevice.enabled = true;
  }

  providerDidBegin(provider: CXProvider) {
    console.debug('providerDidBegin');
  }

  providerDidDeactivateAudioSession(provider: CXProvider, audioSession: AVAudioSession) {
    console.debug('providerDidDeactivateAudioSession');
  }

  providerExecuteTransaction(provider: CXProvider, transaction: CXTransaction) {
    console.debug('providerExecuteTransaction');
    return false;
  }

  providerPerformAnswerCallAction(provider: CXProvider, action: CXAnswerCallAction) {
    console.debug('providerPerformAnswerCallAction');

    this.audioDevice.enabled = false;
    this.audioDevice.block();

    const callback = (success) => {
        if (success) {
            action.fulfill();
        } else {
            action.fail();
        }
    };

    this.performAnswerVoiceCall(action.callUUID, callback);

    action.fulfill();
  }

  providerPerformEndCallAction(provider: CXProvider, action: CXEndCallAction) {
    console.debug('providerPerformEndCallAction');
  }

  providerPerformPlayDTMFCallAction(provider: CXProvider, action: CXPlayDTMFCallAction) {
    console.debug('providerPerformPlayDTMFCallAction');
  }

  providerPerformSetGroupCallAction(provider: CXProvider, action: CXSetGroupCallAction) {
    console.debug('providerPerformSetGroupCallAction');
  }

  providerPerformSetHeldCallAction(provider: CXProvider, action: CXSetHeldCallAction) {
    console.debug('providerPerformSetHeldCallAction');
  }

  providerPerformSetMutedCallAction(provider: CXProvider, action: CXSetMutedCallAction) {
    console.debug('providerPerformSetMutedCallAction');
  }

  providerPerformStartCallAction(provider: CXProvider, action: CXStartCallAction) {
    console.debug('providerPerformStartCallAction');

  }

  providerTimedOutPerformingAction(provider: CXProvider, action: CXAction) {
    console.debug('providerTimedOutPerformingAction');
  }
  // End of CXProviderDelegate interface implementation

  performAnswerVoiceCall(uuid, completionHandler) {
    console.debug('performAnswerVoiceCall');
    const callDelegate = new CallDelegate();
    let acceptOptions = TVOAcceptOptions.optionsWithCallInviteBlock(
      this.callInvite, (builder) => {
        builder.uuid = this.callInvite.uuid;
      });
    this.call = this.callInvite.acceptWithOptionsDelegate(acceptOptions, callDelegate);
    this.callInvite = null;
    this.callKitCompletionCallback = completionHandler;
    this.incomingPushHandled();
  }
}
