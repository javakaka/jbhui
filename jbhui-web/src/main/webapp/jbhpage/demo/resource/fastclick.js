(function () {
    function m(g, b) {
        var f;
        b = b || {};
        this.trackingClick = false;
        this.trackingClickStart = 0;
        this.targetElement = null;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.lastTouchIdentifier = 0;
        this.touchBoundary = b.touchBoundary || 10;
        this.layer = g;
        this.tapDelay = b.tapDelay || 200;
        this.tapTimeout = b.tapTimeout || 700;
        if (m.notNeeded(g)) {
            return
        }
        function e(o, p) {
            return function () {
                return o.apply(p, arguments)
            }
        }
        var c = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"];
        var r = this;
        for (var a = 0, d = c.length; a < d; a++) {
            r[c[a]] = e(r[c[a]], r)
        }
        if (h) {
            g.addEventListener("mouseover", this.onMouse, true);
            g.addEventListener("mousedown", this.onMouse, true);
            g.addEventListener("mouseup", this.onMouse, true)
        }
        g.addEventListener("click", this.onClick, true);
        g.addEventListener("touchstart", this.onTouchStart, false);
        g.addEventListener("touchmove", this.onTouchMove, false);
        g.addEventListener("touchend", this.onTouchEnd, false);
        g.addEventListener("touchcancel", this.onTouchCancel, false);
        if (!Event.prototype.stopImmediatePropagation) {
            g.removeEventListener = function (o, q, p) {
                var t = Node.prototype.removeEventListener;
                if (o === "click") {
                    t.call(g, o, q.hijacked || q, p)
                } else {
                    t.call(g, o, q, p)
                }
            };
            g.addEventListener = function (t, q, o) {
                var p = Node.prototype.addEventListener;
                if (t === "click") {
                    p.call(g, t, q.hijacked || (q.hijacked = function (s) {
                        if (!s.propagationStopped) {
                            q(s)
                        }
                    }), o)
                } else {
                    p.call(g, t, q, o)
                }
            }
        }
        if (typeof g.onclick === "function") {
            f = g.onclick;
            g.addEventListener("click", function (o) {
                f(o)
            }, false);
            g.onclick = null
        }
    }
    var n = navigator.userAgent.indexOf("Windows Phone") >= 0;
    var h = navigator.userAgent.indexOf("Android") > 0 && !n;
    var j = /iP(ad|hone|od)/.test(navigator.userAgent) && !n;
    var l = j && (/OS 4_\d(_\d)?/).test(navigator.userAgent);
    var k = j && (/OS [6-7]_\d/).test(navigator.userAgent);
    var i = navigator.userAgent.indexOf("BB10") > 0;
    m.prototype.needsClick = function (a) {
        switch (a.nodeName.toLowerCase()) {
        case "button":
        case "select":
        case "textarea":
            if (a.disabled) {
                return true
            }
            break;
        case "input":
            if ((j && a.type === "file") || a.disabled) {
                return true
            }
            break;
        case "label":
        case "iframe":
        case "video":
            return true
        }
        return (/\bneedsclick\b/).test(a.className)
    };
    m.prototype.needsFocus = function (a) {
        switch (a.nodeName.toLowerCase()) {
        case "textarea":
            return true;
        case "select":
            return !h;
        case "input":
            switch (a.type) {
            case "button":
            case "checkbox":
            case "file":
            case "image":
            case "radio":
            case "submit":
                return false
            }
            return !a.disabled && !a.readOnly;
        default:
            return (/\bneedsfocus\b/).test(a.className)
        }
    };
    m.prototype.sendClick = function (c, b) {
        var d, a;
        if (document.activeElement && document.activeElement !== c) {
            document.activeElement.blur()
        }
        a = b.changedTouches[0];
        d = document.createEvent("MouseEvents");
        d.initMouseEvent(this.determineEventType(c), true, true, window, 1, a.screenX, a.screenY, a.clientX, a.clientY, false, false, false, false, 0, null);
        d.forwardedTouchEvent = true;
        c.dispatchEvent(d)
    };
    m.prototype.determineEventType = function (a) {
        if (h && a.tagName.toLowerCase() === "select") {
            return "mousedown"
        }
        return "click"
    };
    m.prototype.focus = function (b) {
        var a;
        if (j && b.setSelectionRange && b.type.indexOf("date") !== 0 && b.type !== "time" && b.type !== "month") {
            a = b.value.length;
            b.setSelectionRange(a, a)
        } else {
            b.focus()
        }
    };
    m.prototype.updateScrollParent = function (b) {
        var a, c;
        a = b.fastClickScrollParent;
        if (!a || !a.contains(b)) {
            c = b;
            do {
                if (c.scrollHeight > c.offsetHeight) {
                    a = c;
                    b.fastClickScrollParent = c;
                    break
                }
                c = c.parentElement
            } while (c)
        }
        if (a) {
            a.fastClickLastScrollTop = a.scrollTop
        }
    };
    m.prototype.getTargetElementFromEventTarget = function (a) {
        if (a.nodeType === Node.TEXT_NODE) {
            return a.parentNode
        }
        return a
    };
    m.prototype.onTouchStart = function (b) {
        var d, a, c;
        if (b.targetTouches.length > 1) {
            return true
        }
        d = this.getTargetElementFromEventTarget(b.target);
        a = b.targetTouches[0];
        if (j) {
            c = window.getSelection();
            if (c.rangeCount && !c.isCollapsed) {
                return true
            }
            if (!l) {
                if (a.identifier && a.identifier === this.lastTouchIdentifier) {
                    b.preventDefault();
                    return false
                }
                this.lastTouchIdentifier = a.identifier;
                this.updateScrollParent(d)
            }
        }
        this.trackingClick = true;
        this.trackingClickStart = b.timeStamp;
        this.targetElement = d;
        this.touchStartX = a.pageX;
        this.touchStartY = a.pageY;
        if ((b.timeStamp - this.lastClickTime) < this.tapDelay) {
            b.preventDefault()
        }
        return true
    };
    m.prototype.touchHasMoved = function (c) {
        var a = c.changedTouches[0],
            b = this.touchBoundary;
        if (Math.abs(a.pageX - this.touchStartX) > b || Math.abs(a.pageY - this.touchStartY) > b) {
                return true
            }
        return false
    };
    m.prototype.onTouchMove = function (a) {
        if (!this.trackingClick) {
            return true
        }
        if (this.targetElement !== this.getTargetElementFromEventTarget(a.target) || this.touchHasMoved(a)) {
            this.trackingClick = false;
            this.targetElement = null
        }
        return true
    };
    m.prototype.findControl = function (a) {
        if (a.control !== undefined) {
            return a.control
        }
        if (a.htmlFor) {
            return document.getElementById(a.htmlFor)
        }
        return a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    };
    m.prototype.onTouchEnd = function (d) {
        var b, c, e, g, a, f = this.targetElement;
        if (!this.trackingClick) {
            return true
        }
        if ((d.timeStamp - this.lastClickTime) < this.tapDelay) {
            this.cancelNextClick = true;
            return true
        }
        if ((d.timeStamp - this.trackingClickStart) > this.tapTimeout) {
            return true
        }
        this.cancelNextClick = false;
        this.lastClickTime = d.timeStamp;
        c = this.trackingClickStart;
        this.trackingClick = false;
        this.trackingClickStart = 0;
        if (k) {
            a = d.changedTouches[0];
            f = document.elementFromPoint(a.pageX - window.pageXOffset, a.pageY - window.pageYOffset) || f;
            f.fastClickScrollParent = this.targetElement.fastClickScrollParent
        }
        e = f.tagName.toLowerCase();
        if (e === "label") {
            b = this.findControl(f);
            if (b) {
                this.focus(f);
                if (h) {
                    return false
                }
                f = b
            }
        } else {
            if (this.needsFocus(f)) {
                if ((d.timeStamp - c) > 100 || (j && window.top !== window && e === "input")) {
                    this.targetElement = null;
                    return false
                }
                this.focus(f);
                this.sendClick(f, d);
                if (!j || e !== "select") {
                    this.targetElement = null;
                    d.preventDefault()
                }
                return false
            }
        }
        if (j && !l) {
            g = f.fastClickScrollParent;
            if (g && g.fastClickLastScrollTop !== g.scrollTop) {
                return true
            }
        }
        if (!this.needsClick(f)) {
            d.preventDefault();
            this.sendClick(f, d)
        }
        return false
    };
    m.prototype.onTouchCancel = function () {
        this.trackingClick = false;
        this.targetElement = null
    };
    m.prototype.onMouse = function (a) {
        if (!this.targetElement) {
            return true
        }
        if (a.forwardedTouchEvent) {
            return true
        }
        if (!a.cancelable) {
            return true
        }
        if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
            if (a.stopImmediatePropagation) {
                a.stopImmediatePropagation()
            } else {
                a.propagationStopped = true
            }
            a.stopPropagation();
            a.preventDefault();
            return false
        }
        return true
    };
    m.prototype.onClick = function (b) {
        var a;
        if (this.trackingClick) {
            this.targetElement = null;
            this.trackingClick = false;
            return true
        }
        if (b.target.type === "submit" && b.detail === 0) {
            return true
        }
        a = this.onMouse(b);
        if (!a) {
            this.targetElement = null
        }
        return a
    };
    m.prototype.destroy = function () {
        var a = this.layer;
        if (h) {
            a.removeEventListener("mouseover", this.onMouse, true);
            a.removeEventListener("mousedown", this.onMouse, true);
            a.removeEventListener("mouseup", this.onMouse, true)
        }
        a.removeEventListener("click", this.onClick, true);
        a.removeEventListener("touchstart", this.onTouchStart, false);
        a.removeEventListener("touchmove", this.onTouchMove, false);
        a.removeEventListener("touchend", this.onTouchEnd, false);
        a.removeEventListener("touchcancel", this.onTouchCancel, false)
    };
    m.notNeeded = function (d) {
        var e;
        var a;
        var b;
        var c;
        if (typeof window.ontouchstart === "undefined") {
            return true
        }
        a = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];
        if (a) {
            if (h) {
                e = document.querySelector("meta[name=viewport]");
                if (e) {
                    if (e.content.indexOf("user-scalable=no") !== -1) {
                        return true
                    }
                    if (a > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
                        return true
                    }
                }
            } else {
                return true
            }
        }
        if (i) {
            b = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
            if (b[1] >= 10 && b[2] >= 3) {
                e = document.querySelector("meta[name=viewport]");
                if (e) {
                    if (e.content.indexOf("user-scalable=no") !== -1) {
                        return true
                    }
                    if (document.documentElement.scrollWidth <= window.outerWidth) {
                        return true
                    }
                }
            }
        }
        if (d.style.msTouchAction === "none" || d.style.touchAction === "manipulation") {
            return true
        }
        c = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];
        if (c >= 27) {
            e = document.querySelector("meta[name=viewport]");
            if (e && (e.content.indexOf("user-scalable=no") !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
                return true
            }
        }
        if (d.style.touchAction === "none" || d.style.touchAction === "manipulation") {
            return true
        }
        return false
    };
    m.attach = function (a, b) {
        return new m(a, b)
    };
    if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
        define(function () {
            return m
        })
    } else {
        if (typeof module !== "undefined" && module.exports) {
            module.exports = m.attach;
            module.exports.FastClick = m
        } else {
            window.FastClick = m
        }
    }
}());