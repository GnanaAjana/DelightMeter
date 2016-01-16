(function() {
    'use strict';

    angular.module('app')
        .directive('delightmeter', delightmeter);

    function delightmeter() {
        return {
            restrict: 'EAC',
            scope: {
                meterRange: '=ngModel'
            },
            link: function(scope, elem, attrs) {

                /* initialization */

                var Needle, arc, arcEndRad, arcStartRad, chart, endPadRad, height, needle, percToRad, radius, sectionIndx, arcPerc, startPadRad, svg, width, _i,
                    el = d3.select('.delight-meter'),
                    noOfArc = 5,
                    padRad = 0.02,
                    chartInset = 0,
                    arcWidth = 20,
                    totalPercent = 0.75,
                    margin = {
                        top: 20,
                        right: 20,
                        bottom: 30,
                        left: 20
                    };

                /* start number of arc percentage, width, height and radius of arc decalaration */

                arcPerc = 1 / noOfArc / 2;

                width = 400 - margin.left - margin.right;

                height = width;

                radius = Math.min(width, height) / 2;

                /* end number of arc percentage, width, height and radius of arc decalaration */

                /* start percentage to radian */

                percToRad = function(perc) {
                    return (perc * 360) * Math.PI / 180;
                };

                /* end percentage to radian */

                /* start of arc creation */

                svg = el.append('svg').attr('width', 400).attr('height', 200);

                chart = svg.append('g').attr('transform', "translate(" + ((width + margin.left) / 2) + ", " + ((height + margin.top) / 2) + ")");

                for (sectionIndx = _i = 1; 1 <= noOfArc ? _i <= noOfArc : _i >= noOfArc; sectionIndx = 1 <= noOfArc ? ++_i : --_i) {
                    arcStartRad = percToRad(totalPercent);
                    arcEndRad = arcStartRad + percToRad(arcPerc);
                    totalPercent += arcPerc;
                    startPadRad = sectionIndx === 0 ? 0 : padRad / 2;
                    endPadRad = sectionIndx === noOfArc ? 0 : padRad / 2;
                    arc = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - arcWidth).startAngle(arcStartRad + startPadRad).endAngle(arcEndRad - endPadRad);
                    chart.append('path').attr('class', "arc chart-color" + sectionIndx).attr('d', arc);
                }

                /* end of arc creation */

                /* start of needle class */

                Needle = (function() {

                    /* needle constructor */
                    function Needle(len, radius) {
                        this.len = len;
                        this.radius = radius;
                    }

                    /* draw needle from the center of arc */

                    Needle.prototype.drawNeedle = function(el, perc) {
                        var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY, d;
                        thetaRad = percToRad(perc / 2);
                        centerX = 0;
                        centerY = 0;
                        topX = centerX - this.len * Math.cos(thetaRad);
                        topY = centerY - this.len * Math.sin(thetaRad);
                        leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
                        leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
                        rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
                        rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
                        d = "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
                        el.append('circle').attr('class', 'needle-center').attr('cx', 0).attr('cy', 0).attr('r', this.radius);
                        return el.append('path').attr('class', 'needle').attr('d', d);
                    };
                    

                    /* rotate needle according to percentage */

                    Needle.prototype.rotateNeedle = function(percent) {
                        percent = (percent * 180) / 100;
                        d3.select(".needle").transition().delay(300).ease('qubic').duration(2000).style("transform", "rotate(" + percent + "deg)");
                    };

                    return Needle;

                })();

                /* end of needle class */

                needle = new Needle(150, 6);

                needle.drawNeedle(chart, scope.meterRange);

                /* watch percentage value and rotate needle */

                scope.$watch(
                    'meterRange',
                    function handleFooChange(newValue) {
                        needle.rotateNeedle(newValue);
                    }
                );

            },
            template: "<div class='delight-meter'></div>"
        };
    }
})();