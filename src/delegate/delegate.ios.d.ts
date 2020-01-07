export declare class CallDelegate extends NSObject implements TVOCallDelegate {
    static ObjCProtocols: {
        prototype: TVOCallDelegate;
    }[];
    ckprovider: CXProvider;
    setupCallKitProvider(provider: any): void;
    callDidConnect(call: TVOCall): void;
    callDidDisconnectWithError(call: TVOCall, error: NSError): void;
    callDidFailToConnectWithError(call: TVOCall, error: NSError): void;
}
export declare class TwilioAppDelegate extends UIResponder implements UIApplicationDelegate, PKPushRegistryDelegate, TVONotificationDelegate, CXProviderDelegate {
    static ObjCProtocols: ({
        prototype: UIApplicationDelegate;
    } | {
        prototype: PKPushRegistryDelegate;
    } | {
        prototype: TVONotificationDelegate;
    } | {
        prototype: CXProviderDelegate;
    })[];
    callInvite: TVOCallInvite;
    call: TVOCall;
    callKitProvider: CXProvider;
    callKitCallController: CXCallController;
    deviceTokenString: string;
    incomingPushCompletionCallback: () => void;
    callKitCompletionCallback: () => void;
    audioDevice: TVODefaultAudioDevice;
    callState: boolean;
    answered: boolean;
    activeUUID: NSUUID;
    applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: any): boolean;
    applicationDidBecomeActive(application: UIApplication): void;
    applicationDidRegisterForRemoteNotificationsWithDeviceToken(application: UIApplication, deviceToken: NSData): void;
    applicationDidFailToRegisterForRemoteNotificationsWithError(application: UIApplication, error: NSError): void;
    applicationDidReceiveRemoteNotification(application: UIApplication, userInfo: NSDictionary<any, any>): void;
    applicationDidReceiveRemoteNotificationFetchCompletionHandler(application: UIApplication, userInfo: NSDictionary<any, any>, completionHandler: any): void;
    applicationDidEnterBackground(application: UIApplication): void;
    applicationWillEnterForeground(application: UIApplication): void;
    applicationWillTerminate(application: UIApplication): void;
    pushRegistryDidInvalidatePushTokenForType(registry: PKPushRegistry, type: string): void;
    pushRegistryDidReceiveIncomingPushWithPayloadForType(registry: PKPushRegistry, payload: PKPushPayload, type: string): void;
    pushRegistryDidReceiveIncomingPushWithPayloadForTypeWithCompletionHandler(registry: PKPushRegistry, payload: PKPushPayload, type: string, completion: () => void): void;
    pushRegistryDidUpdatePushCredentialsForType(registry: PKPushRegistry, pushCredentials: PKPushCredentials, type: string): void;
    callInviteReceived(callInvite: TVOCallInvite): void;
    cancelledCallInviteReceived(cancelledCallInvite: TVOCancelledCallInvite): void;
    notificationError(error: NSError): void;
    handleCallInviteReceived(callInvite: TVOCallInvite): void;
    handleCallInviteCanceled(callInviteCanceled: TVOCancelledCallInvite): void;
    incomingPushHandled(): void;
    reportIncomingCall(from: String, uuid: any, callInvite: TVOCallInvite): void;
    providerDidReset(provider: CXProvider): void;
    providerDidActivateAudioSession(provider: CXProvider, audioSession: AVAudioSession): void;
    providerDidBegin(provider: CXProvider): void;
    providerDidDeactivateAudioSession(provider: CXProvider, audioSession: AVAudioSession): void;
    providerExecuteTransaction(provider: CXProvider, transaction: CXTransaction): boolean;
    providerPerformAnswerCallAction(provider: CXProvider, action: CXAnswerCallAction): void;
    providerPerformEndCallAction(provider: CXProvider, action: CXEndCallAction): void;
    providerPerformPlayDTMFCallAction(provider: CXProvider, action: CXPlayDTMFCallAction): void;
    providerPerformSetGroupCallAction(provider: CXProvider, action: CXSetGroupCallAction): void;
    providerPerformSetHeldCallAction(provider: CXProvider, action: CXSetHeldCallAction): void;
    providerPerformSetMutedCallAction(provider: CXProvider, action: CXSetMutedCallAction): void;
    providerPerformStartCallAction(provider: CXProvider, action: CXStartCallAction): void;
    providerTimedOutPerformingAction(provider: CXProvider, action: CXAction): void;
    performAnswerVoiceCall(uuid: any, completionHandler: any): void;
    performEndCallAction(uuid: any, callBack: any): void;
}
