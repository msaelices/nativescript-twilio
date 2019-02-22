
declare class TVOAcceptOptions extends TVOCallOptions {

	static alloc(): TVOAcceptOptions; // inherited from NSObject

	static new(): TVOAcceptOptions; // inherited from NSObject

	static optionsWithCallInvite(callInvite: TVOCallInvite): TVOAcceptOptions;

	static optionsWithCallInviteBlock(callInvite: TVOCallInvite, block: (p1: TVOAcceptOptionsBuilder) => void): TVOAcceptOptions;
}

declare class TVOAcceptOptionsBuilder extends TVOCallOptionsBuilder {

	static alloc(): TVOAcceptOptionsBuilder; // inherited from NSObject

	static new(): TVOAcceptOptionsBuilder; // inherited from NSObject
}

declare var TVOAudioChannelsMono: number;

declare var TVOAudioChannelsStereo: number;

interface TVOAudioDevice extends TVOAudioDeviceCapturer, TVOAudioDeviceRenderer {
}
declare var TVOAudioDevice: {

	prototype: TVOAudioDevice;
};

interface TVOAudioDeviceCapturer extends NSObjectProtocol {

	captureFormat(): TVOAudioFormat;

	initializeCapturer(): boolean;

	startCapturing(context: interop.Pointer | interop.Reference<any>): boolean;

	stopCapturing(): boolean;
}
declare var TVOAudioDeviceCapturer: {

	prototype: TVOAudioDeviceCapturer;
};

declare function TVOAudioDeviceExecuteWorkerBlock(context: interop.Pointer | interop.Reference<any>, block: () => void): void;

declare function TVOAudioDeviceFormatChanged(context: interop.Pointer | interop.Reference<any>): void;

declare function TVOAudioDeviceReadRenderData(context: interop.Pointer | interop.Reference<any>, data: interop.Pointer | interop.Reference<number>, sizeInBytes: number): void;

interface TVOAudioDeviceRenderer extends NSObjectProtocol {

	initializeRenderer(): boolean;

	renderFormat(): TVOAudioFormat;

	startRendering(context: interop.Pointer | interop.Reference<any>): boolean;

	stopRendering(): boolean;
}
declare var TVOAudioDeviceRenderer: {

	prototype: TVOAudioDeviceRenderer;
};

declare function TVOAudioDeviceWriteCaptureData(context: interop.Pointer | interop.Reference<any>, data: interop.Pointer | interop.Reference<number>, sizeInBytes: number): void;

declare class TVOAudioFormat extends NSObject {

	static alloc(): TVOAudioFormat; // inherited from NSObject

	static new(): TVOAudioFormat; // inherited from NSObject

	readonly framesPerBuffer: number;

	readonly numberOfChannels: number;

	readonly sampleRate: number;

	constructor(o: { channels: number; sampleRate: number; framesPerBuffer: number; });

	bufferSize(): number;

	initWithChannelsSampleRateFramesPerBuffer(channels: number, sampleRate: number, framesPerBuffer: number): this;

	streamDescription(): AudioStreamBasicDescription;
}

declare var TVOAudioSampleRate16000: number;

declare var TVOAudioSampleRate24000: number;

declare var TVOAudioSampleRate32000: number;

declare var TVOAudioSampleRate44100: number;

declare var TVOAudioSampleRate48000: number;

declare var TVOAudioSampleRate8000: number;

declare function TVOAudioSessionActivated(context: interop.Pointer | interop.Reference<any>): void;

declare function TVOAudioSessionDeactivated(context: interop.Pointer | interop.Reference<any>): void;

declare class TVOBaseTrackStats extends NSObject {

	static alloc(): TVOBaseTrackStats; // inherited from NSObject

	static new(): TVOBaseTrackStats; // inherited from NSObject

	readonly codec: string;

	readonly packetsLost: number;

	readonly ssrc: string;

	readonly timestamp: number;

	readonly trackId: string;
}

declare class TVOCall extends NSObject {

	static alloc(): TVOCall; // inherited from NSObject

	static new(): TVOCall; // inherited from NSObject

	readonly from: string;

	muted: boolean;

	onHold: boolean;

	readonly sid: string;

	readonly state: TVOCallState;

	readonly to: string;

	readonly uuid: NSUUID;

	disconnect(): void;

	getStatsWithBlock(block: (p1: NSArray<TVOStatsReport>) => void): void;

	sendDigits(digits: string): void;
}

interface TVOCallDelegate extends NSObjectProtocol {

	callDidConnect(call: TVOCall): void;

	callDidDisconnectWithError(call: TVOCall, error: NSError): void;

	callDidFailToConnectWithError(call: TVOCall, error: NSError): void;

	callDidStartRinging?(call: TVOCall): void;
}
declare var TVOCallDelegate: {

	prototype: TVOCallDelegate;
};

declare class TVOCallInvite extends NSObject {

	static alloc(): TVOCallInvite; // inherited from NSObject

	static new(): TVOCallInvite; // inherited from NSObject

	readonly callSid: string;

	readonly customParameters: NSDictionary<string, string>;

	readonly from: string;

	readonly to: string;

	readonly uuid: NSUUID;

	acceptWithDelegate(delegate: TVOCallDelegate): TVOCall;

	acceptWithOptionsDelegate(options: TVOAcceptOptions, delegate: TVOCallDelegate): TVOCall;

	reject(): void;
}

declare class TVOCallOptions extends NSObject {

	static alloc(): TVOCallOptions; // inherited from NSObject

	static new(): TVOCallOptions; // inherited from NSObject

	readonly delegateQueue: NSObject;

	readonly iceOptions: TVOIceOptions;

	readonly region: string;

	readonly uuid: NSUUID;
}

declare class TVOCallOptionsBuilder extends NSObject {

	static alloc(): TVOCallOptionsBuilder; // inherited from NSObject

	static new(): TVOCallOptionsBuilder; // inherited from NSObject

	delegateQueue: NSObject;

	iceOptions: TVOIceOptions;

	region: string;

	uuid: NSUUID;
}

declare const enum TVOCallState {

	Connecting = 0,

	Ringing = 1,

	Connected = 2,

	Disconnected = 3
}

declare class TVOCancelledCallInvite extends NSObject {

	static alloc(): TVOCancelledCallInvite; // inherited from NSObject

	static new(): TVOCancelledCallInvite; // inherited from NSObject

	readonly callSid: string;

	readonly from: string;

	readonly to: string;
}

declare class TVOConnectOptions extends TVOCallOptions {

	static alloc(): TVOConnectOptions; // inherited from NSObject

	static new(): TVOConnectOptions; // inherited from NSObject

	static optionsWithAccessToken(accessToken: string): TVOConnectOptions;

	static optionsWithAccessTokenBlock(accessToken: string, block: (p1: TVOConnectOptionsBuilder) => void): TVOConnectOptions;

	readonly accessToken: string;

	readonly params: NSDictionary<string, string>;
}

declare class TVOConnectOptionsBuilder extends TVOCallOptionsBuilder {

	static alloc(): TVOConnectOptionsBuilder; // inherited from NSObject

	static new(): TVOConnectOptionsBuilder; // inherited from NSObject

	params: NSDictionary<string, string>;
}

declare class TVODefaultAudioDevice extends NSObject implements TVOAudioDevice {

	static alloc(): TVODefaultAudioDevice; // inherited from NSObject

	static audioDevice(): TVODefaultAudioDevice;

	static audioDeviceWithBlock(block: () => void): TVODefaultAudioDevice;

	static new(): TVODefaultAudioDevice; // inherited from NSObject

	block: () => void;

	enabled: boolean;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	captureFormat(): TVOAudioFormat;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initializeCapturer(): boolean;

	initializeRenderer(): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	renderFormat(): TVOAudioFormat;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	startCapturing(context: interop.Pointer | interop.Reference<any>): boolean;

	startRendering(context: interop.Pointer | interop.Reference<any>): boolean;

	stopCapturing(): boolean;

	stopRendering(): boolean;
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

declare const enum TVOIceCandidatePairState {

	Succeeded = 0,

	Frozen = 1,

	Waiting = 2,

	InProgress = 3,

	Failed = 4,

	Cancelled = 5,

	Unknown = 6
}

declare class TVOIceCandidatePairStats extends NSObject {

	static alloc(): TVOIceCandidatePairStats; // inherited from NSObject

	static new(): TVOIceCandidatePairStats; // inherited from NSObject

	readonly activeCandidatePair: boolean;

	readonly availableIncomingBitrate: number;

	readonly availableOutgoingBitrate: number;

	readonly bytesReceived: number;

	readonly bytesSent: number;

	readonly consentRequestsReceived: number;

	readonly consentRequestsSent: number;

	readonly consentResponsesReceived: number;

	readonly consentResponsesSent: number;

	readonly currentRoundTripTime: number;

	readonly localCandidateId: string;

	readonly localCandidateIp: string;

	readonly nominated: boolean;

	readonly priority: number;

	readonly readable: boolean;

	readonly relayProtocol: string;

	readonly remoteCandidateId: string;

	readonly remoteCandidateIp: string;

	readonly requestsReceived: number;

	readonly requestsSent: number;

	readonly responsesReceived: number;

	readonly responsesSent: number;

	readonly retransmissionsReceived: number;

	readonly retransmissionsSent: number;

	readonly state: TVOIceCandidatePairState;

	readonly totalRoundTripTime: number;

	readonly transportId: string;

	readonly writable: boolean;
}

declare class TVOIceCandidateStats extends NSObject {

	static alloc(): TVOIceCandidateStats; // inherited from NSObject

	static new(): TVOIceCandidateStats; // inherited from NSObject

	readonly candidateType: string;

	readonly deleted: boolean;

	readonly ip: string;

	readonly port: number;

	readonly priority: number;

	readonly protocol: string;

	readonly remote: boolean;

	readonly transportId: string;

	readonly url: string;
}

declare class TVOIceOptions extends NSObject {

	static alloc(): TVOIceOptions; // inherited from NSObject

	static new(): TVOIceOptions; // inherited from NSObject

	static options(): TVOIceOptions;

	static optionsWithBlock(block: (p1: TVOIceOptionsBuilder) => void): TVOIceOptions;

	readonly servers: NSArray<TVOIceServer>;

	readonly transportPolicy: TVOIceTransportPolicy;
}

declare class TVOIceOptionsBuilder extends NSObject {

	static alloc(): TVOIceOptionsBuilder; // inherited from NSObject

	static new(): TVOIceOptionsBuilder; // inherited from NSObject

	servers: NSArray<TVOIceServer>;

	transportPolicy: TVOIceTransportPolicy;
}

declare class TVOIceServer extends NSObject {

	static alloc(): TVOIceServer; // inherited from NSObject

	static new(): TVOIceServer; // inherited from NSObject

	readonly password: string;

	readonly urlString: string;

	readonly username: string;

	constructor(o: { URLString: string; });

	constructor(o: { URLString: string; username: string; password: string; });

	initWithURLString(serverURLString: string): this;

	initWithURLStringUsernamePassword(serverURLString: string, username: string, password: string): this;
}

declare const enum TVOIceTransportPolicy {

	All = 0,

	Relay = 1
}

declare class TVOLocalAudioTrackStats extends TVOLocalTrackStats {

	static alloc(): TVOLocalAudioTrackStats; // inherited from NSObject

	static new(): TVOLocalAudioTrackStats; // inherited from NSObject

	readonly audioLevel: number;

	readonly jitter: number;
}

declare class TVOLocalTrackStats extends TVOBaseTrackStats {

	static alloc(): TVOLocalTrackStats; // inherited from NSObject

	static new(): TVOLocalTrackStats; // inherited from NSObject

	readonly bytesSent: number;

	readonly packetsSent: number;

	readonly roundTripTime: number;
}

declare const enum TVOLogLevel {

	Off = 0,

	Fatal = 1,

	Error = 2,

	Warning = 3,

	Info = 4,

	Debug = 5,

	Trace = 6,

	All = 7
}

declare const enum TVOLogModule {

	Core = 0,

	Platform = 1,

	Signaling = 2,

	WebRTC = 3
}

interface TVONotificationDelegate extends NSObjectProtocol {

	callInviteReceived(callInvite: TVOCallInvite): void;

	cancelledCallInviteReceived(cancelledCallInvite: TVOCancelledCallInvite): void;
}
declare var TVONotificationDelegate: {

	prototype: TVONotificationDelegate;
};

declare class TVORemoteAudioTrackStats extends TVORemoteTrackStats {

	static alloc(): TVORemoteAudioTrackStats; // inherited from NSObject

	static new(): TVORemoteAudioTrackStats; // inherited from NSObject

	readonly audioLevel: number;

	readonly jitter: number;
}

declare class TVORemoteTrackStats extends TVOBaseTrackStats {

	static alloc(): TVORemoteTrackStats; // inherited from NSObject

	static new(): TVORemoteTrackStats; // inherited from NSObject

	readonly bytesReceived: number;

	readonly packetsReceived: number;
}

declare class TVOStatsReport extends NSObject {

	static alloc(): TVOStatsReport; // inherited from NSObject

	static new(): TVOStatsReport; // inherited from NSObject

	readonly iceCandidatePairStats: NSArray<TVOIceCandidatePairStats>;

	readonly iceCandidateStats: NSArray<TVOIceCandidateStats>;

	readonly localAudioTrackStats: NSArray<TVOLocalAudioTrackStats>;

	readonly peerConnectionId: string;

	readonly remoteAudioTrackStats: NSArray<TVORemoteAudioTrackStats>;
}

declare class TwilioVoice extends NSObject {

	static alloc(): TwilioVoice; // inherited from NSObject

	static connectWithAccessTokenDelegate(accessToken: string, delegate: TVOCallDelegate): TVOCall;

	static connectWithOptionsDelegate(options: TVOConnectOptions, delegate: TVOCallDelegate): TVOCall;

	static handleNotificationDelegate(payload: NSDictionary<any, any>, delegate: TVONotificationDelegate): boolean;

	static logLevelForModule(module: TVOLogModule): TVOLogLevel;

	static new(): TwilioVoice; // inherited from NSObject

	static registerWithAccessTokenDeviceTokenCompletion(accessToken: string, deviceToken: string, completion: (p1: NSError) => void): void;

	static sdkVersion(): string;

	static setLogLevelModule(logLevel: TVOLogLevel, module: TVOLogModule): void;

	static unregisterWithAccessTokenDeviceTokenCompletion(accessToken: string, deviceToken: string, completion: (p1: NSError) => void): void;

	static audioDevice: TVOAudioDevice;

	static logLevel: TVOLogLevel;
}

declare var kTVODefaultAudioDeviceIOBufferDurationSimulator: number;

declare var kTVODefaultAudioDeviceSampleRateSimulator: number;

declare var kTVOErrorDomain: string;
