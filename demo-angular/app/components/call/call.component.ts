import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import * as platformModule from "tns-core-modules/platform";
import { DataService } from "../../providers/data.service";

@Component({
  selector: "ns-call",
  templateUrl: "./call.component.html",
  styleUrls: ["./call.component.scss"],
  moduleId: module.id
})
export class CallComponent implements OnInit {
  topHeaderPaddingLeft;
  query: string = "";
  isLoading: boolean = true;

  imgWidth;

  hoursTxt: string = "00";
  minutesTxt: string = "00";
  secondsTxt: string = "00";
  mute = false;
  sound = false;
  appointment = false;

  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  timeoutId: any;

  isConnected: boolean = false;
  isDisconnected: boolean = false;

  tvOCall: any;

  senderPhone: string;
  receiverPhone: string;
  callSubscription: any;
  private _firstname: string = "Caller";
  private _lastname: string = "Name";
  private _company: string = "Company";
  private _avatar: string = "https://s3.amazonaws.com/hiveku-assets/avatars/AVATAR_10.png";

  constructor(private dataService: DataService) {

	this.dataService.callEvent.subscribe(call => {
		const customParameters = this.dataService.storage.customParameters
		this._firstname = customParameters.first_name;
		this._lastname = customParameters.last_name;
		this._avatar = customParameters.avatar;
		this._company = customParameters.company;
		this.isConnected = true;
	});

  }

  ngOnInit(): void {
    const deviceHeight: number = platformModule.screen.mainScreen.heightDIPs;
    const deviceWidth: number = platformModule.screen.mainScreen.widthDIPs;
    this.imgWidth = deviceWidth * 0.50;
  }

  get data(): any {
	return {
	  name: this._firstname + " " + this._lastname || "",
	  company: this._company || "",
	  avatar: this._avatar || ""
	};
  }


  toggleMute(): void {
	if (this.tvOCall) {
	  this.mute = !this.mute;
	  this.tvOCall.mute(this.mute);
	}
  }

  toggleSound(): void {
	// if (this.twilio) {
	//   this.sound = !this.sound;
	//   this.twilio.toggleAudioOutput(this.sound);
	// }
  }

  toggleAppointment(): void {
	this.appointment = !this.appointment;
  }

  endCall(): void {
	clearTimeout(this.timeoutId);
	if (this.tvOCall) {
	  this.tvOCall.disconnect();
	}
  }
}