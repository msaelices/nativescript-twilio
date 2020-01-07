import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AppRoutingModule } from "./app-routing-module";
import { DataService } from "./providers/data.service";

import { AppComponent } from "./app.component";

import { CallComponent } from "./components/call/call.component";
import { HomeComponent } from "./components/home/home.component";

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    declarations: [AppComponent, CallComponent, HomeComponent],
    bootstrap: [AppComponent],
    imports: [AppRoutingModule, NativeScriptModule, NativeScriptFormsModule,],
    providers: [
        DataService,
        AppComponent
    ]
})
export class AppModule {}