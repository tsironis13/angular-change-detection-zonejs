# Standalone broken with aot:false & dynamic component.

See [main.ts](src/main.ts), importing `platformBrowserDynamic().bootstrapModule({} as any)` fixes this.

# Ticket

[#angular/issues/47996](https://github.com/angular/angular/issues/47996)


# Also :
`[(ngModel)]` isn't working (despite importing `FormsModule`) and importing a pipe is also broken. 

Cf [#angular/issues/48034](https://github.com/angular/angular/issues/48034) 
