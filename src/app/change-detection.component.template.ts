export function template(children = ''): string {
  return `
        {{touch}}
        <button class="toggle-visibility" #toggle_visiblity [unpatch] (click)="toggleVisibility()">-</button>
        <div #component class="component">
          <div class="name">
            <<{{ _childType === 'ViewChild' ? 'ViewChild' : 'ContentChild'}}>> - {{name}}
          </div>
          <div class="state">
            <span class="strategy-box {{cdStrategyName}}">{{cdStrategyName}}</span>
            <span #cd_state_box class="cd-state-box"></span>
            <span #ng_do_check_box class="ng-do-check-box">ngDoCheck</span>
            <span #ng_on_changes_box class="ng-on-changes-box">ngOnChanges</span>
            <span #ng_marked style="display:none">Marked</span>
          </div>

          <table class="input-box">
            <tr><th>input value:</th><td class="input-value">{{inputByVal}}</td></tr>
            <tr><th>object prop:</th><td class="input-value">{{inputByRef?.value}}</td></tr>
            <tr><th>observable:</th><td class="input-value">{{inputObservableValue}}</td></tr>
          </table>
          <div class="control">
            <button [unpatch] (click)="onDetectChangesClick" title="Detect changes">DC</button>
            <button [unpatch] (click)="onClickMarked()" title="Mark for check (only applicable for 'OnPush' strategy; does not trigger change detection)">MFC</button>

            <input type="checkbox" #attach_checkbox hidden class="attach-toggle" />
            <button class="detach" [unpatch] (click)="onDetachClick()" title="Detaches ChangeDetector">Detach</button>
            <button class="attach" [unpatch] (click)="onAttachClick()" title="Attaches ChangeDetector">Attach</button>
            <button #click_button (click)="onClick()" title="Simple click action from template (ng binding)">Click</button>
          </div>
          <div class="children">
            ${children} <!-- view-children -->
            <ng-content></ng-content> <!-- content-children -->
          </div>
        </div>`;
}
