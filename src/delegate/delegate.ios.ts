export class TwilioAppDelegate extends UIResponder
  implements UIApplicationDelegate, PKPushRegistryDelegate, TVONotificationDelegate, CXProviderDelegate {
  public static ObjCProtocols = [UIApplicationDelegate, PKPushRegistryDelegate, TVONotificationDelegate, CXProviderDelegate];

  callInvite: TVOCallInvite;
  call: TVOCall;
  callKitProvider: CXProvider;
  callKitCallController: CXCallController;

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

    let configuration = CXProviderConfiguration.alloc().initWithLocalizedName("CallKit Quickstart");
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
      "PUSHKIT : INCOMING VOIP NOTIFICATION :",
      payload.dictionaryPayload.description
    );

    if (completion) completion();
  }

  pushRegistryDidUpdatePushCredentialsForType(
    registry: PKPushRegistry,
    pushCredentials: PKPushCredentials,
    type: string
  ) {
    console.log("PUSHKIT : VOIP_TOKEN : ");
  }

  // TVONotificationDelegate interface implementation
  callInviteReceived(callInvite: TVOCallInvite) {
    console.log("callInviteReceived");

    if (callInvite.state === TVOCallInviteState.Pending) {
      // handleCallInviteReceived(callInvite)
    } else if (callInvite.state == TVOCallInviteState.Canceled) {
      // handleCallInviteCanceled(callInvite)
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
        // this.incomingPushHandled()
        return;
    } else if (this.call) {
        console.log("Already an active call.");
        console.log("  >> Ignoring call from %@", callInvite.from);
        // this.incomingPushHandled()
        return;
    }

    this.callInvite = callInvite

    this.reportIncomingCall("Voice Bot", callInvite.uuid);
  }

  handleCallInviteCanceled(callInvite: TVOCallInvite) {
    console.log("callInviteCanceled");
    // performEndCallAction(callInvite.uuid);
    this.callInvite = null;
    // this.incomingPushHandled()
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

	providerExecuteTransaction(provider: CXProvider, transaction: CXTransaction): b {
    console.log('providerExecuteTransaction');
    return true;
  }

	providerPerformAnswerCallAction(provider: CXProvider, action: CXAnswerCallAction) {
    console.log('providerPerformAnswerCallAction');
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
}
