import { UpperCasePipe } from "@angular/common";
import {
  Component,
  EnvironmentInjector,
  inject,
  Injectable,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { FormsModule } from "@angular/forms";

@Injectable()
class Foo {
  foo = "foo";
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  standalone: true,
  imports: [FormsModule, UpperCasePipe],
})
export class AppComponent implements OnInit {
  @ViewChild("container", { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  test = "test123";
  injector = inject(Injector);
  environement = inject(EnvironmentInjector);

  ngOnInit() {
    const component = Component({
      selector: "ddddd",
      template: 'test {{dynamic | uppercase }} but no input => <input [(ngModel)]="dynamic"/> -- {{foo.foo}}',
      styles: [":host {color: red; padding-left: 8px; display:block; }"],
      imports: [FormsModule, UpperCasePipe],
      providers: [Foo],
    })(
      class Azerty {
        dynamic = "dynamic";
        foo = inject(Foo); // OK
      }
    );
    this.container.createComponent(component);
  }
}
