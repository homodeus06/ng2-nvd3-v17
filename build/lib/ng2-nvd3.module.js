"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NvD3Module = void 0;
var core_1 = require("@angular/core");
var ng2_nvd3_component_1 = require("./ng2-nvd3.component");
var i0 = require("@angular/core");
var NvD3Module = (function () {
    function NvD3Module() {
    }
    NvD3Module.ɵfac = function NvD3Module_Factory(t) { return new (t || NvD3Module)(); };
    NvD3Module.ɵmod = i0.ɵɵdefineNgModule({ type: NvD3Module });
    NvD3Module.ɵinj = i0.ɵɵdefineInjector({});
    return NvD3Module;
}());
exports.NvD3Module = NvD3Module;
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NvD3Module, [{
        type: core_1.NgModule,
        args: [{
                declarations: [ng2_nvd3_component_1.NvD3Component],
                exports: [ng2_nvd3_component_1.NvD3Component]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NvD3Module, { declarations: [ng2_nvd3_component_1.NvD3Component], exports: [ng2_nvd3_component_1.NvD3Component] }); })();
