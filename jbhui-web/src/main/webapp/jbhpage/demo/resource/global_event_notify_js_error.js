(function () {
    var a = {
        init: function () {
            try {
                var c = window.EventEntity || (window.EventEntity = {});
                var b = window.document;
                var e = {
                    logSendEvent: null,
                    trackerEvent: null
                };
                for (var f in e) {
                    var g = null;
                    if (b.createEvent) {
                        g = b.createEvent("HTMLEvents");
                        g.initEvent(f, false, false)
                    } else {
                        if (b.attachEvent) {
                            g = b.createElement("meta");
                            g.name = f;
                            g.fakeEvents = 0;
                            b.getElementsByTagName("head")[0].appendChild(g)
                        }
                    }
                    e[f] = g
                }
                c.notifyLogSend = function () {
                    if (b.dispatchEvent) {
                        b.dispatchEvent(e.logSendEvent)
                    } else {
                        if (b.attachEvent) {
                            e.logSendEvent.fakeEvents++
                        }
                    }
                };
                c.notify = function (h) {
                    if (h && e[h]) {
                        if (b.dispatchEvent) {
                            b.dispatchEvent(e[h])
                        } else {
                            if (b.attachEvent) {
                                e[h].fakeEvents++
                            }
                        }
                    }
                }
            } catch (d) {}
        }
    };
    a.init()
})();
(function () {
    var a = {
        start: function () {
            try {
                function e(g) {
                    return (typeof g !== "undefined") && g != null
                }
                function c(g) {
                    if (!g || g == null) {
                        return ""
                    }
                    return g.replace(/(^\s*)|(\s*$)/g, "")
                }
                function f() {
                    var j = null;
                    var k = document.getElementsByTagName("meta");
                    for (var i = 0; i < k.length; i++) {
                        if (k[i].getAttribute("name") == "tp_page") {
                            var g = k[i].getAttribute("content");
                            g = c(g);
                            var h = ".";
                            if (e(g)) {
                                if (g.indexOf(h) > 0) {
                                    j = g.split(h);
                                    if (j.length == 1) {
                                        j.push(0)
                                    }
                                } else {
                                    if (g.indexOf(h) != 0) {
                                        j = [g, 0]
                                    }
                                }
                            }
                            break
                        }
                    }
                    return j
                }
                function b(i, m, k) {
                    var l = null,
                        j = null,
                        h = null;
                    var g = location.href;
                    if (i && i.message) {
                            l = i.message;
                            j = i.filename;
                            h = i.lineno
                        } else {
                            l = i;
                            j = m;
                            h = k
                        }
                    if (e(l) && e(g)) {
                            setTimeout(function () {
                                var o = [];
                                o.push(["setCustomVar", "logType", "jsError"]);
                                o.push(["setCustomVar", "url", encodeURIComponent(g)]);
                                o.push(["setCustomVar", "msg", l]);
                                o.push(["setCustomVar", "fileName", encodeURIComponent(j)]);
                                o.push(["setCustomVar", "line", h]);
                                o.push(["setCustomVar", "iev", encodeURIComponent(navigator.userAgent) || ""]);
                                var n = f();
                                if (e(n)) {
                                    o.push(["setCustomVar", "pageTypeId", n[0] || 0]);
                                    o.push(["setCustomVar", "pageValue", n[1] || 0])
                                } else {
                                    o.push(["setCustomVar", "pageTypeId", 0]);
                                    o.push(["setCustomVar", "pageValue", 0])
                                }
                                if (window.EventEntity && window.EventEntity.notifyLogSend) {
                                    if (!window.EventEntity.paramObj) {
                                        window.EventEntity.paramObj = {}
                                    }
                                    if (!window.EventEntity.paramObj.logSendEvent) {
                                        window.EventEntity.paramObj.logSendEvent = []
                                    }
                                    window.EventEntity.paramObj.logSendEvent.push(o);
                                    window.EventEntity.notifyLogSend()
                                }
                            }, 0)
                        }
                }
                if (window.attachEvent) {
                    window.attachEvent("onerror", b)
                } else {
                    if (window.addEventListener) {
                        window.addEventListener("error", b, false)
                    }
                }
            } catch (d) {}
        }
    };
    a.start()
})();