/// <reference path="./_helpers.d.ts" />
import javautilMap = java.util.Map;
/// <reference path="./java.util.Map.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class BridgeCallCommand extends com.twilio.voice.CallCommand {
				public createTwilioHeaders(): javautilMap;
				public run(): void;
			}
		}
	}
}

declare module com {
	export module twilio {
		export module voice {
			export class BuildConfig {
				public static DEBUG: boolean;
				public static APPLICATION_ID: string;
				public static BUILD_TYPE: string;
				public static FLAVOR: string;
				public static VERSION_CODE: number;
				public static VERSION_NAME: string;
				public constructor();
			}
		}
	}
}

import javautilHashMap = java.util.HashMap;
/// <reference path="./com.twilio.voice.Call.d.ts" />
/// <reference path="./com.twilio.voice.CallException.d.ts" />
/// <reference path="./com.twilio.voice.CallState.d.ts" />
/// <reference path="./com.twilio.voice.RTCStatsSample.d.ts" />
/// <reference path="./com.twilio.voice.VoiceException.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.HashMap.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class Call extends com.twilio.voice.InternalCall {
				public getSid(): string;
				public sendDigits(param0: string): void;
				public mute(param0: boolean): void;
				public getState(): com.twilio.voice.CallState;
				public disconnect(): void;
				public getTo(): string;
				public onWarningCleared(param0: com.twilio.voice.EventPayload.WarningName): void;
				public onSample(param0: com.twilio.voice.RTCStatsSample): void;
				public onWarning(param0: javautilHashMap): void;
				public isMuted(): boolean;
				public onError(param0: com.twilio.voice.VoiceException): void;
				public getFrom(): string;
			}
			export module Call {
				export class InternalListener {
					/**
					 * Constructs a new instance of the com.twilio.voice.Call$InternalListener interface with the provided implementation.
					 */
					public constructor(implementation: {
						onConnectFailure(param0: com.twilio.voice.Call, param1: com.twilio.voice.CallException): void;
						onConnected(param0: com.twilio.voice.Call): void;
						onEarlyMedia(param0: com.twilio.voice.Call): void;
						onConnecting(param0: com.twilio.voice.Call): void;
						onDisconnected(param0: com.twilio.voice.Call, param1: com.twilio.voice.CallException): void;
						onConnectFailure(param0: com.twilio.voice.Call, param1: com.twilio.voice.CallException): void;
						onConnected(param0: com.twilio.voice.Call): void;
						onDisconnected(param0: com.twilio.voice.Call, param1: com.twilio.voice.CallException): void;
					});
					public onDisconnected(param0: com.twilio.voice.Call, param1: com.twilio.voice.CallException): void;
					public onConnected(param0: com.twilio.voice.Call): void;
					public onEarlyMedia(param0: com.twilio.voice.Call): void;
					public onConnecting(param0: com.twilio.voice.Call): void;
					public onConnectFailure(param0: com.twilio.voice.Call, param1: com.twilio.voice.CallException): void;
				}
				export class Listener {
					/**
					 * Constructs a new instance of the com.twilio.voice.Call$Listener interface with the provided implementation.
					 */
					public constructor(implementation: {
						onConnectFailure(param0: com.twilio.voice.Call, param1: com.twilio.voice.CallException): void;
						onConnected(param0: com.twilio.voice.Call): void;
						onDisconnected(param0: com.twilio.voice.Call, param1: com.twilio.voice.CallException): void;
					});
					public onDisconnected(param0: com.twilio.voice.Call, param1: com.twilio.voice.CallException): void;
					public onConnected(param0: com.twilio.voice.Call): void;
					public onConnectFailure(param0: com.twilio.voice.Call, param1: com.twilio.voice.CallException): void;
				}
			}
		}
	}
}

/// <reference path="./com.twilio.voice.Call.d.ts" />
/// <reference path="./java.util.Map.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export abstract class CallCommand {
				public from: string;
				public token: string;
				public call: com.twilio.voice.Call;
				public params: javautilMap;
				public createTwilioHeaders(): javautilMap;
				public startCall(param0: javautilMap): void;
			}
		}
	}
}

import javalangRunnable = java.lang.Runnable;
/// <reference path="./java.lang.Runnable.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class CallCommandHandler {
				/**
				 * Constructs a new instance of the com.twilio.voice.CallCommandHandler interface with the provided implementation.
				 */
				public constructor(implementation: {
					postCommand(param0: javalangRunnable): void;
					destroy(): void;
				});
				public destroy(): void;
				public postCommand(param0: javalangRunnable): void;
			}
		}
	}
}

/// <reference path="./java.lang.Runnable.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class CallCommandHandlerImpl {
				public destroy(): void;
				public run(): void;
				public postCommand(param0: javalangRunnable): void;
			}
		}
	}
}

import androidcontentContext = android.content.Context;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./com.twilio.voice.Call.d.ts" />
/// <reference path="./com.twilio.voice.CallInvite.d.ts" />
/// <reference path="./com.twilio.voice.InternalCall.d.ts" />
/// <reference path="./com.twilio.voice.RTCMonitorCommand.d.ts" />
/// <reference path="./com.twilio.voice.impl.TwilioConfig.d.ts" />
/// <reference path="./com.twilio.voice.impl.session.Event.d.ts" />
/// <reference path="./com.twilio.voice.impl.useragent.Call.d.ts" />
/// <reference path="./com.twilio.voice.impl.useragent.config.LoggingConfig.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.Map.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class CallControlManager {
				public onCallState(param0: com.twilio.voice.impl.useragent.Call, param1: com.twilio.voice.impl.session.Event): void;
				public onCallMediaState(param0: com.twilio.voice.impl.useragent.Call): void;
				public static call(param0: androidcontentContext, param1: string, param2: javautilMap, param3: com.twilio.voice.Call.Listener): com.twilio.voice.Call;
				public sendDigits(param0: com.twilio.voice.InternalCall, param1: string): void;
				public constructor(param0: androidcontentContext, param1: com.twilio.voice.impl.TwilioConfig);
				public setLogging(param0: com.twilio.voice.impl.useragent.config.LoggingConfig): void;
				public onTransactionState(param0: com.twilio.voice.impl.useragent.Call, param1: string): void;
				public monitor(param0: com.twilio.voice.RTCMonitorCommand): void;
				public static accept(param0: androidcontentContext, param1: com.twilio.voice.CallInvite, param2: string, param3: com.twilio.voice.Call.Listener): com.twilio.voice.Call;
				public static reject(param0: androidcontentContext, param1: com.twilio.voice.CallInvite, param2: string): void;
				public setLogLevel(param0: number): void;
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class CallException extends com.twilio.voice.VoiceException {
				public static CallTwiMLApplicationNotFoundException: com.twilio.voice.CallException;
				public static CallConnectionTimeoutException: com.twilio.voice.CallException;
				public static CallConnectionErrorException: com.twilio.voice.CallException;
				public static AudioDeviceErrorException: com.twilio.voice.CallException;
				public static MalformedInvalidRequestException: com.twilio.voice.CallException;
				public static AuthorizationInvalidAccessTokenException: com.twilio.voice.CallException;
				public constructor(param0: number, param1: string, param2: string);
			}
		}
	}
}

import androidosParcel = android.os.Parcel;
import androidosParcelableCreator = android.os.Parcelable.Creator;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./com.twilio.voice.Call.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class CallInvite {
				public static CREATOR: androidosParcelableCreator;
				public getCallSid(): string;
				public getState(): com.twilio.voice.CallInvite.State;
				public writeToParcel(param0: androidosParcel, param1: number): void;
				public getTo(): string;
				public describeContents(): number;
				public accept(param0: androidcontentContext, param1: com.twilio.voice.Call.Listener): com.twilio.voice.Call;
				public getFrom(): string;
				public reject(param0: androidcontentContext): void;
			}
			export module CallInvite {
				export class State {
					public static PENDING: com.twilio.voice.CallInvite.State;
					public static ACCEPTED: com.twilio.voice.CallInvite.State;
					public static REJECTED: com.twilio.voice.CallInvite.State;
					public static CANCELED: com.twilio.voice.CallInvite.State;
					public static values(): native.Array<com.twilio.voice.CallInvite.State>;
					public static valueOf(param0: string): com.twilio.voice.CallInvite.State;
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class CallState {
				public static CONNECTING: com.twilio.voice.CallState;
				public static CONNECTED: com.twilio.voice.CallState;
				public static DISCONNECTED: com.twilio.voice.CallState;
				public static values(): native.Array<com.twilio.voice.CallState>;
				public static valueOf(param0: string): com.twilio.voice.CallState;
			}
		}
	}
}

/// <reference path="./com.twilio.voice.impl.useragent.Call.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class ConnectSoundDeviceCommand {
				public run(): void;
				public constructor(param0: com.twilio.voice.impl.useragent.Call);
			}
		}
	}
}

import androidcontentIntent = android.content.Intent;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.content.Intent.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class ConnectivityReceiver {
				public onReceive(param0: androidcontentContext, param1: androidcontentIntent): void;
				public constructor();
			}
		}
	}
}

import javalangObject = java.lang.Object;
/// <reference path="./java.lang.Object.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export abstract class Constants {
				public static clientStringLock: javalangObject;
				public static dev: boolean;
				public static clientString: string;
				public static ALLOW_CONTACT_REWRITE_ENABLE: boolean;
				public static GLOBAL_LOW_LATENCY_REGION: string;
				public static CLIENT_SDK_PRODUCT_NAME: string;
				public static APP_JSON_PAYLOADTYPE: string;
				public static PLATFORM_ANDROID: string;
				public static getClientString(): string;
				public static getNotificationServiceUrl(): string;
				public static getCallControlHost(): string;
				public static getEaHost(): string;
				public static getKeyKibanaMetricsHostUrl(): string;
				public static getKeyKibanaEventGatewayHostUrl(): string;
				public static getCallControlPort(param0: boolean): number;
			}
			export module Constants {
				export class Direction {
					public static INCOMING: com.twilio.voice.Constants.Direction;
					public static OUTGOING: com.twilio.voice.Constants.Direction;
					public static values(): native.Array<com.twilio.voice.Constants.Direction>;
					public static valueOf(param0: string): com.twilio.voice.Constants.Direction;
				}
				export class SeverityLevel {
					public static INFO: com.twilio.voice.Constants.SeverityLevel;
					public static DEBUG: com.twilio.voice.Constants.SeverityLevel;
					public static WARNING: com.twilio.voice.Constants.SeverityLevel;
					public static ERROR: com.twilio.voice.Constants.SeverityLevel;
					public static values(): native.Array<com.twilio.voice.Constants.SeverityLevel>;
					public static valueOf(param0: string): com.twilio.voice.Constants.SeverityLevel;
				}
			}
		}
	}
}

/// <reference path="./com.twilio.voice.Call.d.ts" />
/// <reference path="./com.twilio.voice.CallException.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class DestroyCommand {
				public constructor(param0: com.twilio.voice.Call, param1: com.twilio.voice.CallException);
				public run(): void;
			}
		}
	}
}

import orgjsonJSONObject = org.json.JSONObject;
/// <reference path="./org.json.JSONObject.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class Event extends com.twilio.voice.EventMetadata {
				public getPayload(): orgjsonJSONObject;
				public toJSONObject(): orgjsonJSONObject;
			}
			export module Event {
				export class Builder {
				}
			}
		}
	}
}

declare module com {
	export module twilio {
		export module voice {
			export class EventGroupType {
				public static CALL_QUALITY_STATS_GROUP: string;
				public static NETWORK_QUALITY_WARNING_RAISED: string;
				public static AUDIO_LEVEL_WARNING_RAISED: string;
				public static NETWORK_QUALITY_WARNING_CLEARED: string;
				public static AUDIO_LEVEL_WARNING_CLEARED: string;
				public static CONNECTION_EVENT_GROUP: string;
				public static FEEDBACK_EVENT_GROUP: string;
			}
		}
	}
}

declare module com {
	export module twilio {
		export module voice {
			export class EventKeys {
				public static EVENT_NAME: string;
				public static EVENT_GROUP: string;
				public static TIMESTAMP: string;
				public static LEVEL_TAG: string;
				public static PRIVATE: string;
				public static PAYLOAD_TYPE: string;
				public static PAYLOAD: string;
				public static PUBLISHER: string;
				public static DATA: string;
				public static THRESHOLD_KEY: string;
				public static VALUES_KEY: string;
				public static VALUE_KEY: string;
				public static TIMESTAMP_MS: string;
				public static CALL_SID: string;
				public static CLIENT_NAME: string;
				public static PLATFORM: string;
				public static DIRECTION_KEY: string;
				public static TEMP_CALL_SID: string;
				public static QUALITY_SCORE: string;
				public static ISSUE_NAME: string;
				public static ERROR_CODE: string;
				public static ERROR_MESSAGE: string;
				public static SDK_VERSION_KEY: string;
			}
		}
	}
}

declare module com {
	export module twilio {
		export module voice {
			export class EventMetadata {
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class EventPayload {
			}
			export module EventPayload {
				export class Builder {
				}
				export class IssueName {
					public static DROPPED_CALL: com.twilio.voice.EventPayload.IssueName;
					public static AUDIO_LATENCY: com.twilio.voice.EventPayload.IssueName;
					public static ONE_WAY_AUDIO: com.twilio.voice.EventPayload.IssueName;
					public static CHOPPY_AUDIO: com.twilio.voice.EventPayload.IssueName;
					public static NOISY_CALL: com.twilio.voice.EventPayload.IssueName;
					public static ECHO: com.twilio.voice.EventPayload.IssueName;
					public static NONE: com.twilio.voice.EventPayload.IssueName;
					public static valueOf(param0: string): com.twilio.voice.EventPayload.IssueName;
					public toString(): string;
					public static values(): native.Array<com.twilio.voice.EventPayload.IssueName>;
				}
				export class QualityScore {
					public static ONE: com.twilio.voice.EventPayload.QualityScore;
					public static TWO: com.twilio.voice.EventPayload.QualityScore;
					public static THREE: com.twilio.voice.EventPayload.QualityScore;
					public static FOUR: com.twilio.voice.EventPayload.QualityScore;
					public static FIVE: com.twilio.voice.EventPayload.QualityScore;
					public getValue(): number;
					public static values(): native.Array<com.twilio.voice.EventPayload.QualityScore>;
					public static valueOf(param0: string): com.twilio.voice.EventPayload.QualityScore;
				}
				export class WarningName {
					public static WARN_HIGH_JITTER: com.twilio.voice.EventPayload.WarningName;
					public static WARN_HIGH_PACKET_LOSS: com.twilio.voice.EventPayload.WarningName;
					public static WARN_HIGH_RTT: com.twilio.voice.EventPayload.WarningName;
					public static WARN_LOW_MOS: com.twilio.voice.EventPayload.WarningName;
					public static WARN_CONSTANT_AUDIO_IN_LEVEL: com.twilio.voice.EventPayload.WarningName;
					public static WARN_CONSTANT_AUDIO_OUT_LEVEL: com.twilio.voice.EventPayload.WarningName;
					public static values(): native.Array<com.twilio.voice.EventPayload.WarningName>;
					public toString(): string;
					public static valueOf(param0: string): com.twilio.voice.EventPayload.WarningName;
				}
			}
		}
	}
}

/// <reference path="./com.twilio.voice.VoiceException.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class EventPublisher {
			}
			export module EventPublisher {
				export class EventPublisherListener {
					/**
					 * Constructs a new instance of the com.twilio.voice.EventPublisher$EventPublisherListener interface with the provided implementation.
					 */
					public constructor(implementation: {
						onError(param0: com.twilio.voice.VoiceException): void;
					});
					public onError(param0: com.twilio.voice.VoiceException): void;
				}
			}
		}
	}
}

declare module com {
	export module twilio {
		export module voice {
			export class EventType {
				public static CALL_METRIC_EVENT: string;
				public static DISCONNECTED_BY_LOCAL: string;
				public static DISCONNECTED_BY_REMOTE: string;
				public static MUTED_EVENT: string;
				public static UNMUTED_EVENT: string;
				public static INCOMING: string;
				public static ACCEPTED_BY_LOCAL: string;
				public static REJECTED_BY_LOCAL: string;
				public static CONNECTION_ERROR: string;
			}
		}
	}
}

/// <reference path="./com.twilio.voice.InternalCall.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class HangupCallCommand {
				public run(): void;
				public constructor(param0: com.twilio.voice.InternalCall);
			}
		}
	}
}

/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./com.twilio.voice.RegistrarListener.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class HttpsRegistrar {
				public static unregister(param0: androidcontentContext, param1: string, param2: string, param3: com.twilio.voice.RegistrarListener): void;
				public static register(param0: androidcontentContext, param1: string, param2: string, param3: string, param4: com.twilio.voice.RegistrarListener): void;
			}
		}
	}
}

/// <reference path="./com.twilio.voice.CallState.d.ts" />
/// <reference path="./com.twilio.voice.RTCStatsSample.d.ts" />
/// <reference path="./com.twilio.voice.VoiceException.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.HashMap.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export abstract class InternalCall {
				public static TEMP_PREFIX_ANDROID: string;
				public getSid(): string;
				public sendDigits(param0: string): void;
				public mute(param0: boolean): void;
				public getState(): com.twilio.voice.CallState;
				public disconnect(): void;
				public onWarningCleared(param0: com.twilio.voice.EventPayload.WarningName): void;
				public onSample(param0: com.twilio.voice.RTCStatsSample): void;
				public onWarning(param0: javautilHashMap): void;
				public isMuted(): boolean;
				public onError(param0: com.twilio.voice.VoiceException): void;
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class LogLevel {
				public static OFF: com.twilio.voice.LogLevel;
				public static ERROR: com.twilio.voice.LogLevel;
				public static WARNING: com.twilio.voice.LogLevel;
				public static INFO: com.twilio.voice.LogLevel;
				public static DEBUG: com.twilio.voice.LogLevel;
				public static TRACE: com.twilio.voice.LogLevel;
				public static ALL: com.twilio.voice.LogLevel;
				public static values(): native.Array<com.twilio.voice.LogLevel>;
				public static valueOf(param0: string): com.twilio.voice.LogLevel;
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class LogModule {
				public static PJSIP: com.twilio.voice.LogModule;
				public static valueOf(param0: string): com.twilio.voice.LogModule;
				public static values(): native.Array<com.twilio.voice.LogModule>;
			}
		}
	}
}

import javalangClass = java.lang.Class;
import javalangThrowable = java.lang.Throwable;
/// <reference path="./java.lang.Class.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.lang.Throwable.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class Logger {
				public static INHERIT: number;
				public e(param0: string): void;
				public static setLogLevel(param0: number): void;
				public i(param0: string, param1: javalangThrowable): void;
				public isInfoEnabled(): boolean;
				public isVerboseEnabled(): boolean;
				public d(param0: string): void;
				public setLevel(param0: number): void;
				public isWarnEnabled(): boolean;
				public v(param0: string, param1: javalangThrowable): void;
				public isErrorEnabled(): boolean;
				public isDebugEnabled(): boolean;
				public w(param0: string): void;
				public d(param0: string, param1: javalangThrowable): void;
				public static getLogLevel(): number;
				public e(param0: string, param1: javalangThrowable): void;
				public i(param0: string): void;
				public v(param0: string): void;
				public w(param0: string, param1: javalangThrowable): void;
				public static getLogger(param0: javalangClass): com.twilio.voice.Logger;
			}
		}
	}
}

/// <reference path="./com.twilio.voice.impl.useragent.config.LoggingConfig.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class LoggingCommand {
				public constructor(param0: com.twilio.voice.impl.useragent.config.LoggingConfig);
				public run(): void;
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class MessageException extends com.twilio.voice.VoiceException {
				public static InvalidDataException: com.twilio.voice.MessageException;
				public constructor(param0: number, param1: string, param2: string);
			}
		}
	}
}

/// <reference path="./com.twilio.voice.CallInvite.d.ts" />
/// <reference path="./com.twilio.voice.MessageException.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class MessageListener {
				/**
				 * Constructs a new instance of the com.twilio.voice.MessageListener interface with the provided implementation.
				 */
				public constructor(implementation: {
					onCallInvite(param0: com.twilio.voice.CallInvite): void;
					onError(param0: com.twilio.voice.MessageException): void;
				});
				public onCallInvite(param0: com.twilio.voice.CallInvite): void;
				public onError(param0: com.twilio.voice.MessageException): void;
			}
		}
	}
}

import orgjsonJSONArray = org.json.JSONArray;
/// <reference path="./org.json.JSONArray.d.ts" />
/// <reference path="./org.json.JSONObject.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class MetricEvent extends com.twilio.voice.EventMetadata {
				public getPayload(): orgjsonJSONArray;
				public setPayload(param0: orgjsonJSONArray): void;
				public addStatsToPayload(param0: orgjsonJSONObject): void;
				public toJSONObject(): orgjsonJSONObject;
			}
			export module MetricEvent {
				export class Builder {
				}
			}
		}
	}
}

declare module com {
	export module twilio {
		export module voice {
			export class MetricEventConstants {
			}
			export module MetricEventConstants {
				export class MetricEventKeys {
					public static PACKETS_RECEIVED: string;
					public static PACKETS_LOST: string;
					public static PACKETS_LOST_FRACTION: string;
					public static TOTAL_PACKETS_SENT: string;
					public static TOTAL_PACKETS_RECEIVED: string;
					public static TOTAL_PACKETS_LOST: string;
					public static TOTAL_BYTES_RECEIVED: string;
					public static TOTAL_BYTES_SENT: string;
					public static JITTER: string;
					public static RTT: string;
					public static AUDIO_INPUT_LEVEL: string;
					public static AUDIO_OUTPUT_LEVEL: string;
					public static MOS: string;
				}
				export class Thresholds {
					public static MOS_THRESHOLD_NAME: string;
					public static RTT_THRESHOLD_NAME: string;
					public static JITTER_THRESHOLD_NAME: string;
					public static PACKET_FRACTION_LOSS_MIN_THRESHOLD_NAME: string;
					public static AUDIO_INPUT_CONSTANT_MAX_DURATIOTN: string;
					public static AUDIO_OUTPUT_CONSTANT_MAX_DURATIOTN: string;
				}
				export class ThresholdsValue {
					public static MIN_MOS_SCORE_THRESHOLD: number;
					public static MAX_DURATION_CONSTANT_AUDIO_INPUT_LEVEL: number;
					public static MAX_DURATION_CONSTANT_AUDIO_OUTPUT_LEVEL: number;
					public static MAX_PACKET_LOST_FRACTION: number;
					public static MAX_JITTER_THRESHOLD: number;
					public static MAX_RTT_THRESHOLD: number;
				}
			}
		}
	}
}

declare module com {
	export module twilio {
		export module voice {
			export class MetricEventKeys {
				public static TIMESTAMP_MS: string;
				public static CALL_SID: string;
				public static PACKETS_RECEIVED: string;
				public static PACKETS_LOST: string;
				public static PACKETS_LOST_FRACTION: string;
				public static TOTAL_PACKETS_SENT: string;
				public static TOTAL_PACKETS_RECEIVED: string;
				public static TOTAL_PACKETS_LOST: string;
				public static TOTAL_BYTES_RECEIVED: string;
				public static TOTAL_BYTES_SENT: string;
				public static JITTER: string;
				public static RTT: string;
				public static AUDIO_INPUT_LEVEL: string;
				public static AUDIO_OUTPUT_LEVEL: string;
				public static MOS: string;
			}
			export module MetricEventKeys {
				export class Thresholds {
					public static MOS_THRESHOLD_NAME: string;
					public static RTT_THRESHOLD_NAME: string;
					public static JITTER_THRESHOLD_NAME: string;
					public static PACKET_FRACTION_LOSS_MIN_THRESHOLD_NAME: string;
					public static AUDIO_INPUT_CONSTANT_MAX_DURATIOTN: string;
					public static AUDIO_OUTPUT_CONSTANT_MAX_DURATIOTN: string;
				}
			}
		}
	}
}

declare module com {
	export module twilio {
		export module voice {
			export class MonitorThresholds {
			}
			export module MonitorThresholds {
				export class Builder {
				}
			}
		}
	}
}

/// <reference path="./com.twilio.voice.InternalCall.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class MuteCallCommand {
				public run(): void;
				public constructor(param0: com.twilio.voice.InternalCall, param1: boolean);
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class NetworkCommand {
				public constructor(param0: com.twilio.voice.NetworkCommand.Event);
				public run(): void;
			}
			export module NetworkCommand {
				export class Event {
					public static CHANGE: com.twilio.voice.NetworkCommand.Event;
					public static DISCONNECT: com.twilio.voice.NetworkCommand.Event;
					public static values(): native.Array<com.twilio.voice.NetworkCommand.Event>;
					public static valueOf(param0: string): com.twilio.voice.NetworkCommand.Event;
				}
			}
		}
	}
}

/// <reference path="./com.twilio.voice.InternalCall.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.Map.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class OutgoingCallCommand extends com.twilio.voice.CallCommand {
				public createTwilioHeaders(): javautilMap;
				public constructor(param0: string, param1: string, param2: com.twilio.voice.InternalCall, param3: javautilMap);
				public run(): void;
			}
		}
	}
}

declare module com {
	export module twilio {
		export module voice {
			export class PublisherMetadata {
				public static PUBLISHER_META_DATA: string;
				public static CLIENT_ADDRESS: string;
				public static OS_NAME: string;
				public static OS_VERSION: string;
				public static DEVICE_MODEL: string;
				public static DEVICE_VENDOR: string;
				public static DEVICE_TYPE: string;
				public static CPU_ARCHITECTURE: string;
			}
		}
	}
}

/// <reference path="./com.twilio.voice.RTCStatsSample.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.HashMap.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class RTCMonitorCommand {
				public run(): void;
			}
			export module RTCMonitorCommand {
				export class ComparisonType {
					public static MIN: com.twilio.voice.RTCMonitorCommand.ComparisonType;
					public static MAX: com.twilio.voice.RTCMonitorCommand.ComparisonType;
					public static MAXCONSTANTDURATION: com.twilio.voice.RTCMonitorCommand.ComparisonType;
					public static values(): native.Array<com.twilio.voice.RTCMonitorCommand.ComparisonType>;
					public static valueOf(param0: string): com.twilio.voice.RTCMonitorCommand.ComparisonType;
				}
				export class Listener {
					/**
					 * Constructs a new instance of the com.twilio.voice.RTCMonitorCommand$Listener interface with the provided implementation.
					 */
					public constructor(implementation: {
						onWarning(param0: javautilHashMap): void;
						onWarningCleared(param0: com.twilio.voice.EventPayload.WarningName): void;
						onSample(param0: com.twilio.voice.RTCStatsSample): void;
					});
					public onSample(param0: com.twilio.voice.RTCStatsSample): void;
					public onWarningCleared(param0: com.twilio.voice.EventPayload.WarningName): void;
					public onWarning(param0: javautilHashMap): void;
				}
			}
		}
	}
}

/// <reference path="./com.twilio.voice.RTCStatsSample.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class RTCStatsProvider {
				/**
				 * Constructs a new instance of the com.twilio.voice.RTCStatsProvider interface with the provided implementation.
				 */
				public constructor(implementation: {
					getStats(): com.twilio.voice.RTCStatsSample;
				});
				public getStats(): com.twilio.voice.RTCStatsSample;
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./org.json.JSONObject.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class RTCStatsSample {
				public getMosScore(): number;
				public setCallSid(param0: string): void;
				public getJitter(): number;
				public getRtt(): number;
				public getTotalPacketsLost(): number;
				public toString(): string;
				public getTotalBytesReceived(): number;
				public getAudioInputLevel(): number;
				public constructor();
				public getFractionPacketLoss(): number;
				public constructor(param0: com.twilio.voice.RTCStatsSample, param1: com.twilio.voice.RTCStatsSample);
				public getPacketsReceived(): number;
				public getCallSid(): string;
				public getTimestamp(): string;
				public toJson(): orgjsonJSONObject;
				public getPacketsLost(): number;
				public getTotalPacketsReceived(): number;
				public getPacketsSent(): number;
				public getAudioOutputLevel(): number;
				public getTotalBytesSent(): number;
				public getTimestampMillis(): number;
				public getTotalPacketsSent(): number;
				public getCurrrentInboundPackets(): number;
			}
		}
	}
}

/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./com.twilio.voice.RegistrationListener.d.ts" />
/// <reference path="./com.twilio.voice.UnregistrationListener.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class Registrar {
				public onSuccess(param0: string): void;
				public unregister(param0: com.twilio.voice.UnregistrationListener): void;
				public register(param0: com.twilio.voice.RegistrationListener): void;
				public onError(param0: number, param1: string): void;
				public constructor(param0: androidcontentContext, param1: string, param2: string, param3: string);
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class RegistrarListener {
				/**
				 * Constructs a new instance of the com.twilio.voice.RegistrarListener interface with the provided implementation.
				 */
				public constructor(implementation: {
					onSuccess(param0: string): void;
					onError(param0: number, param1: string): void;
				});
				public onSuccess(param0: string): void;
				public onError(param0: number, param1: string): void;
			}
		}
	}
}

/// <reference path="./com.twilio.voice.Registration.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./org.json.JSONArray.d.ts" />
/// <reference path="./org.json.JSONObject.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class Registration {
				public toJson(): orgjsonJSONObject;
				public constructor(param0: string, param1: string);
			}
			export module Registration {
				export class MessageTypes {
					public toJson(): orgjsonJSONArray;
				}
				export class RegistrationData {
					public toJson(): orgjsonJSONObject;
					public constructor(param0: com.twilio.voice.Registration, param1: string);
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class RegistrationException extends com.twilio.voice.VoiceException {
				public static REGISTRATION_ERROR_CODE: number;
				public constructor(param0: number, param1: string, param2: string);
			}
		}
	}
}

/// <reference path="./com.twilio.voice.RegistrationException.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class RegistrationListener {
				/**
				 * Constructs a new instance of the com.twilio.voice.RegistrationListener interface with the provided implementation.
				 */
				public constructor(implementation: {
					onRegistered(param0: string, param1: string): void;
					onError(param0: com.twilio.voice.RegistrationException, param1: string, param2: string): void;
				});
				public onRegistered(param0: string, param1: string): void;
				public onError(param0: com.twilio.voice.RegistrationException, param1: string, param2: string): void;
			}
		}
	}
}

/// <reference path="./com.twilio.voice.InternalCall.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.Map.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class RejectCallCommand {
				public constructor(param0: string, param1: string, param2: com.twilio.voice.InternalCall);
				public run(): void;
				public createTwilioHeaders(param0: string): javautilMap;
			}
		}
	}
}

/// <reference path="./com.twilio.voice.InternalCall.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class SendDigitsCommand {
				public run(): void;
				public constructor(param0: com.twilio.voice.InternalCall, param1: string);
			}
			export module SendDigitsCommand {
				export class ToneDigit {
					public static D0: com.twilio.voice.SendDigitsCommand.ToneDigit;
					public static D1: com.twilio.voice.SendDigitsCommand.ToneDigit;
					public static D2: com.twilio.voice.SendDigitsCommand.ToneDigit;
					public static D3: com.twilio.voice.SendDigitsCommand.ToneDigit;
					public static D4: com.twilio.voice.SendDigitsCommand.ToneDigit;
					public static D5: com.twilio.voice.SendDigitsCommand.ToneDigit;
					public static D6: com.twilio.voice.SendDigitsCommand.ToneDigit;
					public static D7: com.twilio.voice.SendDigitsCommand.ToneDigit;
					public static D8: com.twilio.voice.SendDigitsCommand.ToneDigit;
					public static D9: com.twilio.voice.SendDigitsCommand.ToneDigit;
					public static POUND: com.twilio.voice.SendDigitsCommand.ToneDigit;
					public static STAR: com.twilio.voice.SendDigitsCommand.ToneDigit;
					public static WAIT: com.twilio.voice.SendDigitsCommand.ToneDigit;
					public static values(): native.Array<com.twilio.voice.SendDigitsCommand.ToneDigit>;
					public static valueOf(param0: string): com.twilio.voice.SendDigitsCommand.ToneDigit;
				}
			}
		}
	}
}

import javalangThread = java.lang.Thread;
/// <reference path="./java.lang.Thread.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class ThreadUtils {
			}
			export module ThreadUtils {
				export class ThreadChecker {
					public constructor(param0: javalangThread);
					public checkIsOnValidThread(): void;
				}
			}
		}
	}
}

/// <reference path="./com.twilio.voice.RegistrationException.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class UnregistrationListener {
				/**
				 * Constructs a new instance of the com.twilio.voice.UnregistrationListener interface with the provided implementation.
				 */
				public constructor(implementation: {
					onUnregistered(param0: string, param1: string): void;
					onError(param0: com.twilio.voice.RegistrationException, param1: string, param2: string): void;
				});
				public onUnregistered(param0: string, param1: string): void;
				public onError(param0: com.twilio.voice.RegistrationException, param1: string, param2: string): void;
			}
		}
	}
}

/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./com.twilio.voice.impl.TwilioConfig.d.ts" />
/// <reference path="./com.twilio.voice.impl.session.Account.d.ts" />
/// <reference path="./com.twilio.voice.impl.session.Transport.d.ts" />
/// <reference path="./com.twilio.voice.impl.useragent.config.AccountConfig.d.ts" />
/// <reference path="./com.twilio.voice.impl.useragent.config.LoggingConfig.d.ts" />
/// <reference path="./com.twilio.voice.impl.useragent.config.TransportConfig.d.ts" />
/// <reference path="./com.twilio.voice.impl.useragent.config.UserAgentConfig.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class UserAgent {
				public static get(): com.twilio.voice.UserAgent;
				public createTransport(param0: com.twilio.voice.impl.session.Transport.Type, param1: com.twilio.voice.impl.useragent.config.TransportConfig): com.twilio.voice.impl.session.Transport;
				public destroy(param0: androidcontentContext): void;
				public getAccount(): com.twilio.voice.impl.session.Account;
				public static get(param0: androidcontentContext, param1: com.twilio.voice.impl.TwilioConfig, param2: com.twilio.voice.impl.useragent.config.UserAgentConfig): com.twilio.voice.UserAgent;
				public releaseTransports(): void;
				public restart(): void;
				public deleteAccount(param0: com.twilio.voice.impl.session.Account): void;
				public getDNSAddress(): native.Array<string>;
				public updateNameservers(): void;
				public addAccount(param0: com.twilio.voice.impl.useragent.config.AccountConfig, param1: boolean): com.twilio.voice.impl.session.Account;
				public reconfigureLogging(param0: com.twilio.voice.impl.useragent.config.LoggingConfig): void;
				public getSipUrl(param0: string): string;
			}
		}
	}
}

declare module com {
	export module twilio {
		export module voice {
			export class Utils {
			}
		}
	}
}

import androidosBundle = android.os.Bundle;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.os.Bundle.d.ts" />
/// <reference path="./com.twilio.voice.Call.d.ts" />
/// <reference path="./com.twilio.voice.LogLevel.d.ts" />
/// <reference path="./com.twilio.voice.LogModule.d.ts" />
/// <reference path="./com.twilio.voice.MessageListener.d.ts" />
/// <reference path="./com.twilio.voice.RegistrationListener.d.ts" />
/// <reference path="./com.twilio.voice.UnregistrationListener.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.Map.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export abstract class Voice {
				public static call(param0: androidcontentContext, param1: string, param2: javautilMap, param3: com.twilio.voice.Call.Listener): com.twilio.voice.Call;
				public static setModuleLogLevel(param0: com.twilio.voice.LogModule, param1: com.twilio.voice.LogLevel): void;
				public static handleMessage(param0: androidcontentContext, param1: javautilMap, param2: com.twilio.voice.MessageListener): void;
				public static getModuleLogLevel(param0: com.twilio.voice.LogModule): com.twilio.voice.LogLevel;
				public constructor();
				public static register(param0: androidcontentContext, param1: string, param2: com.twilio.voice.Voice.RegistrationChannel, param3: string, param4: com.twilio.voice.RegistrationListener): void;
				public static getLogLevel(): com.twilio.voice.LogLevel;
				public static getRegion(): string;
				public static setLogLevel(param0: com.twilio.voice.LogLevel): void;
				public static handleMessage(param0: androidcontentContext, param1: androidosBundle, param2: com.twilio.voice.MessageListener): void;
				public static setRegion(param0: string): void;
				public static unregister(param0: androidcontentContext, param1: string, param2: com.twilio.voice.Voice.RegistrationChannel, param3: string, param4: com.twilio.voice.UnregistrationListener): void;
				public static getVersion(): string;
			}
			export module Voice {
				export class RegistrationChannel {
					public static FCM: com.twilio.voice.Voice.RegistrationChannel;
					public static GCM: com.twilio.voice.Voice.RegistrationChannel;
					public static valueOf(param0: string): com.twilio.voice.Voice.RegistrationChannel;
					public toString(): string;
					public static values(): native.Array<com.twilio.voice.Voice.RegistrationChannel>;
				}
			}
		}
	}
}

declare module com {
	export module twilio {
		export module voice {
			export class VoiceConstants {
				public static VOICE_TWI_MESSAGE_TYPE: string;
				public static MESSAGE_TYPE_CALL: string;
				public static MESSAGE_TYPE_CANCEL: string;
				public static CALL_SID: string;
				public static FROM: string;
				public static TO: string;
				public static BRIDGE_TOKEN: string;
				public static ACCOUNT_SID: string;
				public static X_TWILIO_HEADER_ACCESSTOKEN: string;
				public static X_TWILIO_HEADER_CLIENT: string;
				public static X_TWILIO_HEADER_CLIENT_VERSION: string;
				public static X_TWILIO_HEADER_BRIDGE_TOKEN: string;
				public static X_TWILIO_HEADER_REJECT_CAUSE: string;
				public static X_TWILIO_HEADER_PARAMS: string;
				public static X_TWILIO_HEADER_USER_AGENT: string;
				public static X_TWILIO_HEADER_USER_AGENT_VALUE: string;
				public static CLIENT_VERSION: number;
				public static DEFAULT_SIP_USER_NAME: string;
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export abstract class VoiceException {
				public static EXCEPTION_INVALID_ACCESS_TOKEN: number;
				public static EXCEPTION_INVALID_ACCESS_TOKEN_HEADER: number;
				public static EXCEPTION_INVALID_ISSUER_SUBJECT: number;
				public static EXCEPTION_INVALID_ACCESS_TOKEN_EXPIRY: number;
				public static EXCEPTION_INVALID_ACCESS_TOKEN_NOT_VALID_YET: number;
				public static EXCEPTION_INVALID_ACCESS_TOKEN_GRANT: number;
				public static EXCEPTION_INVALID_SIGNATURE: number;
				public static EXCEPTION_AUTH_FAILURE: number;
				public static EXCEPTION_INVALID_TTL: number;
				public static EXCEPTION_INVALID_TOKEN: number;
				public getExplanation(): string;
				public getMessage(): string;
				public getErrorCode(): number;
				public constructor(param0: number, param1: string, param2: string);
			}
		}
	}
}

import javaxnetsslHostnameVerifier = javax.net.ssl.HostnameVerifier;
import javaxnetsslHttpsURLConnection = javax.net.ssl.HttpsURLConnection;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./javax.net.ssl.HostnameVerifier.d.ts" />
/// <reference path="./javax.net.ssl.HttpsURLConnection.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class VoiceURLConnection {
				public static METHOD_TYPE_POST: string;
				public static METHOD_TYPE_DELETE: string;
				public static getHostnameVerifier(param0: string, param1: string): javaxnetsslHostnameVerifier;
				public static create(param0: androidcontentContext, param1: string, param2: string, param3: string, param4: javaxnetsslHostnameVerifier): javaxnetsslHttpsURLConnection;
			}
		}
	}
}

/// <reference path="./com.twilio.voice.WarningEventConstants.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export class WarningEventConstants {
			}
			export module WarningEventConstants {
				export class WarningEventKeys {
					public static WARNING_NAME: string;
					public static WARNING_PARAM: string;
					public static RECENT_SAMPLES: string;
					public static RECENT_SAMPLE_VALUE: string;
					public static THRESHOLD_KEY: string;
					public constructor(param0: com.twilio.voice.WarningEventConstants);
				}
			}
		}
	}
}

/// <reference path="./com.twilio.voice.impl.TwilioConfig.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export class TwilioConfig {
					public transportConfig: com.twilio.voice.impl.TwilioConfig.TwilioTransportConfig;
					public mediaConfig: com.twilio.voice.impl.TwilioConfig.TwilioMediaConfig;
					public constructor();
				}
				export module TwilioConfig {
					export class TwilioMediaConfig {
						public vadEnabled: boolean;
						public voiceQuality: number;
						public echoCancellationTailMS: number;
						public soundRecordLatencyMS: number;
						public soundPlaybackLatencyMS: number;
						public constructor(param0: com.twilio.voice.impl.TwilioConfig);
					}
					export class TwilioTransportConfig {
						public transportType: com.twilio.voice.impl.session.Transport.Type;
						public constructor(param0: com.twilio.voice.impl.TwilioConfig);
					}
				}
			}
		}
	}
}

declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module session {
					export class Account {
					}
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module session {
					export class CredentialInfo {
						public constructor(param0: string, param1: string, param2: string, param3: com.twilio.voice.impl.session.CredentialInfo.DataType, param4: string);
					}
					export module CredentialInfo {
						export class DataType {
							public static PLAIN_PASSWD: com.twilio.voice.impl.session.CredentialInfo.DataType;
							public static values(): native.Array<com.twilio.voice.impl.session.CredentialInfo.DataType>;
							public static valueOf(param0: string): com.twilio.voice.impl.session.CredentialInfo.DataType;
						}
					}
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module session {
					export abstract class Event {
						public getType(): com.twilio.voice.impl.session.Event.Type;
						public constructor(param0: com.twilio.voice.impl.session.Event.Type);
					}
					export module Event {
						export class Type {
							public static UNKNOWN: com.twilio.voice.impl.session.Event.Type;
							public static TIMER: com.twilio.voice.impl.session.Event.Type;
							public static TX_MSG: com.twilio.voice.impl.session.Event.Type;
							public static RX_MSG: com.twilio.voice.impl.session.Event.Type;
							public static TRANSPORT_ERROR: com.twilio.voice.impl.session.Event.Type;
							public static TSX_STATE: com.twilio.voice.impl.session.Event.Type;
							public static USER: com.twilio.voice.impl.session.Event.Type;
							public static values(): native.Array<com.twilio.voice.impl.session.Event.Type>;
							public static valueOf(param0: string): com.twilio.voice.impl.session.Event.Type;
						}
					}
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module session {
					export class InviteState {
						public static NULL: com.twilio.voice.impl.session.InviteState;
						public static CALLING: com.twilio.voice.impl.session.InviteState;
						public static INCOMING: com.twilio.voice.impl.session.InviteState;
						public static EARLY: com.twilio.voice.impl.session.InviteState;
						public static CONNECTING: com.twilio.voice.impl.session.InviteState;
						public static CONFIRMED: com.twilio.voice.impl.session.InviteState;
						public static DISCONNECTED: com.twilio.voice.impl.session.InviteState;
						public static values(): native.Array<com.twilio.voice.impl.session.InviteState>;
						public static valueOf(param0: string): com.twilio.voice.impl.session.InviteState;
					}
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.Map.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module session {
					export class Message {
						public constructor(param0: string, param1: string, param2: javautilMap);
						public constructor(param0: number, param1: string, param2: javautilMap);
						public getStatusLine(): com.twilio.voice.impl.session.Message.StatusLine;
						public toString(): string;
						public getHeaders(): javautilMap;
					}
					export module Message {
						export class RequestLine {
							public getMethod(): string;
							public getUri(): string;
						}
						export class StatusLine {
							public getCode(): number;
							public getReason(): string;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module session {
					export class NativeWorkerThread {
						public constructor();
						public destroy(): void;
					}
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module session {
					export class SessionException {
						public static PJ_SUCCESS: number;
						public static PJ_EUNKNOWN: number;
						public getStatusCode(): number;
						public constructor();
						public constructor(param0: string, param1: number);
						public constructor(param0: string);
					}
				}
			}
		}
	}
}

/// <reference path="./java.lang.Object.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module session {
					export class Transport {
						public equals(param0: javalangObject): boolean;
						public close(param0: boolean): void;
					}
					export module Transport {
						export class Type {
							public static UNSPECIFIED: com.twilio.voice.impl.session.Transport.Type;
							public static UDP: com.twilio.voice.impl.session.Transport.Type;
							public static TCP: com.twilio.voice.impl.session.Transport.Type;
							public static TLS: com.twilio.voice.impl.session.Transport.Type;
							public static SCTP: com.twilio.voice.impl.session.Transport.Type;
							public static LOOP: com.twilio.voice.impl.session.Transport.Type;
							public static LOOP_DGRAM: com.twilio.voice.impl.session.Transport.Type;
							public static START_OTHER: com.twilio.voice.impl.session.Transport.Type;
							public static IPV6: com.twilio.voice.impl.session.Transport.Type;
							public static UDP6: com.twilio.voice.impl.session.Transport.Type;
							public static TCP6: com.twilio.voice.impl.session.Transport.Type;
							public static TLS6: com.twilio.voice.impl.session.Transport.Type;
							public static values(): native.Array<com.twilio.voice.impl.session.Transport.Type>;
							public static valueOf(param0: string): com.twilio.voice.impl.session.Transport.Type;
						}
					}
				}
			}
		}
	}
}

/// <reference path="./com.twilio.voice.impl.session.Message.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module session {
					export module events {
						export class RxMessageEvent extends com.twilio.voice.impl.session.Event {
						}
						export module RxMessageEvent {
							export class RxData {
								public getMessage(): com.twilio.voice.impl.session.Message;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module session {
					export module events {
						export class TimerEvent extends com.twilio.voice.impl.session.Event {
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module session {
					export module events {
						export class TransportErrorEvent extends com.twilio.voice.impl.session.Event {
						}
					}
				}
			}
		}
	}
}

/// <reference path="./java.lang.Object.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module session {
					export module events {
						export class TsxStateEvent extends com.twilio.voice.impl.session.Event {
							public getSourceEventType(): com.twilio.voice.impl.session.Event.Type;
							public getSourceEventData(): javalangObject;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module session {
					export module events {
						export class TxMessageEvent extends com.twilio.voice.impl.session.Event {
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module session {
					export module events {
						export class UnknownEvent extends com.twilio.voice.impl.session.Event {
							public constructor();
							public constructor(param0: com.twilio.voice.impl.session.Event.Type);
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module session {
					export module events {
						export class UserEvent extends com.twilio.voice.impl.session.Event {
						}
					}
				}
			}
		}
	}
}

/// <reference path="./com.twilio.voice.RTCStatsSample.d.ts" />
/// <reference path="./com.twilio.voice.impl.session.Account.d.ts" />
/// <reference path="./com.twilio.voice.impl.session.InviteState.d.ts" />
/// <reference path="./com.twilio.voice.impl.useragent.MessageData.d.ts" />
/// <reference path="./java.lang.Object.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module useragent {
					export class Call {
						public dialDTMF(param0: string): void;
						public answer(param0: number, param1: string, param2: com.twilio.voice.impl.useragent.MessageData): void;
						public getAccount(): com.twilio.voice.impl.session.Account;
						public close(): void;
						public connectSoundDevice(): void;
						public constructor(param0: com.twilio.voice.impl.session.Account, param1: string, param2: javalangObject);
						public getCallInfo(): com.twilio.voice.impl.useragent.Call.Info;
						public reject(param0: number, param1: string, param2: com.twilio.voice.impl.useragent.MessageData): void;
						public getStats(): com.twilio.voice.RTCStatsSample;
						public getUri(): string;
						public mute(param0: boolean): void;
						public answer(): void;
						public hangup(): void;
						public sendReinvite(param0: com.twilio.voice.impl.session.Account, param1: string): void;
						public makeCall(param0: com.twilio.voice.impl.session.Account, param1: string, param2: com.twilio.voice.impl.useragent.MessageData, param3: boolean, param4: boolean): void;
						public getUserData(): javalangObject;
						public constructor(param0: com.twilio.voice.impl.session.Account, param1: string, param2: javalangObject, param3: com.twilio.voice.impl.useragent.MessageData, param4: boolean, param5: boolean);
						public constructor(param0: number, param1: com.twilio.voice.impl.session.Account, param2: string);
						public reject(): void;
					}
					export module Call {
						export class Info {
							public getMediaStatus(): com.twilio.voice.impl.useragent.Call.MediaStatus;
							public getState(): com.twilio.voice.impl.session.InviteState;
						}
						export class MediaStatus {
							public static NONE: com.twilio.voice.impl.useragent.Call.MediaStatus;
							public static ACTIVE: com.twilio.voice.impl.useragent.Call.MediaStatus;
							public static LOCAL_HOLD: com.twilio.voice.impl.useragent.Call.MediaStatus;
							public static REMOTE_HOLD: com.twilio.voice.impl.useragent.Call.MediaStatus;
							public static ERROR: com.twilio.voice.impl.useragent.Call.MediaStatus;
							public static values(): native.Array<com.twilio.voice.impl.useragent.Call.MediaStatus>;
							public static valueOf(param0: string): com.twilio.voice.impl.useragent.Call.MediaStatus;
						}
					}
				}
			}
		}
	}
}

import javautilList = java.util.List;
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.List.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module useragent {
					export class Codec {
						public getPriority(): com.twilio.voice.impl.useragent.Codec.Priority;
						public static getAll(): javautilList;
						public static get(param0: string): javautilList;
						public static setPriorityByPrefix(param0: string, param1: com.twilio.voice.impl.useragent.Codec.Priority): void;
						public setPriority(param0: com.twilio.voice.impl.useragent.Codec.Priority): void;
						public getCodecId(): string;
					}
					export module Codec {
						export class Priority {
							public static DISABLED: com.twilio.voice.impl.useragent.Codec.Priority;
							public static LOWEST: com.twilio.voice.impl.useragent.Codec.Priority;
							public static NORMAL: com.twilio.voice.impl.useragent.Codec.Priority;
							public static NEXT_HIGHER: com.twilio.voice.impl.useragent.Codec.Priority;
							public static HIGHEST: com.twilio.voice.impl.useragent.Codec.Priority;
							public static valueOf(param0: string): com.twilio.voice.impl.useragent.Codec.Priority;
							public static values(): native.Array<com.twilio.voice.impl.useragent.Codec.Priority>;
							public getVal(): number;
						}
					}
				}
			}
		}
	}
}

/// <reference path="./java.lang.Object.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module useragent {
					export class ConfPort {
						public getTxSignalLevel(): number;
						public adjustRxLevel(param0: number): void;
						public static getSoundDevice(): com.twilio.voice.impl.useragent.ConfPort;
						public equals(param0: javalangObject): boolean;
						public hashCode(): number;
						public adjustTxLevel(param0: number): void;
						public getRxSignalLevel(): number;
						public disconnect(param0: com.twilio.voice.impl.useragent.ConfPort): void;
						public connect(param0: com.twilio.voice.impl.useragent.ConfPort): void;
					}
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.Map.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module useragent {
					export class MessageData {
						public getBody(): string;
						public getContentType(): string;
						public constructor(param0: javautilMap, param1: string, param2: string);
						public constructor(param0: javautilMap);
						public getHeaders(): javautilMap;
					}
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module useragent {
					export abstract class Utils {
						public constructor();
						public static verifyUrl(param0: string): boolean;
						public static getIPAddress(param0: boolean): string;
					}
				}
			}
		}
	}
}

/// <reference path="./com.twilio.voice.impl.useragent.config.TransportConfig.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.List.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module useragent {
					export module config {
						export class AccountConfig {
							public constructor(param0: string, param1: javautilList, param2: boolean, param3: com.twilio.voice.impl.useragent.config.TransportConfig);
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module useragent {
					export module config {
						export class LoggingConfig {
							public consoleLevel: number;
							public constructor();
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module useragent {
					export module config {
						export class MediaConfig {
							public constructor(param0: boolean, param1: number, param2: number, param3: number, param4: number);
						}
					}
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module useragent {
					export module config {
						export class PJSIPLogLevel {
							public static OFF: com.twilio.voice.impl.useragent.config.PJSIPLogLevel;
							public static ERROR: com.twilio.voice.impl.useragent.config.PJSIPLogLevel;
							public static WARNING: com.twilio.voice.impl.useragent.config.PJSIPLogLevel;
							public static INFO: com.twilio.voice.impl.useragent.config.PJSIPLogLevel;
							public static DEBUG: com.twilio.voice.impl.useragent.config.PJSIPLogLevel;
							public static TRACE: com.twilio.voice.impl.useragent.config.PJSIPLogLevel;
							public static VERBOSE: com.twilio.voice.impl.useragent.config.PJSIPLogLevel;
							public static valueOf(param0: string): com.twilio.voice.impl.useragent.config.PJSIPLogLevel;
							public static values(): native.Array<com.twilio.voice.impl.useragent.config.PJSIPLogLevel>;
						}
					}
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module useragent {
					export module config {
						export class TransportConfig {
							public constructor();
							public getPort(): number;
							public constructor(param0: number, param1: com.twilio.voice.impl.useragent.config.TransportConfig.QosType);
							public getQosType(): com.twilio.voice.impl.useragent.config.TransportConfig.QosType;
							public getTLSSettings(): com.twilio.voice.impl.useragent.config.TransportConfig.TLSSettings;
							public constructor(param0: com.twilio.voice.impl.useragent.config.TransportConfig.TLSSettings);
						}
						export module TransportConfig {
							export class QosType {
								public static BEST_EFFORT: com.twilio.voice.impl.useragent.config.TransportConfig.QosType;
								public static BACKGROUND: com.twilio.voice.impl.useragent.config.TransportConfig.QosType;
								public static VIDEO: com.twilio.voice.impl.useragent.config.TransportConfig.QosType;
								public static VOICE: com.twilio.voice.impl.useragent.config.TransportConfig.QosType;
								public static CONTROL: com.twilio.voice.impl.useragent.config.TransportConfig.QosType;
								public static valueOf(param0: string): com.twilio.voice.impl.useragent.config.TransportConfig.QosType;
								public static values(): native.Array<com.twilio.voice.impl.useragent.config.TransportConfig.QosType>;
							}
							export class TLSSettings {
								public sslMethod: com.twilio.voice.impl.useragent.config.TransportConfig.TLSSettings.SSLMethod;
								public verifyServer: boolean;
								public constructor();
							}
							export module TLSSettings {
								export class SSLMethod {
									public static UNSPECIFIED: com.twilio.voice.impl.useragent.config.TransportConfig.TLSSettings.SSLMethod;
									public static TLSV1: com.twilio.voice.impl.useragent.config.TransportConfig.TLSSettings.SSLMethod;
									public static SSLV2: com.twilio.voice.impl.useragent.config.TransportConfig.TLSSettings.SSLMethod;
									public static SSLV3: com.twilio.voice.impl.useragent.config.TransportConfig.TLSSettings.SSLMethod;
									public static SSLV23: com.twilio.voice.impl.useragent.config.TransportConfig.TLSSettings.SSLMethod;
									public static values(): native.Array<com.twilio.voice.impl.useragent.config.TransportConfig.TLSSettings.SSLMethod>;
									public static valueOf(param0: string): com.twilio.voice.impl.useragent.config.TransportConfig.TLSSettings.SSLMethod;
								}
							}
						}
					}
				}
			}
		}
	}
}

/// <reference path="./com.twilio.voice.impl.session.Event.d.ts" />
/// <reference path="./com.twilio.voice.impl.useragent.Call.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module twilio {
		export module voice {
			export module impl {
				export module useragent {
					export module config {
						export class UserAgentConfig {
							public constructor(param0: com.twilio.voice.impl.useragent.config.UserAgentConfig.Callbacks, param1: number, param2: string);
						}
						export module UserAgentConfig {
							export class Callbacks {
								/**
								 * Constructs a new instance of the com.twilio.voice.impl.useragent.config.UserAgentConfig$Callbacks interface with the provided implementation.
								 */
								public constructor(implementation: {
									onCallState(param0: com.twilio.voice.impl.useragent.Call, param1: com.twilio.voice.impl.session.Event): void;
									onCallMediaState(param0: com.twilio.voice.impl.useragent.Call): void;
									onTransactionState(param0: com.twilio.voice.impl.useragent.Call, param1: string): void;
								});
								public onTransactionState(param0: com.twilio.voice.impl.useragent.Call, param1: string): void;
								public onCallState(param0: com.twilio.voice.impl.useragent.Call, param1: com.twilio.voice.impl.session.Event): void;
								public onCallMediaState(param0: com.twilio.voice.impl.useragent.Call): void;
							}
						}
					}
				}
			}
		}
	}
}

