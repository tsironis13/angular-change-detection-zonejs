import { enableProdMode } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppComponent } from "./app/app.component";

import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

export const isStandalone = true;

if (isStandalone) {
  bootstrapApplication(AppComponent).catch((err) => console.error(err));
} else {
  platformBrowserDynamic().bootstrapModule({} as any); // When AOT: false the import is required
}
