
declare class TVOCall extends NSObject {

	static alloc(): TVOCall; // inherited from NSObject

	static new(): TVOCall; // inherited from NSObject

	readonly delegate: TVOCallDelegate;

	readonly from: string;

	muted: boolean;

	onHold: boolean;

	readonly sid: string;

	readonly state: TVOCallState;

	readonly to: string;

	readonly uuid: NSUUID;

	disconnect(): void;

	sendDigits(digits: string): void;
}

interface TVOCallDelegate extends NSObjectProtocol {

	callDidConnect(call: TVOCall): void;

	callDidDisconnectWithError(call: TVOCall, error: NSError): void;

	callDidFailToConnectWithError(call: TVOCall, error: NSError): void;
}
declare var TVOCallDelegate: {

	prototype: TVOCallDelegate;
};

declare class TVOCallInvite extends NSObject {

	static alloc(): TVOCallInvite; // inherited from NSObject

	static new(): TVOCallInvite; // inherited from NSObject

	readonly callSid: string;

	readonly from: string;

	readonly state: TVOCallInviteState;

	readonly to: string;

	readonly uuid: NSUUID;

	acceptWithDelegate(delegate: TVOCallDelegate): TVOCall;

	reject(): void;
}

declare const enum TVOCallInviteState {

	Pending = 0,

	Accepted = 1,

	Rejected = 2,

	Canceled = 3
}

declare const enum TVOCallState {

	Connecting = 0,

	Connected = 1,

	Disconnected = 2
}

declare const enum TVOError {

	AccessTokenInvalid = 20101,

	AccessTokenHeaderInvalid = 20102,

	AccessTokenIssuerInvalid = 20103,

	AccessTokenExpired = 20104,

	AccessTokenNotYetValid = 20105,

	AccessTokenGrantsInvalid = 20106,

	AccessTokenSignatureInvalid = 20107,

	ExpirationTimeExceedsMaxTimeAllowed = 20157,

	AccessForbidden = 20403,

	ApplicationNotFound = 21218,

	ConnectionTimeout = 31003,

	InitializationError = 31004,

	ConnectionError = 31005,

	MalformedRequest = 31100,

	InvalidData = 31106,

	AuthorizationError = 31201,

	InvalidJWTToken = 31204,

	MicrophoneAccessDenial = 31208,

	RegistrationError = 31301
}

declare const enum TVOLogLevel {

	Off = 0,

	Error = 1,

	Warn = 2,

	Info = 3,

	Debug = 4,

	Verbose = 5
}

declare const enum TVOLogModule {

	PJSIP = 0
}

interface TVONotificationDelegate extends NSObjectProtocol {

	callInviteReceived(callInvite: TVOCallInvite): void;

	notificationError(error: NSError): void;
}
declare var TVONotificationDelegate: {

	prototype: TVONotificationDelegate;
};

declare class TwilioVoice extends NSObject {

	static alloc(): TwilioVoice; // inherited from NSObject

	static callParamsDelegate(accessToken: string, twiMLParams: NSDictionary<string, string>, delegate: TVOCallDelegate): TVOCall;

	static callParamsUuidDelegate(accessToken: string, twiMLParams: NSDictionary<string, string>, uuid: NSUUID, delegate: TVOCallDelegate): TVOCall;

	static configureAudioSession(): void;

	static handleNotificationDelegate(payload: NSDictionary<any, any>, delegate: TVONotificationDelegate): void;

	static new(): TwilioVoice; // inherited from NSObject

	static registerWithAccessTokenDeviceTokenCompletion(accessToken: string, deviceToken: string, completion: (p1: NSError) => void): void;

	static setModuleLogLevel(module: TVOLogModule, level: TVOLogLevel): void;

	static unregisterWithAccessTokenDeviceTokenCompletion(accessToken: string, deviceToken: string, completion: (p1: NSError) => void): void;

	static audioEnabled: boolean;

	static logLevel: TVOLogLevel;

	static region: string;
}

declare var kTVOErrorDomain: string;
