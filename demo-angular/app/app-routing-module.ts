import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AppComponent } from "./app.component";
import { CallComponent } from "./components/call/call.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    {
        path: "home",
        component: HomeComponent,
    },
    {
        path: "call",
        component: CallComponent
    }

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}