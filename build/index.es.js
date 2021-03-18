import * as React from 'react';
import { useDrag } from 'react-use-gesture';
import { useSpring, animated } from 'react-spring';
import { useRect } from '@reach/rect';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".overflowed-container {\n  width: 100%;\n  overflow-x: hidden; }\n\n.overflowed-viewport {\n  display: flex;\n  white-space: nowrap;\n  flex-wrap: nowrap;\n  align-items: center;\n  cursor: grab;\n  user-select: none; }\n  .overflowed-viewport.idle {\n    cursor: auto; }\n\n.overflowed-progress {\n  position: relative;\n  height: 12px;\n  width: 100%;\n  background-color: #ddd; }\n\n.overflowed-bar {\n  position: absolute;\n  height: 12px;\n  width: 0%;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background-color: currentColor; }\n";
styleInject(css_248z);

var Overflowed = function (props) {
    var _a = props.className, className = _a === void 0 ? undefined : _a, _b = props.maskClassName, maskClassName = _b === void 0 ? undefined : _b, children = props.children, _c = props.controls, controls = _c === void 0 ? false : _c, _d = props.progressBar, progressBar = _d === void 0 ? false : _d, overflowedWidth = props.overflowedWidth;
    var maskRef = React.useRef(null);
    var _e = React.useState(true), observe = _e[0]; _e[1]; // TODO: v1
    var rect = useRect(maskRef, { observe: observe });
    var progressRef = React.useRef(null);
    var _f = useSpring(function () { return ({
        x: 0,
    }); }), x = _f[0].x, set = _f[1];
    var bind = useDrag(function (_a) {
        var mx = _a.movement[0]; _a.delta[0]; var tap = _a.tap;
        return moveViewportContainer({ tap: tap, mx: mx });
    }, {
        initial: function () { var _a; return [(_a = x === null || x === void 0 ? void 0 : x.getValue()) !== null && _a !== void 0 ? _a : 0, 0]; },
        bounds: { left: -overflowedWidth + (rect ? rect === null || rect === void 0 ? void 0 : rect.width : 0), right: 0 },
        rubberband: 0.2,
    });
    var moveViewportContainer = function (props) {
        var tap = props.tap, mx = props.mx;
        if (tap)
            return;
        if (rect && (rect === null || rect === void 0 ? void 0 : rect.width) >= overflowedWidth) {
            // if parent has enough room we should cancel drags, just in case reset progress to initial
            return set({ x: 0 });
        }
        else {
            set({ x: mx });
            if (progressBar) {
                window.requestAnimationFrame(function () {
                    progressRef.current.style.width = getProgress().toFixed(0) + "%";
                });
            }
        }
    };
    var getProgress = function () { return (Math.abs(x.getValue()) / (overflowedWidth - (rect ? rect === null || rect === void 0 ? void 0 : rect.width : 0))) * 100; };
    var setProgres = function (amount) {
        set({ x: amount });
        if (progressBar) {
            window.requestAnimationFrame(function () {
                progressRef.current.style.width = (Math.abs(amount / (overflowedWidth - (rect ? rect === null || rect === void 0 ? void 0 : rect.width : 0))) * 100).toFixed(0) + "%";
            });
        }
    };
    var maskClassNames = ['overflowed-container', maskClassName].filter(Boolean).join(' ');
    var viewportmaskClassNames = ['overflowed-viewport', className, rect && (rect === null || rect === void 0 ? void 0 : rect.width) >= overflowedWidth && 'overflowed-idle'].filter(Boolean).join(' ');
    return (React.createElement("div", { className: maskClassNames, ref: maskRef },
        React.createElement(animated.div, __assign({ className: viewportmaskClassNames }, bind(), { style: {
                transform: x && x.interpolate(function (x) { return "translate3d(" + x + "px,0,0)"; }),
                touchAction: 'pan-y',
                width: overflowedWidth + "px",
            } }), children),
        controls &&
            controls({
                setProgres: setProgres,
                getProgress: getProgress,
            }),
        progressBar && rect && (rect === null || rect === void 0 ? void 0 : rect.width) < overflowedWidth && (React.createElement("div", { className: "overflowed-progress", "aria-hidden": "true" },
            React.createElement("div", { className: "overflowed-bar", ref: progressRef })))));
};

export { Overflowed };
//# sourceMappingURL=index.es.js.map
