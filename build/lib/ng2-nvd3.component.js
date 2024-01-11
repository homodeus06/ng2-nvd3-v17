"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NvD3Component = void 0;
var core_1 = require("@angular/core");
var i0 = require("@angular/core");
var NvD3Component = (function () {
    function NvD3Component(elementRef) {
        this.el = elementRef.nativeElement;
    }
    NvD3Component.prototype.ngOnChanges = function (changes) {
        if (this.options) {
            if (!this.chart || this.chartType !== this.options.chart.type) {
                this.initChart(this.options);
            }
            else {
                this.updateWithOptions(this.options);
            }
        }
    };
    NvD3Component.prototype.ngOnDestroy = function () {
        this.clearElement();
    };
    NvD3Component.prototype.initChart = function (options) {
        var _this = this;
        this.clearElement();
        if (!options)
            return;
        this.chart = nv.models[options.chart.type]();
        this.chartType = this.options.chart.type;
        this.chart.id = Math.random().toString(36).substr(2, 15);
        this.updateWithOptions(options);
        nv.addGraph(function () {
            if (!_this.chart)
                return;
            if (_this.chart.resizeHandler)
                _this.chart.resizeHandler.clear();
            _this.chart.resizeHandler = nv.utils.windowResize(function () {
                _this.chart && _this.chart.update && _this.chart.update();
            });
            return _this.chart;
        }, options.chart['callback']);
    };
    NvD3Component.prototype.updateWithOptions = function (options) {
        if (!options)
            return;
        for (var key in this.chart) {
            if (!this.chart.hasOwnProperty(key))
                continue;
            var value = this.chart[key];
            if (key[0] === '_') { }
            else if ([
                'clearHighlights',
                'highlightPoint',
                'id',
                'options',
                'resizeHandler',
                'state',
                'open',
                'close',
                'tooltipContent'
            ].indexOf(key) >= 0) { }
            else if (key === 'dispatch')
                this.configureEvents(this.chart[key], options.chart[key]);
            else if ([
                'bars',
                'bars1',
                'bars2',
                'boxplot',
                'bullet',
                'controls',
                'discretebar',
                'distX',
                'distY',
                'interactiveLayer',
                'legend',
                'lines',
                'lines1',
                'lines2',
                'multibar',
                'pie',
                'scatter',
                'scatters1',
                'scatters2',
                'sparkline',
                'stack1',
                'stack2',
                'sunburst',
                'tooltip',
                'x2Axis',
                'xAxis',
                'y1Axis',
                'y2Axis',
                'y3Axis',
                'y4Axis',
                'yAxis',
                'yAxis1',
                'yAxis2',
                'sankeyChart'
            ].indexOf(key) >= 0 ||
                (key === 'stacked' && options.chart.type === 'stackedAreaChart')) {
                this.configure(this.chart[key], options.chart[key], options.chart.type);
            }
            else if ((key === 'xTickFormat' || key === 'yTickFormat') && options.chart.type === 'lineWithFocusChart') {
            }
            else if ((key === 'tooltips') && options.chart.type === 'boxPlotChart') {
            }
            else if ((key === 'tooltipXContent' || key === 'tooltipYContent') && options.chart.type === 'scatterChart') {
            }
            else if (options.chart[key] === undefined || options.chart[key] === null) {
            }
            else
                this.chart[key](options.chart[key]);
        }
        this.updateWithData(this.data);
    };
    NvD3Component.prototype.updateWithData = function (data) {
        if (data) {
            {
                var svgElement = this.el.querySelector('svg');
                if (!svgElement) {
                    this.svg = d3.select(this.el).append('svg');
                }
                else {
                    this.svg = d3.select(svgElement);
                }
            }
            this.updateSize();
            this.svg.datum(data).call(this.chart);
        }
    };
    NvD3Component.prototype.updateSize = function () {
        if (this.svg) {
            var h = void 0, w = void 0;
            if (h = this.options.chart.height) {
                if (!isNaN(+h))
                    h += 'px';
                this.svg.attr('height', h).style({ height: h });
            }
            if (w = this.options.chart.width) {
                if (!isNaN(+w))
                    w += 'px';
                this.svg.attr('width', w).style({ width: w });
            }
            else {
                this.svg.attr('width', '100%').style({ width: '100%' });
            }
        }
    };
    NvD3Component.prototype.configure = function (chart, options, chartType) {
        if (chart && options) {
            for (var key in chart) {
                if (!chart.hasOwnProperty(key))
                    continue;
                var value = chart[key];
                if (key[0] === '_') {
                }
                else if (key === 'dispatch')
                    this.configureEvents(value, options[key]);
                else if (key === 'tooltip')
                    this.configure(chart[key], options[key], chartType);
                else if (key === 'contentGenerator') {
                    if (options[key])
                        chart[key](options[key]);
                }
                else if ([
                    'axis',
                    'clearHighlights',
                    'defined',
                    'highlightPoint',
                    'nvPointerEventsClass',
                    'options',
                    'rangeBand',
                    'rangeBands',
                    'scatter',
                    'open',
                    'close'
                ].indexOf(key) === -1) {
                    if (options[key] === undefined || options[key] === null) {
                    }
                    else
                        chart[key](options[key]);
                }
            }
        }
    };
    NvD3Component.prototype.configureEvents = function (dispatch, options) {
        if (dispatch && options) {
            for (var key in dispatch) {
                if (!dispatch.hasOwnProperty(key))
                    continue;
                var value = dispatch[key];
                if (options[key] === undefined || options[key] === null) {
                }
                else
                    dispatch.on(key + '._', options[key]);
            }
        }
    };
    NvD3Component.prototype.clearElement = function () {
        this.el.innerHTML = '';
        if (this.chart && this.chart.tooltip && this.chart.tooltip.id) {
            d3.select('#' + this.chart.tooltip.id()).remove();
        }
        if (nv['graphs'] && this.chart) {
            for (var i = nv['graphs'].length - 1; i >= 0; i--) {
                if (nv['graphs'][i] && (nv['graphs'][i].id === this.chart.id)) {
                    nv['graphs'].splice(i, 1);
                }
            }
        }
        if (nv.tooltip && nv.tooltip.cleanup) {
            nv.tooltip.cleanup();
        }
        if (this.chart && this.chart.resizeHandler)
            this.chart.resizeHandler.clear();
        this.chart = null;
    };
    NvD3Component.ɵfac = function NvD3Component_Factory(t) { return new (t || NvD3Component)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
    NvD3Component.ɵcmp = i0.ɵɵdefineComponent({ type: NvD3Component, selectors: [["nvd3"]], inputs: { options: "options", data: "data" }, features: [i0.ɵɵNgOnChangesFeature], decls: 0, vars: 0, template: function NvD3Component_Template(rf, ctx) { }, encapsulation: 2 });
    return NvD3Component;
}());
exports.NvD3Component = NvD3Component;
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NvD3Component, [{
        type: core_1.Component,
        args: [{
                selector: 'nvd3',
                template: ""
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { options: [{
            type: core_1.Input
        }], data: [{
            type: core_1.Input
        }] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NvD3Component, { className: "NvD3Component", filePath: "lib\\ng2-nvd3.component.ts", lineNumber: 9 }); })();
