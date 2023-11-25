export function template(children: string = ''): string {
  return `
        {{touch}}
     <!--   <button class="toggle-visibility" #toggle_visiblity (click.outside)="onToggleVisibility()">-</button>-->
        <div #component class="component">
          <div class="state">
            <span class="strategy-box {{cdStrategyName}}">{{cdStrategyName}}</span>
            <span #cd_state_box class="cd-state-box"></span>
<!--            <span #ng_do_check_box class="ng-do-check-box">ngDoCheck</span>-->
            <span #ng_marked style="display:none">Marked</span>
          </div>
          @if(false) {
          <div class="name">
            {{name}}
          </div>
          }
          <table class="input-box">
            <tr><td colspan="2"><span #ng_on_changes_box class="ng-on-changes-box">ngOnChanges</span></td></tr>
            <tr><th>input value:</th><td class="input-value">{{inputByVal}}</td></tr>
            <tr><th>object prop:</th><td class="input-value">{{inputByRef.value}}</td></tr>
            <tr><th>observable:</th><td class="input-value">{{inputObservableValue}}</td></tr>
            <tr><th>local signal:</th><td class="input-value">{{signal()}}</td></tr>
          </table>
          <div class="control">
            <button #dc_button (click.outside)="onDetectChanges()" title="Detect changes">DC</button>
            <button #mfc_button (click.outside)="onMarkForCheck()" title="Mark for check (only applicable for 'OnPush' strategy; does not trigger change detection)">MFC</button>
            <button #detach_button (click.outside)="onDetach()" title="Detaches ChangeDetector">Detach</button>
            <button #attach_button (click.outside)="onAttach()" title="Attaches ChangeDetector">Attach</button>
            <button #signal_button title="signal update">Signal++</button>
            <button #click_button (click)="onClick()" title="Simple click action from template (ng binding)">Click</button>
          </div>
          <div class="children">
            ${children} <!-- view-children -->
            <ng-content></ng-content> <!-- content-children -->
          </div>
        </div>`;
}
