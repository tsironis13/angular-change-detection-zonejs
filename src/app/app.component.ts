import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  standalone: true,
})
export class AppComponent implements OnInit {
  @ViewChild("container", { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  ngOnInit() {
    const component = Component({
      template: "test no",
      styles: [":host {color: red; padding-left: 8px; display:block; }"],
    })(class {});
    this.container.createComponent(component);
  }
}
