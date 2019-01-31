import { getAccessToken } from '..';

export class TwilioAppDelegate extends UIResponder
  implements UIApplicationDelegate, PKPushRegistryDelegate, TVONotificationDelegate, TVOCallDelegate, CXProviderDelegate {
  public static ObjCProtocols = [UIApplicationDelegate, PKPushRegistryDelegate, TVONotificationDelegate, TVOCallDelegate, CXProviderDelegate];

  callInvite: TVOCallInvite;
  call: TVOCall;
  callKitProvider: CXProvider;
  callKitCallController: CXCallController;
  deviceTokenString: string;
  incomingPushCompletionCallback: () => void;
  callKitCompletionCallback: () => void;

  applicationDidFinishLaunchingWithOptions(
    application: UIApplication,
    launchOptions
  ): boolean {
    console.log("applicationWillFinishLaunchingWithOptions: ", this);

    let center = UNUserNotificationCenter.currentNotificationCenter();

    center.requestAuthorizationWithOptionsCompletionHandler(
      UNAuthorizationOptions.Alert |
        UNAuthorizationOptions.Sound |
        UNAuthorizationOptions.Badge,
      (granted, error) => {
        console.log(
          `requestAuthorizationWithOptionsCompletionHandler: ${granted}`
        );
        console.log(error);
      }
    );
    application.registerForRemoteNotifications();
    console.log(PKPushTypeVoIP);

    // register push kip
    let pushkitVOIP = PKPushRegistry.alloc().initWithQueue(null);
    pushkitVOIP.delegate = this;
    pushkitVOIP.desiredPushTypes = NSSet.setWithObject(PKPushTypeVoIP);

    let configuration = CXProviderConfiguration.alloc().initWithLocalizedName("CallKit {N} Quickstart");
    configuration.maximumCallGroups = 1
    configuration.maximumCallsPerCallGroup = 1

    this.callKitProvider = CXProvider.alloc().initWithConfiguration(configuration);
    this.callKitCallController = CXCallController.alloc().init();
    this.callKitProvider.setDelegateQueue(this, null);

    return true;
  }

  applicationDidBecomeActive(application: UIApplication): void {
    console.log(`applicationDidBecomeActive:  ${application}`);

    console.log("is registered", application.registeredForRemoteNotifications);
  }

  applicationDidRegisterForRemoteNotificationsWithDeviceToken(
    application: UIApplication,
    deviceToken: NSData
  ) {
    let token = deviceToken.toString().replace(/[<\s>]/g, "");
  }

  applicationDidFailToRegisterForRemoteNotificationsWithError(
    application: UIApplication,
    error: NSError
  ) {
    console.error("failed to register push ", error);
  }

  applicationDidReceiveRemoteNotification(
    application: UIApplication,
    userInfo: NSDictionary<any, any>
  ) {
    console.log(
      "applicationDidReceiveRemoteNotification:" + JSON.stringify(userInfo)
    );
  }

  applicationDidReceiveRemoteNotificationFetchCompletionHandler(
    application: UIApplication,
    userInfo: NSDictionary<any, any>,
    completionHandler: any
  ) {
    console.log(
      "applicationDidReceiveRemoteNotificationFetchCompletionHandler:" +
        JSON.stringify(userInfo)
    );

    completionHandler(UIBackgroundFetchResult.NewData);
  }

  applicationDidEnterBackground(application: UIApplication) {
    console.log("APP_ENTER_IN_BACKGROUND");
  }
  applicationWillEnterForeground(application: UIApplication) {
    console.log("APP_ENTER_IN_FOREGROUND");
  }

  applicationWillTerminate(application: UIApplication) {}

  pushRegistryDidInvalidatePushTokenForType(
    registry: PKPushRegistry,
    type: string
  ) {
    console.log("PUSHKIT : INVALID_PUSHKIT_TOKEN");
  }

  pushRegistryDidReceiveIncomingPushWithPayloadForType(
    registry: PKPushRegistry,
    payload: PKPushPayload,
    type: string
  ) {
    let application = UIApplication.sharedApplication;

    console.log(
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

    console.log(
      "PUSHKIT : INCOMING VOIP NOTIFICATION WITH COMPLETION:",
      payload.dictionaryPayload.description
    );

    // Save for later when the notification is properly handled.
    this.incomingPushCompletionCallback = completion;

    if (type == PKPushTypeVoIP) {
        TwilioVoice.handleNotificationDelegate(payload.dictionaryPayload, this);
    }
  }

  pushRegistryDidUpdatePushCredentialsForType(
    registry: PKPushRegistry,
    pushCredentials: PKPushCredentials,
    type: string
  ) {
    console.log(`PUSHKIT : VOIP_TOKEN : ${type}`);

    if (type != PKPushTypeVoIP) {
        return;
    }

    getAccessToken()
      .then((accessToken) => {
        let deviceToken = (pushCredentials.token as NSData).description

        const callback = (error) => {
          if (error) {
            console.error("An error occurred while registering: \(error.localizedDescription)")
          }
          else {
            console.log("Successfully registered for VoIP push notifications.");
          }
        };

        TwilioVoice.registerWithAccessTokenDeviceTokenCompletion(accessToken, deviceToken, callback);

        this.deviceTokenString = deviceToken;

      })
      .catch((error) => {
        console.error('Error getting access token:', error);
        return;
      })
  }

  // TVONotificationDelegate interface implementation
  callInviteReceived(callInvite: TVOCallInvite) {
    console.log("callInviteReceived");

    if (callInvite.state === TVOCallInviteState.Pending) {
      this.handleCallInviteReceived(callInvite)
    } else if (callInvite.state == TVOCallInviteState.Canceled) {
      this.handleCallInviteCanceled(callInvite)
    }
  }

  notificationError(error: NSError) {
    console.log("notificationError: ", error.localizedDescription);
  }
  // End of TVONotificationDelegate interface implementation

  handleCallInviteReceived(callInvite: TVOCallInvite) {
    console.log("handleCallInviteReceived");

    if (this.callInvite && this.callInvite.state == TVOCallInviteState.Pending) {
        console.log("Already a pending incoming call invite.");
        console.log("  >> Ignoring call from %@", callInvite.from);
        this.incomingPushHandled()
        return;
    } else if (this.call) {
        console.log("Already an active call.");
        console.log("  >> Ignoring call from %@", callInvite.from);
        this.incomingPushHandled()
        return;
    }

    this.callInvite = callInvite;

    this.reportIncomingCall("Voice Bot", callInvite.uuid);
  }

  handleCallInviteCanceled(callInvite: TVOCallInvite) {
    console.log("callInviteCanceled");
    // performEndCallAction(callInvite.uuid);
    this.callInvite = null;
    this.incomingPushHandled()
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
          console.log(`Failed to report incoming call successfully: ${error.localizedDescription}`);
          return
      }
      TwilioVoice.logLevel = TVOLogLevel.Verbose;
      console.log("Incoming call successfully reported.");
      // RCP: Workaround per https://forums.developer.apple.com/message/169511
      TwilioVoice.configureAudioSession();
    }

    this.callKitProvider.reportNewIncomingCallWithUUIDUpdateCompletion(uuid, callUpdate, callback);
  }

  // CXProviderDelegate interface implementation
  providerDidReset(provider: CXProvider) {
    console.log('providerDidReset');
    TwilioVoice.audioEnabled = true;
  }

	providerDidActivateAudioSession(provider: CXProvider, audioSession: AVAudioSession) {
    console.log('providerDidActivateAudioSession');
  }

	providerDidBegin(provider: CXProvider) {
    console.log('providerDidBegin');
  }

	providerDidDeactivateAudioSession(provider: CXProvider, audioSession: AVAudioSession) {
    console.log('providerDidDeactivateAudioSession');
  }

	providerExecuteTransaction(provider: CXProvider, transaction: CXTransaction) {
    console.log('providerExecuteTransaction');
    return false;
  }

	providerPerformAnswerCallAction(provider: CXProvider, action: CXAnswerCallAction) {
    console.log('providerPerformAnswerCallAction');
    TwilioVoice.audioEnabled = false;
    const callback = (success) => {
        if (success) {
            action.fulfill()
        } else {
            action.fail()
        }
    };

    this.performAnswerVoiceCall(action.callUUID, callback);

    action.fulfill();
  }

	providerPerformEndCallAction(provider: CXProvider, action: CXEndCallAction) {
    console.log('providerPerformEndCallAction');
  }

	providerPerformPlayDTMFCallAction(provider: CXProvider, action: CXPlayDTMFCallAction) {
    console.log('providerPerformPlayDTMFCallAction');
  }

	providerPerformSetGroupCallAction(provider: CXProvider, action: CXSetGroupCallAction) {
    console.log('providerPerformSetGroupCallAction');
  }

	providerPerformSetHeldCallAction(provider: CXProvider, action: CXSetHeldCallAction) {
    console.log('providerPerformSetHeldCallAction');
  }

	providerPerformSetMutedCallAction(provider: CXProvider, action: CXSetMutedCallAction) {
    console.log('providerPerformSetMutedCallAction');
  }

	providerPerformStartCallAction(provider: CXProvider, action: CXStartCallAction) {
    console.log('providerPerformStartCallAction');
  }

	providerTimedOutPerformingAction(provider: CXProvider, action: CXAction) {
    console.log('providerTimedOutPerformingAction');
  }
  // End of CXProviderDelegate interface implementation

  performAnswerVoiceCall(uuid, completionHandler) {
    let call = this.callInvite.acceptWithDelegate(this);
    this.callInvite = null;
    this.callKitCompletionCallback = completionHandler;
    this.incomingPushHandled();
  }

  // TVOCallDelegate interface implementation
  callDidConnect(call: TVOCall) {
    console.log("callDidConnect");
  }

  callDidDisconnectWithError(call: TVOCall, error: NSError) {
    console.log("callDidDisconnectWithError");
  }

  callDidFailToConnectWithError(call: TVOCall, error: NSError) {
    console.log("callDidFailToConnectWithError");
  }
  // End of TVOCallDelegate interface implementation
}
