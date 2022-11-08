# Standalone broken with aot:false & dynamic component.

See [main.ts](src/main.ts), importing `platformBrowserDynamic().bootstrapModule({} as any)` fixes this.

# Ticket

[#angular/issues/47996](https://github.com/angular/angular/issues/47996)
