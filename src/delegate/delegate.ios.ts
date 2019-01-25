export class TwilioAppDelegate extends UIResponder
  implements UIApplicationDelegate, PKPushRegistryDelegate {
  public static ObjCProtocols = [UIApplicationDelegate];

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
}
