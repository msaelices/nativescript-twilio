export declare class TwilioAppDelegate {
}

export declare class CallDelegate extends NSObject implements TVOCallDelegate {
  callDidConnect(call: TVOCall): void;
  callDidDisconnectWithError(call: TVOCall, error: NSError): void;
  callDidFailToConnectWithError(call: TVOCall, error: NSError): void;
}