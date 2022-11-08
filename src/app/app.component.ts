import { ChangeDetectionStrategy, Component, Input, OnInit, VERSION, ViewChild, ViewContainerRef } from "@angular/core";

const template = "Level {{level}} <br><div #container></div><ng-content></ng-content>";

@Component({
  selector: "hello",
  template: template,
  standalone: true,
})
export class HelloComponent implements OnInit {
  @ViewChild("container", { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  @Input() level = 0;

  ngOnInit() {
    if (this.level < 4) {
      this.addChildren(ChangeDetectionStrategy.Default);
    }
  }

  addChildren(cdStrat: ChangeDetectionStrategy) {
    const component = Component({
      template: template,
      styles: [":host {color: red; padding-left: 8px; display:block; }"],
      changeDetection: cdStrat,
    })(HelloComponent);
    const componentRef = this.container.createComponent(component);
    componentRef.setInput("level", this.level + 1);
  }
}

@Component({
  selector: "app-root",
  template: 'This is static <hr> <hello [level]="0"></hello>',
  standalone: true,
  imports: [HelloComponent],
})
export class AppComponent {
  name = "Angular " + VERSION.major;
}
