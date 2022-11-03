"use strict";
(self["webpackChunkchange_detection"] = self["webpackChunkchange_detection"] || []).push([["main"],{

/***/ 5027:
/*!********************************************************!*\
  !*** ./src/app/abstract-change-detection.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractChangeDetectionComponent": () => (/* binding */ AbstractChangeDetectionComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 8947);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 3280);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 635);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 8977);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 8951);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 9337);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 116);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expand-collapse.service */ 3869);




class AbstractChangeDetectionComponent {
    constructor(name, _level, _hostRef, _colorService, _dirtyCheckColoringService, _expandCollapseService, _cd, _zone, cdStrategy) {
        this.name = name;
        this._level = _level;
        this._hostRef = _hostRef;
        this._colorService = _colorService;
        this._dirtyCheckColoringService = _dirtyCheckColoringService;
        this._expandCollapseService = _expandCollapseService;
        this._cd = _cd;
        this._zone = _zone;
        this._destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
        this._destroyInputObservable$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
        this._expandCollapseState = _expand_collapse_service__WEBPACK_IMPORTED_MODULE_0__.State.Expand;
        this._childType = ChildType.ViewChild;
        this.markedAsDirty = false;
        this.cdStrategyName = resolveChangeDetectionStrategyName(cdStrategy);
    }
    set contentChild(contentChild) {
        this._childType = contentChild
            ? ChildType.ContentChild
            : ChildType.ViewChild;
    }
    get hostClass() {
        const childType = this._childType === ChildType.ViewChild ? "view-child" : "content-child";
        return `${this.cdStrategyName} ${childType} level-${this._level}`;
    }
    ngAfterViewInit() {
        this._attachButton.nativeElement.style.display = "none";
        // install outside Angular zone to not trigger change detection upon button click
        this._zone.runOutsideAngular(() => {
            (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.timer)(0, 500)
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(() => isDirty(this._cd)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.distinctUntilChanged)())
                .subscribe((isDirty) => {
                this.markedAsDirty = isDirty;
                this._ngMarked.nativeElement.style.display = isDirty
                    ? "inline"
                    : "none";
            });
            // Detect Changes manually
            (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.fromEvent)(this._dcButton.nativeElement, "click")
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.takeUntil)(this._destroy$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.tap)(() => this._dirtyCheckColoringService.clearColoring()))
                .subscribe((event) => {
                console.log(`ChangeDetectorRef.detectChanges() for ${this.name}`);
                this._cd.detectChanges();
            });
            // Mark for check
            (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.fromEvent)(this._mfcButton.nativeElement, "click")
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.takeUntil)(this._destroy$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.tap)(() => this._dirtyCheckColoringService.clearColoring()))
                .subscribe((event) => {
                console.log(`ChangeDetectorRef.markForCheck() for ${this.name}`);
                this._cd.markForCheck();
            });
            // Detach change detector
            (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.fromEvent)(this._detachButton.nativeElement, "click")
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.takeUntil)(this._destroy$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.tap)(() => this._dirtyCheckColoringService.clearColoring()))
                .subscribe((event) => {
                console.log(`ChangeDetectorRef.detach() for ${this.name}`);
                this._cd.detach();
                this._colorService.colorChangeDetectorDetached(this._cdStateBox);
                this._detachButton.nativeElement.style.display = "none"; // because outside Angular zone
                this._attachButton.nativeElement.style.display = "inline";
            });
            // Attach change detector
            (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.fromEvent)(this._attachButton.nativeElement, "click")
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.takeUntil)(this._destroy$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.tap)(() => this._dirtyCheckColoringService.clearColoring()))
                .subscribe((event) => {
                console.log(`ChangeDetectorRef.reattach() for ${this.name}`);
                this._cd.reattach();
                this._colorService.colorChangeDetectorAttached(this._cdStateBox);
                this._detachButton.nativeElement.style.display = "inline"; // because outside Angular zone
                this._attachButton.nativeElement.style.display = "none";
            });
            // Toggle visibility
            (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.fromEvent)(this._toggleVisiblity.nativeElement, "click")
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.takeUntil)(this._destroy$))
                .subscribe((event) => {
                const toggledState = this._expandCollapseState === _expand_collapse_service__WEBPACK_IMPORTED_MODULE_0__.State.Expand
                    ? _expand_collapse_service__WEBPACK_IMPORTED_MODULE_0__.State.Collapse
                    : _expand_collapse_service__WEBPACK_IMPORTED_MODULE_0__.State.Expand;
                this.setExpandCollapseState(toggledState);
            });
            this._dirtyCheckColoringService.busy$
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.takeUntil)(this._destroy$))
                .subscribe((busy) => {
                this._dcButton.nativeElement.disabled = busy;
                this._mfcButton.nativeElement.disabled = busy;
                this._attachButton.nativeElement.disabled = busy;
                this._detachButton.nativeElement.disabled = busy;
                this._clickButton.nativeElement.disabled = busy;
            });
            this._expandCollapseService.contentChildren$
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.takeUntil)(this._destroy$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.filter)((_) => this._childType === ChildType.ContentChild))
                .subscribe((state) => this.setExpandCollapseState(state));
        });
    }
    ngOnChanges(changes) {
        if (changes.inputObservable) {
            this._destroyInputObservable$.next();
            this.inputObservable
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.takeUntil)(this._destroy$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.takeUntil)(this._destroyInputObservable$))
                .subscribe((value) => (this.inputObservableValue = value));
        }
        this._colorService.colorNgOnChanges(this._ngOnChangesBox);
    }
    ngDoCheck() {
        this._colorService.colorNgDoCheck(this._ngDoCheckBox);
    }
    ngOnDestroy() {
        this._destroy$.complete();
    }
    get touch() {
        this._colorService.colorDirtyCheck(this._hostRef);
        return null;
    }
    onClick() {
        console.log(`Click for ${this.name}`);
    }
    setExpandCollapseState(state) {
        this._expandCollapseState = state;
        if (state === _expand_collapse_service__WEBPACK_IMPORTED_MODULE_0__.State.Expand) {
            this._componentField.nativeElement.style.display = "inline";
            this._toggleVisiblity.nativeElement.innerHTML = "-";
        }
        else {
            this._componentField.nativeElement.style.display = "none";
            this._toggleVisiblity.nativeElement.innerHTML = "+";
        }
    }
}
AbstractChangeDetectionComponent.propDecorators = {
    _componentField: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ["component", { static: true },] }],
    _mfcButton: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ["mfc_button", { static: true }, // mark for check
            ] }],
    _dcButton: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ["dc_button", { static: true }, // detect changes
            ] }],
    _detachButton: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ["detach_button", { static: true }, // detach change detector
            ] }],
    _attachButton: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ["attach_button", { static: true }, // attach change detector
            ] }],
    _clickButton: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ["click_button", { static: true }, // attach change detector
            ] }],
    _toggleVisiblity: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ["toggle_visiblity", { static: true },] }],
    _cdStateBox: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ["cd_state_box", { static: true },] }],
    _ngDoCheckBox: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ["ng_do_check_box", { static: true },] }],
    _ngOnChangesBox: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ["ng_on_changes_box", { static: true },] }],
    _ngMarked: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ["ng_marked", { static: true },] }],
    inputByRef: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Input }],
    inputByVal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Input }],
    inputObservable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Input }],
    contentChild: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Input }],
    hostClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.HostBinding, args: ["attr.class",] }]
};
function resolveChangeDetectionStrategyName(strategy) {
    for (const name in _angular_core__WEBPACK_IMPORTED_MODULE_9__.ChangeDetectionStrategy) {
        if (_angular_core__WEBPACK_IMPORTED_MODULE_9__.ChangeDetectionStrategy[name] === strategy &&
            _angular_core__WEBPACK_IMPORTED_MODULE_9__.ChangeDetectionStrategy.hasOwnProperty(name)) {
            return name;
        }
    }
    return undefined;
}
var ChildType;
(function (ChildType) {
    ChildType[ChildType["ViewChild"] = 0] = "ViewChild";
    ChildType[ChildType["ContentChild"] = 1] = "ContentChild";
})(ChildType || (ChildType = {}));
function isDirty(cdRef) {
    const flags = cdRef._lView[2];
    return getBit(flags, 5) === 1;
}
function getBit(number, bitPosition) {
    return (number & (1 << bitPosition)) === 0 ? 0 : 1;
}


/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _app_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component.html?ngResource */ 3383);
/* harmony import */ var _app_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component.scss?ngResource */ 9259);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 3280);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 9337);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 8951);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 635);
/* harmony import */ var _number_holder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./number-holder */ 5592);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./expand-collapse.service */ 3869);









let AppComponent = class AppComponent {
    constructor(_zone, _appRef, _dirtyCheckColoringService, _expandCollapseService) {
        this._zone = _zone;
        this._appRef = _appRef;
        this._dirtyCheckColoringService = _dirtyCheckColoringService;
        this._expandCollapseService = _expandCollapseService;
        this._destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
        this.value = 0;
        this.busy = false;
        this.inputByRef = new _number_holder__WEBPACK_IMPORTED_MODULE_2__.NumberHolder();
        this.inputObservable = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
    }
    ngAfterViewInit() {
        this._dirtyCheckColoringService.setAutoClearColoring(this.isAutoClear());
        this._zone.runOutsideAngular(() => {
            // apptick
            (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.fromEvent)(this._apptickButton.nativeElement, 'click').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.tap)(() => this._dirtyCheckColoringService.clearColoring()), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.takeUntil)(this._destroy$))
                .subscribe(event => this._appRef.tick());
            // timeout
            (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.fromEvent)(this._timeoutButton.nativeElement, 'click').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.takeUntil)(this._destroy$))
                .subscribe(event => {
                setTimeout(() => this._zone.run(() => console.log(`setTimeout(...)`)), 3000);
            });
            // clear auto checkbox
            (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.fromEvent)(this._autoClearCheckbox.nativeElement, 'change').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.takeUntil)(this._destroy$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)((event) => event.target))
                .subscribe(element => {
                this._dirtyCheckColoringService.setAutoClearColoring(element.checked);
            });
            // clear
            (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.fromEvent)(this._clearButton.nativeElement, 'click').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.takeUntil)(this._destroy$))
                .subscribe(_ => {
                this._dirtyCheckColoringService.clearColoring();
            });
            // Change input
            (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.fromEvent)(this._triggerChangeButton.nativeElement, 'click').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.takeUntil)(this._destroy$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.tap)(() => this._dirtyCheckColoringService.clearColoring())).subscribe(_ => {
                if (this.isPropagateInZone()) {
                    this._zone.run(this.updateInputValue.bind(this));
                }
                else {
                    this.updateInputValue();
                }
            });
            // Toggle content children
            (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.fromEvent)(this._toggleContentChildren.nativeElement, 'click').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.takeUntil)(this._destroy$))
                .subscribe(_ => this._expandCollapseService.toggleContentChildren());
            // Toggle ContentChildren
            this._expandCollapseService.contentChildren$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.takeUntil)(this._destroy$))
                .subscribe(state => {
                const button = this._toggleContentChildren.nativeElement;
                button.innerHTML = (state === _expand_collapse_service__WEBPACK_IMPORTED_MODULE_4__.State.Expand ? 'Collapse ContentChildren' : 'Expand ContentChildren');
            });
            // Busy
            this._dirtyCheckColoringService.busy$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.takeUntil)(this._destroy$))
                .subscribe(busy => {
                this.busy = busy;
                this._apptickButton.nativeElement.disabled = busy;
                this._timeoutButton.nativeElement.disabled = busy;
                this._clickButton.nativeElement.disabled = busy;
                this._autoClearCheckbox.nativeElement.disabled = busy;
                this._triggerChangeButton.nativeElement.disabled = busy;
                this._propagateByValueCheckbox.nativeElement.disabled = busy;
                this._propagateByRefCheckbox.nativeElement.disabled = busy;
                this._propagateByObservableCheckbox.nativeElement.disabled = busy;
                this._propagateInZoneCheckbox.nativeElement.disabled = busy;
                if (busy && !this._dirtyCheckColoringService.isAutoClearColoring()) {
                    this._clearButton.nativeElement.classList.add('emphasize');
                }
                else {
                    this._clearButton.nativeElement.classList.remove('emphasize');
                }
            });
        });
    }
    clickNoop() {
        console.log(`click`);
    }
    ngOnDestroy() {
        this._destroy$.complete();
    }
    updateInputValue() {
        this.value++;
        if (this.isPropagateByValue()) {
            this.inputByVal = this.value;
        }
        if (this.isPropagateByRef()) {
            this.inputByRef.value = this.value;
        }
        if (this.isPropagateByObservable()) {
            this.inputObservable.next(this.value);
        }
        // Update DOM directly because outside Angular zone to not trigger change detection
        const valueElement = this._inputValueField.nativeElement;
        valueElement.innerHTML = (this.value).toString(10);
    }
    isAutoClear() {
        return this._autoClearCheckbox.nativeElement.checked;
    }
    isPropagateByValue() {
        return this._propagateByValueCheckbox.nativeElement.checked;
    }
    isPropagateByRef() {
        return this._propagateByRefCheckbox.nativeElement.checked;
    }
    isPropagateByObservable() {
        return this._propagateByObservableCheckbox.nativeElement.checked;
    }
    isPropagateInZone() {
        return this._propagateInZoneCheckbox.nativeElement.checked;
    }
};
AppComponent.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.NgZone },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ApplicationRef },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_3__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_4__.ExpandCollapseService }
];
AppComponent.propDecorators = {
    _apptickButton: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewChild, args: ['apptick_button', { static: true },] }],
    _timeoutButton: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewChild, args: ['timeout_button', { static: true },] }],
    _clickButton: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewChild, args: ['click_button', { static: true },] }],
    _triggerChangeButton: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewChild, args: ['trigger_change', { static: true },] }],
    _clearButton: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewChild, args: ['clear', { static: true },] }],
    _autoClearCheckbox: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewChild, args: ['auto_clear', { static: true },] }],
    _toggleContentChildren: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewChild, args: ['toggle_content_children', { static: true },] }],
    _inputValueField: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewChild, args: ['input_value_field', { static: true },] }],
    _propagateByValueCheckbox: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewChild, args: ['propagate_by_value_checkbox', { static: true },] }],
    _propagateByRefCheckbox: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewChild, args: ['propagate_by_ref_checkbox', { static: true },] }],
    _propagateByObservableCheckbox: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewChild, args: ['propagate_by_observable_checkbox', { static: true },] }],
    _propagateInZoneCheckbox: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewChild, args: ['propagate_in_zone_checkbox', { static: true },] }]
};
AppComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
        selector: 'app-root',
        template: _app_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_app_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], AppComponent);



/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _comp_tree_comp_1_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comp-tree/comp-1.component */ 9003);
/* harmony import */ var _comp_tree_comp_1_1_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./comp-tree/comp-1-1.component */ 3441);
/* harmony import */ var _comp_tree_comp_1_2_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./comp-tree/comp-1-2.component */ 6735);
/* harmony import */ var _comp_tree_comp_1_x_1_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./comp-tree/comp-1-x-1.component */ 6013);
/* harmony import */ var _comp_tree_comp_1_x_1_1_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./comp-tree/comp-1-x-1-1.component */ 465);
/* harmony import */ var _comp_tree_comp_1_x_1_2_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./comp-tree/comp-1-x-1-2.component */ 9206);
/* harmony import */ var _comp_tree_comp_1_x_1_3_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./comp-tree/comp-1-x-1-3.component */ 5483);
/* harmony import */ var _comp_tree_comp_1_x_1_4_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./comp-tree/comp-1-x-1-4.component */ 820);
/* harmony import */ var _comp_tree_comp_1_x_2_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./comp-tree/comp-1-x-2.component */ 7425);
/* harmony import */ var _comp_tree_comp_1_x_2_1_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./comp-tree/comp-1-x-2-1.component */ 584);
/* harmony import */ var _comp_tree_comp_1_x_2_2_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./comp-tree/comp-1-x-2-2.component */ 3543);
/* harmony import */ var _comp_tree_comp_1_x_2_3_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./comp-tree/comp-1-x-2-3.component */ 4272);
/* harmony import */ var _comp_tree_comp_1_x_2_4_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./comp-tree/comp-1-x-2-4.component */ 7109);
/* harmony import */ var _comp_tree_comp_1_x_3_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./comp-tree/comp-1-x-3.component */ 1142);
/* harmony import */ var _comp_tree_comp_1_x_3_1_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./comp-tree/comp-1-x-3-1.component */ 7269);
/* harmony import */ var _comp_tree_comp_1_x_3_2_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./comp-tree/comp-1-x-3-2.component */ 7597);
/* harmony import */ var _comp_tree_comp_1_x_3_3_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./comp-tree/comp-1-x-3-3.component */ 9497);
/* harmony import */ var _comp_tree_comp_1_x_3_4_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./comp-tree/comp-1-x-3-4.component */ 6222);
/* harmony import */ var _comp_tree_comp_1_x_4_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./comp-tree/comp-1-x-4.component */ 8602);
/* harmony import */ var _comp_tree_comp_1_x_4_1_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./comp-tree/comp-1-x-4-1.component */ 5099);
/* harmony import */ var _comp_tree_comp_1_x_4_2_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./comp-tree/comp-1-x-4-2.component */ 7216);
/* harmony import */ var _comp_tree_comp_1_x_4_3_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./comp-tree/comp-1-x-4-3.component */ 6137);
/* harmony import */ var _comp_tree_comp_1_x_4_4_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./comp-tree/comp-1-x-4-4.component */ 5166);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./expand-collapse.service */ 3869);






























let AppModule = class AppModule {
};
AppModule = (0,tslib__WEBPACK_IMPORTED_MODULE_26__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_27__.NgModule)({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent,
            _comp_tree_comp_1_component__WEBPACK_IMPORTED_MODULE_1__.Comp_1_Component,
            _comp_tree_comp_1_1_component__WEBPACK_IMPORTED_MODULE_2__.Comp_1_1_Component,
            _comp_tree_comp_1_2_component__WEBPACK_IMPORTED_MODULE_3__.Comp_1_2_Component,
            _comp_tree_comp_1_x_1_component__WEBPACK_IMPORTED_MODULE_4__.Comp_1_x_1_Component,
            _comp_tree_comp_1_x_1_1_component__WEBPACK_IMPORTED_MODULE_5__.Comp_1_x_1_1_Component,
            _comp_tree_comp_1_x_1_2_component__WEBPACK_IMPORTED_MODULE_6__.Comp_1_x_1_2_Component,
            _comp_tree_comp_1_x_1_3_component__WEBPACK_IMPORTED_MODULE_7__.Comp_1_x_1_3_Component,
            _comp_tree_comp_1_x_1_4_component__WEBPACK_IMPORTED_MODULE_8__.Comp_1_x_1_4_Component,
            _comp_tree_comp_1_x_2_component__WEBPACK_IMPORTED_MODULE_9__.Comp_1_x_2_Component,
            _comp_tree_comp_1_x_2_1_component__WEBPACK_IMPORTED_MODULE_10__.Comp_1_x_2_1_Component,
            _comp_tree_comp_1_x_2_2_component__WEBPACK_IMPORTED_MODULE_11__.Comp_1_x_2_2_Component,
            _comp_tree_comp_1_x_2_3_component__WEBPACK_IMPORTED_MODULE_12__.Comp_1_x_2_3_Component,
            _comp_tree_comp_1_x_2_4_component__WEBPACK_IMPORTED_MODULE_13__.Comp_1_x_2_4_Component,
            _comp_tree_comp_1_x_3_component__WEBPACK_IMPORTED_MODULE_14__.Comp_1_x_3_Component,
            _comp_tree_comp_1_x_3_1_component__WEBPACK_IMPORTED_MODULE_15__.Comp_1_x_3_1_Component,
            _comp_tree_comp_1_x_3_2_component__WEBPACK_IMPORTED_MODULE_16__.Comp_1_x_3_2_Component,
            _comp_tree_comp_1_x_3_3_component__WEBPACK_IMPORTED_MODULE_17__.Comp_1_x_3_3_Component,
            _comp_tree_comp_1_x_3_4_component__WEBPACK_IMPORTED_MODULE_18__.Comp_1_x_3_4_Component,
            _comp_tree_comp_1_x_4_component__WEBPACK_IMPORTED_MODULE_19__.Comp_1_x_4_Component,
            _comp_tree_comp_1_x_4_1_component__WEBPACK_IMPORTED_MODULE_20__.Comp_1_x_4_1_Component,
            _comp_tree_comp_1_x_4_2_component__WEBPACK_IMPORTED_MODULE_21__.Comp_1_x_4_2_Component,
            _comp_tree_comp_1_x_4_3_component__WEBPACK_IMPORTED_MODULE_22__.Comp_1_x_4_3_Component,
            _comp_tree_comp_1_x_4_4_component__WEBPACK_IMPORTED_MODULE_23__.Comp_1_x_4_4_Component
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_28__.BrowserModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_29__.ReactiveFormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_29__.FormsModule
        ],
        providers: [
            _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_24__.DirtyCheckColoringService,
            _expand_collapse_service__WEBPACK_IMPORTED_MODULE_25__.ExpandCollapseService
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent]
    })
], AppModule);



/***/ }),

/***/ 1784:
/*!********************************************************!*\
  !*** ./src/app/change-detection.component.template.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "template": () => (/* binding */ template)
/* harmony export */ });
function template(children) {
    return `
        {{touch}}
        <button class="toggle-visibility" #toggle_visiblity>-</button>
        <div #component class="component">
          <div class="state">
            <span class="strategy-box {{cdStrategyName}}">{{cdStrategyName}}</span>
            <span #cd_state_box class="cd-state-box"></span>
            <span #ng_do_check_box class="ng-do-check-box">ngDoCheck</span>
            <span #ng_on_changes_box class="ng-on-changes-box">ngOnChanges</span>
            <span #ng_marked style="display:none">Marked</span>
          </div>
          <div class="name">
            {{name}}
          </div>
          <table class="input-box">
            <tr><th>input value:</th><td class="input-value">{{inputByVal}}</td></tr>
            <tr><th>object prop:</th><td class="input-value">{{inputByRef?.value}}</td></tr>
            <tr><th>observable:</th><td class="input-value">{{inputObservableValue}}</td></tr>
          </table>
          <div class="control">
            <button #dc_button title="Detect changes">DC</button>
            <button #mfc_button title="Mark for check (only applicable for 'OnPush' strategy; does not trigger change detection)">MFC</button>
            <button #detach_button title="Detaches ChangeDetector">Detach</button>
            <button #attach_button title="Attaches ChangeDetector">Attach</button>
            <button #click_button (click)="onClick()" title="Simple click action from template (ng binding)">Click</button>
          </div>
          <div class="children">
            ${children} <!-- view-children -->
            <ng-content></ng-content> <!-- content-children -->
          </div>
        </div>`;
}


/***/ }),

/***/ 6514:
/*!**********************************!*\
  !*** ./src/app/color.service.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColorService": () => (/* binding */ ColorService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dirty-check-coloring.service */ 6202);



let ColorService = class ColorService {
    constructor(_zone, _dirtyCheckColoringService) {
        this._zone = _zone;
        this._dirtyCheckColoringService = _dirtyCheckColoringService;
    }
    colorNgDoCheck(elementRef) {
        this._zone.runOutsideAngular(() => {
            clearTimeout(this.ngDoCheckHandle);
            this.ngDoCheckHandle = this.blink(elementRef.nativeElement, 'ng-do-check');
        });
    }
    colorNgOnChanges(elementRef) {
        this._zone.runOutsideAngular(() => {
            clearTimeout(this.ngOnChangesHandle);
            this.ngOnChangesHandle = this.blink(elementRef.nativeElement, 'ng-on-changes');
        });
    }
    colorDirtyCheck(elementRef) {
        this._zone.runOutsideAngular(() => {
            this._dirtyCheckColoringService.colorDirtyCheck(elementRef);
        });
    }
    colorChangeDetectorDetached(hostRef) {
        this._zone.runOutsideAngular(() => {
            const host = hostRef.nativeElement;
            host.classList.add('cd-detached');
        });
    }
    colorChangeDetectorAttached(hostRef) {
        this._zone.runOutsideAngular(() => {
            const host = hostRef.nativeElement;
            host.classList.remove('cd-detached');
        });
    }
    blink(element, cssClass) {
        element.classList.add(cssClass);
        return setTimeout(() => element.classList.remove(cssClass), 1500);
    }
};
ColorService.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_0__.DirtyCheckColoringService }
];
ColorService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable)()
], ColorService);



/***/ }),

/***/ 3441:
/*!*************************************************!*\
  !*** ./src/app/comp-tree/comp-1-1.component.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_1_Component": () => (/* binding */ Comp_1_1_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-1';
const LEVEL = 2;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.Default;
const CHILD_TEMPLATE = `
  <app-comp-1-x-1 [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable">
    <app-comp-1-x-1-3 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-1-3>
    <app-comp-1-x-1-4 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-1-4>
  </app-comp-1-x-1>
  <app-comp-1-x-2 [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable">
    <app-comp-1-x-2-3 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-2-3>
    <app-comp-1-x-2-4 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-2-4>
  </app-comp-1-x-2>
`;
let Comp_1_1_Component = class Comp_1_1_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_1_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_1_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_1_Component);



/***/ }),

/***/ 6735:
/*!*************************************************!*\
  !*** ./src/app/comp-tree/comp-1-2.component.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_2_Component": () => (/* binding */ Comp_1_2_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-2';
const LEVEL = 2;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.OnPush;
const CHILD_TEMPLATE = `
  <app-comp-1-x-1 [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable">
    <app-comp-1-x-1-3 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-1-3>
    <app-comp-1-x-1-4 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-1-4>
  </app-comp-1-x-1>
  <app-comp-1-x-2 [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable">
    <app-comp-1-x-2-3 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-2-3>
    <app-comp-1-x-2-4 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-2-4>
  </app-comp-1-x-2>
`;
let Comp_1_2_Component = class Comp_1_2_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_2_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_2_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_2_Component);



/***/ }),

/***/ 465:
/*!*****************************************************!*\
  !*** ./src/app/comp-tree/comp-1-x-1-1.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_x_1_1_Component": () => (/* binding */ Comp_1_x_1_1_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-x-1-1';
const LEVEL = 4;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.Default;
const CHILD_TEMPLATE = ``;
let Comp_1_x_1_1_Component = class Comp_1_x_1_1_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_x_1_1_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_x_1_1_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_x_1_1_Component);



/***/ }),

/***/ 9206:
/*!*****************************************************!*\
  !*** ./src/app/comp-tree/comp-1-x-1-2.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_x_1_2_Component": () => (/* binding */ Comp_1_x_1_2_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-x-1-2';
const LEVEL = 4;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.OnPush;
const CHILD_TEMPLATE = ``;
let Comp_1_x_1_2_Component = class Comp_1_x_1_2_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_x_1_2_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_x_1_2_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_x_1_2_Component);



/***/ }),

/***/ 5483:
/*!*****************************************************!*\
  !*** ./src/app/comp-tree/comp-1-x-1-3.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_x_1_3_Component": () => (/* binding */ Comp_1_x_1_3_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-x-1-3';
const LEVEL = 4;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.Default;
const CHILD_TEMPLATE = ``;
let Comp_1_x_1_3_Component = class Comp_1_x_1_3_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_x_1_3_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_x_1_3_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_x_1_3_Component);



/***/ }),

/***/ 820:
/*!*****************************************************!*\
  !*** ./src/app/comp-tree/comp-1-x-1-4.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_x_1_4_Component": () => (/* binding */ Comp_1_x_1_4_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-x-1-4';
const LEVEL = 4;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.OnPush;
const CHILD_TEMPLATE = ``;
let Comp_1_x_1_4_Component = class Comp_1_x_1_4_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_x_1_4_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_x_1_4_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_x_1_4_Component);



/***/ }),

/***/ 6013:
/*!***************************************************!*\
  !*** ./src/app/comp-tree/comp-1-x-1.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_x_1_Component": () => (/* binding */ Comp_1_x_1_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-x-1';
const LEVEL = 3;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.Default;
const CHILD_TEMPLATE = `
  <app-comp-1-x-1-1 [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-1-1>
  <app-comp-1-x-1-2 [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-1-2>
`;
let Comp_1_x_1_Component = class Comp_1_x_1_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_x_1_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_x_1_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_x_1_Component);



/***/ }),

/***/ 584:
/*!*****************************************************!*\
  !*** ./src/app/comp-tree/comp-1-x-2-1.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_x_2_1_Component": () => (/* binding */ Comp_1_x_2_1_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-x-2-1';
const LEVEL = 4;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.Default;
const CHILD_TEMPLATE = ``;
let Comp_1_x_2_1_Component = class Comp_1_x_2_1_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_x_2_1_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_x_2_1_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_x_2_1_Component);



/***/ }),

/***/ 3543:
/*!*****************************************************!*\
  !*** ./src/app/comp-tree/comp-1-x-2-2.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_x_2_2_Component": () => (/* binding */ Comp_1_x_2_2_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-x-2-2';
const LEVEL = 4;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.OnPush;
const CHILD_TEMPLATE = ``;
let Comp_1_x_2_2_Component = class Comp_1_x_2_2_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_x_2_2_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_x_2_2_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_x_2_2_Component);



/***/ }),

/***/ 4272:
/*!*****************************************************!*\
  !*** ./src/app/comp-tree/comp-1-x-2-3.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_x_2_3_Component": () => (/* binding */ Comp_1_x_2_3_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-x-2-3';
const LEVEL = 4;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.Default;
const CHILD_TEMPLATE = ``;
let Comp_1_x_2_3_Component = class Comp_1_x_2_3_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_x_2_3_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_x_2_3_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_x_2_3_Component);



/***/ }),

/***/ 7109:
/*!*****************************************************!*\
  !*** ./src/app/comp-tree/comp-1-x-2-4.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_x_2_4_Component": () => (/* binding */ Comp_1_x_2_4_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-x-2-4';
const LEVEL = 4;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.OnPush;
const CHILD_TEMPLATE = ``;
let Comp_1_x_2_4_Component = class Comp_1_x_2_4_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_x_2_4_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_x_2_4_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_x_2_4_Component);



/***/ }),

/***/ 7425:
/*!***************************************************!*\
  !*** ./src/app/comp-tree/comp-1-x-2.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_x_2_Component": () => (/* binding */ Comp_1_x_2_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-x-2';
const LEVEL = 3;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.OnPush;
const CHILD_TEMPLATE = `
  <app-comp-1-x-2-1 [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-2-1>
  <app-comp-1-x-2-2 [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-2-2>
`;
let Comp_1_x_2_Component = class Comp_1_x_2_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_x_2_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_x_2_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_x_2_Component);



/***/ }),

/***/ 7269:
/*!*****************************************************!*\
  !*** ./src/app/comp-tree/comp-1-x-3-1.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_x_3_1_Component": () => (/* binding */ Comp_1_x_3_1_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-x-3-1';
const LEVEL = 4;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.Default;
const CHILD_TEMPLATE = ``;
let Comp_1_x_3_1_Component = class Comp_1_x_3_1_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_x_3_1_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_x_3_1_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_x_3_1_Component);



/***/ }),

/***/ 7597:
/*!*****************************************************!*\
  !*** ./src/app/comp-tree/comp-1-x-3-2.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_x_3_2_Component": () => (/* binding */ Comp_1_x_3_2_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-x-3-2';
const LEVEL = 4;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.OnPush;
const CHILD_TEMPLATE = ``;
let Comp_1_x_3_2_Component = class Comp_1_x_3_2_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_x_3_2_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_x_3_2_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_x_3_2_Component);



/***/ }),

/***/ 9497:
/*!*****************************************************!*\
  !*** ./src/app/comp-tree/comp-1-x-3-3.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_x_3_3_Component": () => (/* binding */ Comp_1_x_3_3_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-x-3-3';
const LEVEL = 4;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.Default;
const CHILD_TEMPLATE = ``;
let Comp_1_x_3_3_Component = class Comp_1_x_3_3_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_x_3_3_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_x_3_3_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_x_3_3_Component);



/***/ }),

/***/ 6222:
/*!*****************************************************!*\
  !*** ./src/app/comp-tree/comp-1-x-3-4.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_x_3_4_Component": () => (/* binding */ Comp_1_x_3_4_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-x-3-4';
const LEVEL = 4;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.OnPush;
const CHILD_TEMPLATE = ``;
let Comp_1_x_3_4_Component = class Comp_1_x_3_4_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_x_3_4_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_x_3_4_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_x_3_4_Component);



/***/ }),

/***/ 1142:
/*!***************************************************!*\
  !*** ./src/app/comp-tree/comp-1-x-3.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_x_3_Component": () => (/* binding */ Comp_1_x_3_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-x-3';
const LEVEL = 3;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.Default;
const CHILD_TEMPLATE = `
  <app-comp-1-x-3-1 [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-3-1>
  <app-comp-1-x-3-2 [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-3-2>
`;
let Comp_1_x_3_Component = class Comp_1_x_3_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_x_3_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_x_3_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_x_3_Component);



/***/ }),

/***/ 5099:
/*!*****************************************************!*\
  !*** ./src/app/comp-tree/comp-1-x-4-1.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_x_4_1_Component": () => (/* binding */ Comp_1_x_4_1_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-x-4-1';
const LEVEL = 4;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.Default;
const CHILD_TEMPLATE = ``;
let Comp_1_x_4_1_Component = class Comp_1_x_4_1_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_x_4_1_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_x_4_1_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_x_4_1_Component);



/***/ }),

/***/ 7216:
/*!*****************************************************!*\
  !*** ./src/app/comp-tree/comp-1-x-4-2.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_x_4_2_Component": () => (/* binding */ Comp_1_x_4_2_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-x-4-2';
const LEVEL = 4;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.OnPush;
const CHILD_TEMPLATE = ``;
let Comp_1_x_4_2_Component = class Comp_1_x_4_2_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_x_4_2_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_x_4_2_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_x_4_2_Component);



/***/ }),

/***/ 6137:
/*!*****************************************************!*\
  !*** ./src/app/comp-tree/comp-1-x-4-3.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_x_4_3_Component": () => (/* binding */ Comp_1_x_4_3_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-x-4-3';
const LEVEL = 4;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.Default;
const CHILD_TEMPLATE = ``;
let Comp_1_x_4_3_Component = class Comp_1_x_4_3_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_x_4_3_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_x_4_3_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_x_4_3_Component);



/***/ }),

/***/ 5166:
/*!*****************************************************!*\
  !*** ./src/app/comp-tree/comp-1-x-4-4.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_x_4_4_Component": () => (/* binding */ Comp_1_x_4_4_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-x-4-4';
const LEVEL = 4;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.OnPush;
const CHILD_TEMPLATE = ``;
let Comp_1_x_4_4_Component = class Comp_1_x_4_4_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_x_4_4_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_x_4_4_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_x_4_4_Component);



/***/ }),

/***/ 8602:
/*!***************************************************!*\
  !*** ./src/app/comp-tree/comp-1-x-4.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_x_4_Component": () => (/* binding */ Comp_1_x_4_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1-x-4';
const LEVEL = 3;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.OnPush;
const CHILD_TEMPLATE = `
  <app-comp-1-x-4-1 [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-4-1>
  <app-comp-1-x-4-2 [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-4-2>
`;
let Comp_1_x_4_Component = class Comp_1_x_4_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_x_4_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_x_4_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_x_4_Component);



/***/ }),

/***/ 9003:
/*!***********************************************!*\
  !*** ./src/app/comp-tree/comp-1.component.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comp_1_Component": () => (/* binding */ Comp_1_Component)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../change-detection.component.scss?ngResource */ 9485);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _color_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.service */ 6514);
/* harmony import */ var _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-change-detection.component */ 5027);
/* harmony import */ var _change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../change-detection.component.template */ 1784);
/* harmony import */ var _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dirty-check-coloring.service */ 6202);
/* harmony import */ var _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../expand-collapse.service */ 3869);








const NAME = 'comp-1';
const LEVEL = 1;
const CD_STRATEGY = _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectionStrategy.Default;
const CHILD_TEMPLATE = `
  <app-comp-1-1 [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable">
     <app-comp-1-x-3 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable">
        <app-comp-1-x-3-3 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-3-3>
        <app-comp-1-x-3-4 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-3-4>
     </app-comp-1-x-3>
     <app-comp-1-x-4 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable">
        <app-comp-1-x-4-3 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-4-3>
        <app-comp-1-x-4-4 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-4-4>
     </app-comp-1-x-4>
  </app-comp-1-1>
  <app-comp-1-2 [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable">
     <app-comp-1-x-3 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable">
        <app-comp-1-x-3-3 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-3-3>
        <app-comp-1-x-3-4 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-3-4>
      </app-comp-1-x-3>
     <app-comp-1-x-4 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable">
        <app-comp-1-x-4-3 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-4-3>
        <app-comp-1-x-4-4 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-4-4>
      </app-comp-1-x-4>
  </app-comp-1-2>`;
let Comp_1_Component = class Comp_1_Component extends _abstract_change_detection_component__WEBPACK_IMPORTED_MODULE_2__.AbstractChangeDetectionComponent {
    constructor(hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone) {
        super(NAME, LEVEL, hostRef, colorService, dirtyCheckColoringService, expandCollapseService, cd, zone, CD_STRATEGY);
    }
};
Comp_1_Component.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef },
    { type: _color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService },
    { type: _dirty_check_coloring_service__WEBPACK_IMPORTED_MODULE_4__.DirtyCheckColoringService },
    { type: _expand_collapse_service__WEBPACK_IMPORTED_MODULE_5__.ExpandCollapseService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone }
];
Comp_1_Component = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: `app-${NAME}`,
        template: (0,_change_detection_component_template__WEBPACK_IMPORTED_MODULE_3__.template)(CHILD_TEMPLATE),
        providers: [_color_service__WEBPACK_IMPORTED_MODULE_1__.ColorService],
        changeDetection: CD_STRATEGY,
        styles: [_change_detection_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_0__]
    })
], Comp_1_Component);



/***/ }),

/***/ 7042:
/*!**********************************************!*\
  !*** ./src/app/delayed-scheduler.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DelayedScheduler": () => (/* binding */ DelayedScheduler)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 228);

/**
 * Executes the scheduled functions in sequence with a specific delay.
 */
class DelayedScheduler {
    constructor(_zone) {
        this._zone = _zone;
        this._queue = [];
        this._done$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
    }
    schedule(fn) {
        this._queue.push(fn);
        if (this._queue.length === 1) {
            this.scheduleInternal(0);
        }
    }
    get done$() {
        return this._done$.asObservable();
    }
    onTick() {
        this._queue.shift()();
        if (this._queue.length > 0) {
            this.scheduleInternal(DelayedScheduler.DELAY);
        }
        else {
            this._done$.next();
        }
    }
    scheduleInternal(millis) {
        this._zone.runOutsideAngular(() => {
            setTimeout(this.onTick.bind(this), millis);
        });
    }
}
DelayedScheduler.DELAY = 75;


/***/ }),

/***/ 6202:
/*!*************************************************!*\
  !*** ./src/app/dirty-check-coloring.service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DirtyCheckColoringService": () => (/* binding */ DirtyCheckColoringService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 6317);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 9295);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 1339);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 5716);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 8977);
/* harmony import */ var _delayed_scheduler_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delayed-scheduler.service */ 7042);





let DirtyCheckColoringService = class DirtyCheckColoringService {
    constructor(_zone) {
        this._zone = _zone;
        this._clearColoring$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
        this._autoClearColoring = true;
        this._busy$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(false);
        this._delayedScheduler = new _delayed_scheduler_service__WEBPACK_IMPORTED_MODULE_0__.DelayedScheduler(_zone);
    }
    clearColoring() {
        this._clearColoring$.next();
    }
    setAutoClearColoring(autoClear) {
        this._autoClearColoring = autoClear;
        if (autoClear) {
            this.clearColoring();
        }
    }
    isAutoClearColoring() {
        return this._autoClearColoring;
    }
    colorDirtyCheck(elementRef) {
        this._busy$.next(true);
        this._zone.runOutsideAngular(() => {
            const element = elementRef.nativeElement;
            const cssClass = 'dirty-check';
            this._delayedScheduler.schedule(() => {
                element.classList.add(cssClass);
            });
            if (this._autoClearColoring) {
                this._delayedScheduler.done$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.take)(1), // subscribe once
                (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.delay)(1000) // clear after 1s
                )
                    .subscribe(() => {
                    element.classList.remove(cssClass);
                    this._busy$.next(false);
                });
            }
            else {
                this._delayedScheduler.done$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.take)(1), // subscribe once
                (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.delayWhen)(() => this._clearColoring$))
                    .subscribe(() => {
                    element.classList.remove(cssClass);
                    this._busy$.next(false);
                });
            }
        });
    }
    get busy$() {
        return this._busy$.asObservable().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.distinctUntilChanged)());
    }
};
DirtyCheckColoringService.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.NgZone }
];
DirtyCheckColoringService = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Injectable)()
], DirtyCheckColoringService);



/***/ }),

/***/ 3869:
/*!********************************************!*\
  !*** ./src/app/expand-collapse.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExpandCollapseService": () => (/* binding */ ExpandCollapseService),
/* harmony export */   "State": () => (/* binding */ State)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 6317);



let ExpandCollapseService = class ExpandCollapseService {
    constructor() {
        this._contentChildren$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(State.Collapse);
    }
    toggleContentChildren() {
        this._contentChildren$.next((this._contentChildren$.getValue() === State.Expand) ? State.Collapse : State.Expand);
    }
    get contentChildren$() {
        return this._contentChildren$.asObservable();
    }
};
ExpandCollapseService = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)()
], ExpandCollapseService);

var State;
(function (State) {
    State[State["Expand"] = 0] = "Expand";
    State[State["Collapse"] = 1] = "Collapse";
})(State || (State = {}));


/***/ }),

/***/ 5592:
/*!**********************************!*\
  !*** ./src/app/number-holder.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NumberHolder": () => (/* binding */ NumberHolder)
/* harmony export */ });
class NumberHolder {
}


/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ 8150);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
(0,_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__.platformBrowserDynamic)().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.error(err));


/***/ }),

/***/ 9259:
/*!***********************************************!*\
  !*** ./src/app/app.component.scss?ngResource ***!
  \***********************************************/
/***/ ((module) => {

module.exports = ":host {\n  display: flex;\n  flex-flow: column nowrap;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n:host .control {\n  flex: none;\n  display: flex;\n  flex-wrap: wrap;\n  font-size: 11px;\n}\n:host .control button {\n  font-size: 11px;\n}\n:host .control nav {\n  display: flex;\n  padding: 5px;\n  align-items: center;\n}\n:host .control nav > * {\n  margin-right: 5px;\n  flex: none;\n}\n:host .control nav .filler {\n  flex: auto;\n}\n:host .control label {\n  display: flex;\n  align-items: center;\n}\n:host main {\n  position: relative;\n  overflow-y: scroll;\n  flex: auto;\n}\n:host main .explanation article {\n  padding: 5px;\n}\n:host section {\n  border: 1px solid black;\n  background-color: #f2f2f2;\n  margin: 20px 10px;\n  flex: auto;\n}\n:host section > header {\n  padding: 5px 5px;\n  display: block;\n  background-color: #b3b3b3;\n  font-weight: bold;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSx3QkFBQTtFQUNBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtBQUNGO0FBQ0U7RUFDRSxVQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0FBQ0o7QUFBSTtFQUNFLGVBQUE7QUFFTjtBQUNJO0VBQ0UsYUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtBQUNOO0FBQ007RUFDRSxpQkFBQTtFQUNBLFVBQUE7QUFDUjtBQUVNO0VBQ0UsVUFBQTtBQUFSO0FBSUk7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7QUFGTjtBQU1FO0VBQ0Usa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7QUFKSjtBQU9NO0VBQ0UsWUFBQTtBQUxSO0FBVUU7RUFDRSx1QkFBQTtFQUNBLHlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxVQUFBO0FBUko7QUFVSTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLHlCQUFBO0VBQ0EsaUJBQUE7QUFSTiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG5cbiAgLmNvbnRyb2wge1xuICAgIGZsZXg6IG5vbmU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgZm9udC1zaXplOiAxMXB4O1xuICAgIGJ1dHRvbiB7XG4gICAgICBmb250LXNpemU6IDExcHg7XG4gICAgfVxuXG4gICAgbmF2IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBwYWRkaW5nOiA1cHg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgICA+ICoge1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDVweDtcbiAgICAgICAgZmxleDogbm9uZTtcbiAgICAgIH1cblxuICAgICAgLmZpbGxlciB7XG4gICAgICAgIGZsZXg6IGF1dG87XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFiZWwge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgfVxuICB9XG5cbiAgbWFpbiB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlOyAvLyBwb3NpdGlvbmVkIGFuY2hvclxuICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgICBmbGV4OiBhdXRvO1xuXG4gICAgLmV4cGxhbmF0aW9uIHtcbiAgICAgIGFydGljbGUge1xuICAgICAgICBwYWRkaW5nOiA1cHg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2VjdGlvbiB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YyZjJmMjtcbiAgICBtYXJnaW46IDIwcHggMTBweDtcbiAgICBmbGV4OiBhdXRvO1xuXG4gICAgPiBoZWFkZXIge1xuICAgICAgcGFkZGluZzogNXB4IDVweDtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2IzYjNiMztcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIH1cbiAgfVxufVxuIl19 */";

/***/ }),

/***/ 9485:
/*!************************************************************!*\
  !*** ./src/app/change-detection.component.scss?ngResource ***!
  \************************************************************/
/***/ ((module) => {

module.exports = ":host {\n  position: relative;\n  background-color: white;\n  display: inline-block;\n  border: 1px solid black;\n  margin: 10px;\n  padding: 5px;\n  text-align: center;\n  border-radius: 3px;\n  min-width: 15px;\n  min-height: 15px;\n}\n:host > button.toggle-visibility {\n  z-index: 1;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 15px;\n  height: 15px;\n  border: none;\n  color: black;\n  background-color: transparent;\n  outline: none;\n  margin: 0;\n  cursor: pointer;\n}\n:host.dirty-check.level-1 {\n  background-color: #e6e6ff;\n}\n:host.dirty-check.level-2 {\n  background-color: #ccccff;\n}\n:host.dirty-check.level-3 {\n  background-color: #b3b3ff;\n}\n:host.dirty-check.level-4 {\n  background-color: #9999ff;\n}\n:host.dirty-check.level-5 {\n  background-color: #8080ff;\n}\n:host.dirty-check.level-6 {\n  background-color: #6666ff;\n}\n:host.dirty-check.level-7 {\n  background-color: #4d4dff;\n}\n:host.dirty-check.level-8 {\n  background-color: #3333ff;\n}\n:host.dirty-check.level-9 {\n  background-color: #1a1aff;\n}\n:host.dirty-check.level-10 {\n  background-color: #0000ff;\n}\n:host > div.component::before {\n  position: relative;\n  top: -10px;\n  font-family: monospace;\n  font-size: 10px;\n}\n:host.view-child {\n  border-style: solid;\n}\n:host.view-child > div.component::before {\n  content: \"<<ViewChild>>\";\n}\n:host.content-child {\n  border-style: dashed;\n}\n:host.content-child > div.component::before {\n  content: \"<<ContentChild>>\";\n}\n:host > div.component > div.state > span {\n  display: inline-block;\n  margin: 2px 0;\n  padding: 2px 3px;\n  border-radius: 3px;\n  border: 1px solid;\n  font-size: 10px;\n  color: black;\n  background-color: white;\n}\n:host > div.component > div.state > span.strategy-box {\n  border-color: black;\n  color: white;\n}\n:host > div.component > div.state > span.strategy-box.Default {\n  border-color: black;\n  background-color: black;\n  color: white;\n}\n:host > div.component > div.state > span.strategy-box.OnPush {\n  border-color: deeppink;\n  background-color: deeppink;\n  color: white;\n}\n:host > div.component > div.state > span.cd-state-box {\n  border-color: #004d1a;\n  color: #004d1a;\n  background-color: #b3ffcc;\n}\n:host > div.component > div.state > span.cd-state-box::before {\n  content: \"attached\";\n}\n:host > div.component > div.state > span.cd-state-box.cd-detached {\n  color: #000000;\n  background-color: #cccccc;\n  border-color: #000000;\n}\n:host > div.component > div.state > span.cd-state-box.cd-detached::before {\n  content: \"detached\";\n}\n:host > div.component > div.state > span.ng-do-check-box {\n  border-color: darkgray;\n  color: darkgray;\n}\n:host > div.component > div.state > span.ng-do-check-box.ng-do-check {\n  border-color: red;\n  color: red;\n  background-color: #ffe6e6;\n}\n:host > div.component > div.state > span.ng-on-changes-box {\n  border-color: darkgray;\n  color: darkgray;\n}\n:host > div.component > div.state > span.ng-on-changes-box.ng-on-changes {\n  border-color: red;\n  color: red;\n  background-color: #ffe6e6;\n}\n:host > div.component > div.name {\n  padding: 5px 0;\n  font-size: 12px;\n  font-weight: bold;\n}\n:host > div.component > table.input-box {\n  margin: 5px auto;\n  font-size: 11px;\n  border: 1px solid #000000;\n  border-spacing: 0;\n  border-collapse: collapse;\n}\n:host > div.component > table.input-box td,\n:host > div.component > table.input-box th {\n  padding: 2px 3px;\n  text-align: left;\n}\n:host > div.component > div.control > button {\n  font-size: 10px;\n}\n:host > div.component > div.children {\n  display: flex;\n  flex-wrap: nowrap;\n  flex-direction: row;\n  justify-content: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYW5nZS1kZXRlY3Rpb24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSxrQkFBQTtFQUNBLHVCQUFBO0VBQ0EscUJBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGVBWHFCO0VBWXJCLGdCQVpxQjtBQVd2QjtBQUdFO0VBQ0UsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsT0FBQTtFQUNBLE1BQUE7RUFDQSxXQW5CbUI7RUFvQm5CLFlBcEJtQjtFQXFCbkIsWUFBQTtFQUNBLFlBQUE7RUFDQSw2QkFBQTtFQUNBLGFBQUE7RUFDQSxTQUFBO0VBQ0EsZUFBQTtBQURKO0FBS0k7RUFDRSx5QkFBQTtBQUhOO0FBS0k7RUFDRSx5QkFBQTtBQUhOO0FBS0k7RUFDRSx5QkFBQTtBQUhOO0FBS0k7RUFDRSx5QkFBQTtBQUhOO0FBS0k7RUFDRSx5QkFBQTtBQUhOO0FBS0k7RUFDRSx5QkFBQTtBQUhOO0FBS0k7RUFDRSx5QkFBQTtBQUhOO0FBS0k7RUFDRSx5QkFBQTtBQUhOO0FBS0k7RUFDRSx5QkFBQTtBQUhOO0FBS0k7RUFDRSx5QkFBQTtBQUhOO0FBT0U7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxzQkFBQTtFQUNBLGVBQUE7QUFMSjtBQVFFO0VBQ0UsbUJBQUE7QUFOSjtBQU9JO0VBQ0Usd0JBQUE7QUFMTjtBQVNFO0VBQ0Usb0JBQUE7QUFQSjtBQVFJO0VBQ0UsMkJBQUE7QUFOTjtBQVlNO0VBQ0UscUJBQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtBQVZSO0FBYU07RUFDRSxtQkFBQTtFQUNBLFlBQUE7QUFYUjtBQWFRO0VBQ0UsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7QUFYVjtBQWNRO0VBQ0Usc0JBQUE7RUFDQSwwQkFBQTtFQUNBLFlBQUE7QUFaVjtBQWdCTTtFQUNFLHFCQUFBO0VBQ0EsY0FBQTtFQUNBLHlCQUFBO0FBZFI7QUFlUTtFQUNFLG1CQUFBO0FBYlY7QUFnQlE7RUFDRSxjQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtBQWRWO0FBZVU7RUFDRSxtQkFBQTtBQWJaO0FBa0JNO0VBQ0Usc0JBQUE7RUFDQSxlQUFBO0FBaEJSO0FBa0JRO0VBQ0UsaUJBQUE7RUFDQSxVQUFBO0VBQ0EseUJBQUE7QUFoQlY7QUFvQk07RUFDRSxzQkFBQTtFQUNBLGVBQUE7QUFsQlI7QUFvQlE7RUFDRSxpQkFBQTtFQUNBLFVBQUE7RUFDQSx5QkFBQTtBQWxCVjtBQXVCSTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFyQk47QUF3Qkk7RUFDRSxnQkFBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtFQUNBLGlCQUFBO0VBQ0EseUJBQUE7QUF0Qk47QUF3Qk07O0VBRUUsZ0JBQUE7RUFDQSxnQkFBQTtBQXRCUjtBQTBCSTtFQUNFLGVBQUE7QUF4Qk47QUEyQkk7RUFDRSxhQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBekJOIiwiZmlsZSI6ImNoYW5nZS1kZXRlY3Rpb24uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkY29sbGFwc2UtYnV0dG9uLXNpemU6IDE1cHg7XG5cbjpob3N0IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlOyAvLyBhbmNob3JcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gIG1hcmdpbjogMTBweDtcbiAgcGFkZGluZzogNXB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgbWluLXdpZHRoOiAkY29sbGFwc2UtYnV0dG9uLXNpemU7XG4gIG1pbi1oZWlnaHQ6ICRjb2xsYXBzZS1idXR0b24tc2l6ZTtcblxuICA+IGJ1dHRvbi50b2dnbGUtdmlzaWJpbGl0eSB7XG4gICAgei1pbmRleDogMTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogMDtcbiAgICB0b3A6IDA7XG4gICAgd2lkdGg6ICRjb2xsYXBzZS1idXR0b24tc2l6ZTtcbiAgICBoZWlnaHQ6ICRjb2xsYXBzZS1idXR0b24tc2l6ZTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgY29sb3I6IGJsYWNrO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgbWFyZ2luOiAwO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuXG4gICYuZGlydHktY2hlY2sge1xuICAgICYubGV2ZWwtMSB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTZlNmZmO1xuICAgIH1cbiAgICAmLmxldmVsLTIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2NjY2NmZjtcbiAgICB9XG4gICAgJi5sZXZlbC0zIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNiM2IzZmY7XG4gICAgfVxuICAgICYubGV2ZWwtNCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTk5OWZmO1xuICAgIH1cbiAgICAmLmxldmVsLTUge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzgwODBmZjtcbiAgICB9XG4gICAgJi5sZXZlbC02IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICM2NjY2ZmY7XG4gICAgfVxuICAgICYubGV2ZWwtNyB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGQ0ZGZmO1xuICAgIH1cbiAgICAmLmxldmVsLTgge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMzNmZjtcbiAgICB9XG4gICAgJi5sZXZlbC05IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMxYTFhZmY7XG4gICAgfVxuICAgICYubGV2ZWwtMTAge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDBmZjtcbiAgICB9XG4gIH1cblxuICA+IGRpdi5jb21wb25lbnQ6OmJlZm9yZSB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHRvcDogLTEwcHg7XG4gICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gIH1cblxuICAmLnZpZXctY2hpbGQge1xuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgPiBkaXYuY29tcG9uZW50OjpiZWZvcmUge1xuICAgICAgY29udGVudDogXCI8PFZpZXdDaGlsZD4+XCI7XG4gICAgfVxuICB9XG5cbiAgJi5jb250ZW50LWNoaWxkIHtcbiAgICBib3JkZXItc3R5bGU6IGRhc2hlZDtcbiAgICA+IGRpdi5jb21wb25lbnQ6OmJlZm9yZSB7XG4gICAgICBjb250ZW50OiBcIjw8Q29udGVudENoaWxkPj5cIjtcbiAgICB9XG4gIH1cblxuICA+IGRpdi5jb21wb25lbnQge1xuICAgID4gZGl2LnN0YXRlIHtcbiAgICAgID4gc3BhbiB7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgbWFyZ2luOiAycHggMDtcbiAgICAgICAgcGFkZGluZzogMnB4IDNweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZDtcbiAgICAgICAgZm9udC1zaXplOiAxMHB4O1xuICAgICAgICBjb2xvcjogYmxhY2s7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgICAgfVxuXG4gICAgICA+IHNwYW4uc3RyYXRlZ3ktYm94IHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiBibGFjaztcbiAgICAgICAgY29sb3I6IHdoaXRlO1xuXG4gICAgICAgICYuRGVmYXVsdCB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiBibGFjaztcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbiAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgIH1cblxuICAgICAgICAmLk9uUHVzaCB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiBkZWVwcGluaztcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBkZWVwcGluaztcbiAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgPiBzcGFuLmNkLXN0YXRlLWJveCB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogIzAwNGQxYTtcbiAgICAgICAgY29sb3I6ICMwMDRkMWE7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNiM2ZmY2M7XG4gICAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgICAgY29udGVudDogXCJhdHRhY2hlZFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgJi5jZC1kZXRhY2hlZCB7XG4gICAgICAgICAgY29sb3I6ICMwMDAwMDA7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2NjY2NjYztcbiAgICAgICAgICBib3JkZXItY29sb3I6ICMwMDAwMDA7XG4gICAgICAgICAgJjo6YmVmb3JlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiZGV0YWNoZWRcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgPiBzcGFuLm5nLWRvLWNoZWNrLWJveCB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogZGFya2dyYXk7XG4gICAgICAgIGNvbG9yOiBkYXJrZ3JheTtcblxuICAgICAgICAmLm5nLWRvLWNoZWNrIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6IHJlZDtcbiAgICAgICAgICBjb2xvcjogcmVkO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmU2ZTY7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgPiBzcGFuLm5nLW9uLWNoYW5nZXMtYm94IHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiBkYXJrZ3JheTtcbiAgICAgICAgY29sb3I6IGRhcmtncmF5O1xuXG4gICAgICAgICYubmctb24tY2hhbmdlcyB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiByZWQ7XG4gICAgICAgICAgY29sb3I6IHJlZDtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlNmU2O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgPiBkaXYubmFtZSB7XG4gICAgICBwYWRkaW5nOiA1cHggMDtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIH1cblxuICAgID4gdGFibGUuaW5wdXQtYm94IHtcbiAgICAgIG1hcmdpbjogNXB4IGF1dG87XG4gICAgICBmb250LXNpemU6IDExcHg7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjMDAwMDAwO1xuICAgICAgYm9yZGVyLXNwYWNpbmc6IDA7XG4gICAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuXG4gICAgICB0ZCxcbiAgICAgIHRoIHtcbiAgICAgICAgcGFkZGluZzogMnB4IDNweDtcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICA+IGRpdi5jb250cm9sID4gYnV0dG9uIHtcbiAgICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICB9XG5cbiAgICA+IGRpdi5jaGlsZHJlbiB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC13cmFwOiBub3dyYXA7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgfVxuICB9XG59XG4iXX0= */";

/***/ }),

/***/ 3383:
/*!***********************************************!*\
  !*** ./src/app/app.component.html?ngResource ***!
  \***********************************************/
/***/ ((module) => {

module.exports = "<div class=\"control\">\n  <section>\n    <header>Trigger global actions</header>\n    <nav>\n      <button #apptick_button>AppRef.tick()</button>\n      <button #timeout_button title=\"Installs a timeout to run in 3s (in ng-zone)\">setTimeout(...)</button>\n      <button #click_button (click)=\"clickNoop()\" title=\"Click with a NoOp\">Click</button>\n    </nav>\n  </section>\n\n  <section>\n    <header>Control dirty check coloring</header>\n    <nav>\n      <label><input type=\"checkbox\" #auto_clear checked>Clear dirty check coloring automatically</label>\n      <span class=\"filler\"></span>\n      <button #clear>Clear</button>\n    </nav>\n  </section>\n\n  <section>\n    <header>Play with component input - current value: <span #input_value_field>n/a</span></header>\n    <nav>\n      <button #trigger_change>Trigger change</button>\n      <label><input type=\"checkbox\" #propagate_by_value_checkbox checked title=\"Provides the new value as a new object (ref-change)\">change input object (ref-change)</label>\n      <label><input type=\"checkbox\" #propagate_by_ref_checkbox checked title=\"Provides the new value by mutating the input object (no-ref-change)\">mutate input object (no ref-change)</label>\n      <label><input type=\"checkbox\" #propagate_by_observable_checkbox checked title=\"Publishes the new value via Observable\">via Observable (no ref-change)</label>\n      <label><input type=\"checkbox\" #propagate_in_zone_checkbox checked>Propagate in Angular zone</label>\n    </nav>\n  </section>\n\n  <section>\n    <header>Expand or collapse ContentChildren</header>\n    <nav>\n      <button #toggle_content_children></button>\n    </nav>\n  </section>\n</div>\n\n<main>\n  <app-comp-1 [inputByVal]=\"inputByVal\" [inputByRef]=\"inputByRef\" [inputObservable]=\"inputObservable\"></app-comp-1>\n\n  <div class=\"explanation\">\n    <section>\n      <header>ngDoCheck</header>\n      <article>\n        <p>Lifecycle hook that is called when Angular dirty checks a directive.</p><br>\n        'ngDoCheck' gets called to check the changes in the directives in addition to the default algorithm. The default\n        change detection algorithm looks for differences by comparing bound-property values by reference across change\n        detection runs.<br>\n        The ngDoCheck lifecycle hook is triggered even if the the component uses OnPush strategy.\n      </article>\n    </section>\n\n    <section>\n      <header>ngOnChanges</header>\n      <article>\n        <p>Lifecycle hook that is called when any data-bound property of a directive changes.</p><br>\n        `ngOnChanges` is called right after the data-bound properties have been checked and before view and content\n        children are checked if at least one of them has changed.\n      </article>\n    </section>\n\n    <section>\n      <header>Good readings</header>\n      <ul>\n        <li><a href=\"https://blog.angularindepth.com/everything-you-need-to-know-about-change-detection-in-angular-8006c51d206f\" target=\"_blank\">Everything you need to know about change detection in Angular</a></li>\n        <li><a href=\"https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html\" target=\"_blank\">ANGULAR CHANGE DETECTION EXPLAINED</a></li>\n      </ul>\n    </section>\n  </div>\n</main>\n";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map