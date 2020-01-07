import * as common from '../twilio.common';

// https://github.com/NativeScript/ios-runtime/issues/818
const CallDelegate = (NSObject as any).extend({

  ckprovider: null as CXProvider,
  setupCallKitProvider(provider) {
    this.ckprovider = provider;
  },

  callDidConnect(call: TVOCall) {
    console.error("callDidConnect");
    common.callIt(common.callListener, 'onConnected', call);
  },

  callDidDisconnectWithError(call: TVOCall, error: NSError) {
    if (!error) {
      console.error("callDidDisconnect uuid: ", call.uuid);
    } else {
      console.error("callDidDisconnectWithError", error);
    }
    common.callIt(common.callListener, 'onDisconnected', call);
  },

  callDidFailToConnectWithError(call: TVOCall, error: NSError) {
    console.debug("callDidFailToConnectWithError", error);
    common.callIt(common.callListener, 'onConnectFailure', call, error);
  },
}, {
  protocols: [TVOCallDelegate]
})
 
CallDelegate.initWithOwner = (owner) => {
  const delegate = CallDelegate.new();
  delegate._owner = owner;
  return delegate;
}

const TwilioAppDelegate = (UIResponder as any).extend({

  callInvite: undefined as TVOCallInvite,
  call: undefined as TVOCall,
  callKitProvider: undefined as CXProvider,
  callKitCallController: undefined as CXCallController,
  deviceTokenString: undefined as string,
  incomingPushCompletionCallback: () => {}, //void,
  callKitCompletionCallback: () => {}, //void,
  audioDevice: undefined as TVODefaultAudioDevice,
  callState: undefined as boolean,
  answered: undefined as boolean,
  activeUUID: undefined as NSUUID,

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

    let mainBundle = NSBundle.mainBundle; //iosUtils.getter(NSBundle, NSBundle.mainBundle);
    let appName = mainBundle.infoDictionary.objectForKey('CFBundleDisplayName');

    let configuration = CXProviderConfiguration.alloc().initWithLocalizedName(appName);
    configuration.maximumCallGroups = 1;
    configuration.maximumCallsPerCallGroup = 1;

    this.callKitProvider = CXProvider.alloc().initWithConfiguration(configuration);
    this.callKitCallController = CXCallController.alloc().init();
    this.callKitProvider.setDelegateQueue(this, null);

    // const dispatchQueue = dispatch_queue_create(null,null); // Needed to trigger listeners
    // const dispatchQueue = dispatch_get_global_queue(dispatch)
    const bg = qos_class_t.QOS_CLASS_BACKGROUND;
    const dispatchQueue = dispatch_get_global_queue(bg, 0);
    this.callKitProvider.setDelegateQueue(this, dispatchQueue);

    common.setupCallKitProvider(this.callKitProvider);
    
    return true;
  },

  applicationDidBecomeActive(application: UIApplication): void {
    // console.debug(`applicationDidBecomeActive:  ${application}`);

    console.debug("is registered", application.registeredForRemoteNotifications);
    if (!application.registeredForRemoteNotifications) {
      console.debug(
        "Application can not receive incomming actions. It is not registered for remote notifications"
      );
    }
  },

  applicationDidRegisterForRemoteNotificationsWithDeviceToken(
    application: UIApplication,
    deviceToken: NSData
  ) {
    let token = deviceToken.toString().replace(/[<\s>]/g, "");
    console.debug(`applicationDidRegisterForRemoteNotificationsWithDeviceToken with device token ${token}`);
  },

  applicationDidFailToRegisterForRemoteNotificationsWithError(
    application: UIApplication,
    error: NSError
  ) {
    console.error("failed to register push ", error);
    common.callIt(common.pushListener, 'onPushRegisterFailure', error);
  },

  applicationDidReceiveRemoteNotification(
    application: UIApplication,
    userInfo: NSDictionary<any, any>
  ) {
    console.debug(
      "applicationDidReceiveRemoteNotification:" + JSON.stringify(userInfo)
    );
  },

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
  },

  applicationDidEnterBackground(application: UIApplication) {
    console.debug("APP_ENTER_IN_BACKGROUND");
  },

  applicationWillEnterForeground(application: UIApplication) {
    console.debug("APP_ENTER_IN_FOREGROUND");
  },

  applicationWillTerminate(application: UIApplication) {},

  pushRegistryDidInvalidatePushTokenForType(
    registry: PKPushRegistry,
    type: string
  ) {
    console.error("PUSHKIT : INVALID_PUSHKIT_TOKEN");
  },

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
  },

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
  },

  pushRegistryDidUpdatePushCredentialsForType(
    registry: PKPushRegistry,
    pushCredentials: PKPushCredentials,
    type: string
  ) {
    console.debug(`PUSHKIT : VOIP_TOKEN : ${type}`);

    if (type !== PKPushTypeVoIP) {
        return;
    } else {
        console.log('Recvieved push notification with type:',type);
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
  },

  // TVONotificationDelegate interface implementation
  callInviteReceived(callInvite: TVOCallInvite) {
    console.debug("callInviteReceived");
    this.handleCallInviteReceived(callInvite);
  },

  cancelledCallInviteReceived(cancelledCallInvite: TVOCancelledCallInvite) {
    console.debug("cancelledCallInviteReceived");
    this.handleCallInviteCanceled(cancelledCallInvite);
  },

  notificationError(error: NSError) {
    console.error("notificationError: ", error.localizedDescription);
  },
  // End of TVONotificationDelegate interface implementation

  handleCallInviteReceived(callInvite: TVOCallInvite) {
    console.debug("handleCallInviteReceived");

    if (this.call) {
        console.debug("Already an active call.");
        console.debug("  >> Ignoring call from %@", callInvite.from);
        this.incomingPushHandled();
        // return;
    }

    this.callInvite = callInvite;
    this.activeUUID = callInvite.uuid;
    this.reportIncomingCall(callInvite.from, callInvite.uuid, callInvite);
  },

  handleCallInviteCanceled(callInviteCanceled: TVOCancelledCallInvite) {
    console.debug("handleCallInviteCanceled");
    if(!this.callInvite) return;
    this.performEndCallAction(this.callInvite.uuid, () => {
        console.log('perforingEndCallAction');
    });

    const currentDate = new Date();
    common.setActiveCall(false);
    common.callIt(common.callListener, "onDisconnected", this.callInvite.uuid);

    this.callKitProvider.reportCallWithUUIDEndedAtDateReason(
      this.callInvite.uuid,
      currentDate,
      CXCallEndedReason.Unanswered
    );

    this.callInvite = null;
    this.incomingPushHandled();
  },

  incomingPushHandled() {
    if (this.incomingPushCompletionCallback) {
      this.incomingPushCompletionCallback();
      this.incomingPushCompletionCallback = null;
    }
  },

  reportIncomingCall(from: String, uuid: any, callInvite: TVOCallInvite) {
    console.log("richard:", callInvite.customParameters);

    // Parse NSDictionary into JSON Object
    const jsonData = NSJSONSerialization.dataWithJSONObjectOptionsError(
      callInvite.customParameters,
      0
    );

    // Parse the JSON Data into a JSONObject
    const JSONObject = JSON.parse(
      NSString.alloc()
        .initWithDataEncoding(jsonData, 4)
        .toString()
    );

    let customParameters: any = common.readIt(
      common.pushListener,
      "onIncomingCall",
      JSONObject
    );

    let cxParams = {
      from: callInvite.from.toString()
    };

    if (customParameters !== undefined) {
      cxParams = Object.assign({}, cxParams, customParameters);
    }

    this.answered = false;
    let callUUID = this.callInvite.uuid;

    setTimeout(() => {

      if (!this.answered) {
        console.debug('TIMEOUT REACHED. CALL WILL BE DROPPED');
        let currentDate = new Date();
        this.callKitProvider.reportCallWithUUIDEndedAtDateReason(
          callUUID,
          currentDate,
          CXCallEndedReason.Unanswered
        );
      }
    }, 30000);
    
    let callHandle = new CXHandle({
      type: CXHandleType.PhoneNumber,
      value: cxParams.from
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
  },

  // CXProviderDelegate interface implementation
  providerDidReset(provider: CXProvider) {
    console.debug('providerDidReset');
    this.audioDevice.enabled = true;
  },

  providerDidActivateAudioSession(provider: CXProvider, audioSession: AVAudioSession) {
    console.debug('providerDidActivateAudioSession');
    this.audioDevice.enabled = true;
  },

  providerDidBegin(provider: CXProvider) {
    console.debug('providerDidBegin');
  },

  providerDidDeactivateAudioSession(provider: CXProvider, audioSession: AVAudioSession) {
    console.debug('providerDidDeactivateAudioSession');
    this.audioDevice.enabled = false;
  },

  providerExecuteTransaction(provider: CXProvider, transaction: CXTransaction) {
    console.debug('providerExecuteTransaction');
    return false;
  },

  providerPerformAnswerCallAction(provider: CXProvider, action: CXAnswerCallAction) {
    console.debug('providerPerformAnswerCallAction');

    this.audioDevice.enabled = false;
    this.audioDevice.block();
    // Parse NSDictionary into JSON Object
    const jsonData = NSJSONSerialization.dataWithJSONObjectOptionsError(
      this.callInvite.customParameters,
      0
    );

    // Parse the JSON Data into a JSONObject
    const customParameters = JSON.parse(
      NSString.alloc().initWithDataEncoding(jsonData, 4).toString()
    );

    const callback = (success) => {
        if (success) {
            action.fulfill();
        } else {
            action.fail();
        }
    };

    this.performAnswerVoiceCall(action.callUUID, callback);

    common.setActiveCall(true);
    common.callIt(common.pushListener, "onAcceptCall", customParameters);
    action.fulfill();
    this.callInvite = null;
  },

  providerPerformEndCallAction(provider: CXProvider, action: CXEndCallAction) {
    console.debug('providerPerformEndCallAction');
    this.audioDevice.enabled = false;
    if(this.callInvite !== null) {
        this.callInvite.reject();
    } else if(this.call) {
        this.call.disconnect();
    }

    action.fulfill();
  },

  providerPerformPlayDTMFCallAction(provider: CXProvider, action: CXPlayDTMFCallAction) {
    console.debug('providerPerformPlayDTMFCallAction');
  },

  providerPerformSetGroupCallAction(provider: CXProvider, action: CXSetGroupCallAction) {
    console.debug('providerPerformSetGroupCallAction');
  },

  providerPerformSetHeldCallAction(provider: CXProvider, action: CXSetHeldCallAction) {
    console.debug('providerPerformSetHeldCallAction');
  },

  providerPerformSetMutedCallAction(provider: CXProvider, action: CXSetMutedCallAction) {
    console.debug('providerPerformSetMutedCallAction');
  },

  providerPerformStartCallAction(provider: CXProvider, action: CXStartCallAction) {
    console.debug('providerPerformStartCallAction');
    // action.fulfill();
    const dateStart = new Date();
    action.fulfillWithDateStarted(dateStart);

  },

  providerTimedOutPerformingAction(provider: CXProvider, action: CXAction) {
    console.debug('providerTimedOutPerformingAction');
    action.fulfill();
  },
  // End of CXProviderDelegate interface implementation

  performAnswerVoiceCall(uuid, completionHandler) {
    console.debug('performAnswerVoiceCall');
    const callDelegate = new CallDelegate();
    callDelegate.setupCallKitProvider(this.callKitProvider);
    let acceptOptions = TVOAcceptOptions.optionsWithCallInviteBlock(
      this.callInvite, (builder) => {
        builder.uuid = uuid;
      });
    this.call = this.callInvite.acceptWithOptionsDelegate(acceptOptions, callDelegate);
    this.answered = true;
    this.callInvite = null;
    this.callKitCompletionCallback = completionHandler;
    this.incomingPushHandled();
  },

  performEndCallAction(uuid, callBack) {
    console.log("PERFORMING END CALL ACTION ON UUID:",uuid);
    let endCallAction = new CXEndCallAction(uuid);
    let transaction = new CXTransaction({action: endCallAction});

    this.callKitCallController.requestTransactionCompletion(transaction, callBack);
    console.log("END CALL SUCCESS REQUEST");
  },

}, {
  protocols: [
    UIApplicationDelegate, 
    PKPushRegistryDelegate, 
    TVONotificationDelegate, 
    CXProviderDelegate
  ]
})

TwilioAppDelegate.initWithOwner = (owner) => {
  const delegate = TwilioAppDelegate.new();
  delegate._owner = owner;
  return delegate;
}

export {
  CallDelegate,
  TwilioAppDelegate
}
