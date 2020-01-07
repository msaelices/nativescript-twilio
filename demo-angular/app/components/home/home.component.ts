import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import * as platformModule from "tns-core-modules/platform";
import { DataService } from "../../providers/data.service";
import {AppComponent} from '../../app.component';

@Component({
  selector: "ns-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  moduleId: module.id
})
export class HomeComponent implements OnInit {

    constructor(private dataService: DataService, private myapp: AppComponent) {

    }
    ngOnInit(): void {

    }
    onCall(): void {
      this.myapp.onCall();
    }
} 