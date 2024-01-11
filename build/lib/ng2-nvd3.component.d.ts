/// <reference path="../../typings/globals/d3/index.d.ts" />
/// <reference path="../../typings/globals/nvd3/index.d.ts" />
import { OnChanges, OnDestroy, ElementRef, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NvD3Component implements OnChanges, OnDestroy {
    options: any;
    data: any;
    el: HTMLElement;
    chart: any;
    chartType: string;
    svg: any;
    constructor(elementRef: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    initChart(options: any): void;
    updateWithOptions(options: any): void;
    updateWithData(data: any): void;
    updateSize(): void;
    configure(chart: any, options: any, chartType: any): void;
    configureEvents(dispatch: any, options: any): void;
    clearElement(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NvD3Component, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NvD3Component, "nvd3", never, { "options": { "alias": "options"; "required": false; }; "data": { "alias": "data"; "required": false; }; }, {}, never, never, false, never>;
}
