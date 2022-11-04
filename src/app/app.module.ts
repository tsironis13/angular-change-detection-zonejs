import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { DynamicChildrenComponent } from "./dynamic-children/dynamic-children.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, DynamicChildrenComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
