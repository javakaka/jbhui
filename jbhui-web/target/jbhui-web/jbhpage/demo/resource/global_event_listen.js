(function () {
    try {
        var b = function () {
            var q = this,
                r = {},
                n = {};
            r.custom = {};

            function v(d) {
                    return (typeof d !== "undefined") && d != null
                }
            function p(d) {
                    return Object.prototype.toString.call(Object(d)) == "[object Array]"
                }
            function l(e) {
                    var d = "timg" + new Date().getTime();
                    window[d] = new Image(1, 1);
                    window[d].src = e
                }
            function s(d, g, e) {
                    var f = {};
                    f.key = d;
                    f.value = g;
                    f.isEncodeURI = e;
                    return f
                }
            function u(f) {
                    if (v(f) && v(f.key) && v(f.value)) {
                        var d = f.key;
                        var g = f.value;
                        var e = f.isEncodeURI;
                        if (e) {
                            g = encodeURIComponent(g)
                        }
                        return d + "=" + g
                    }
                    return ""
                }
            function o() {
                    var f = "";
                    f += "&bd={";
                    for (var e in n) {
                        var g = n[e];
                        var d = u(g);
                        if (d) {
                            f += d + "|"
                        }
                    }
                    f += "}";
                    return f
                }
            function m(d, g, f, e) {
                    if ((v(d) || v(f)) && g != null) {
                        var h = null;
                        if (v(f)) {
                            h = f
                        } else {
                            h = d
                        }
                        n[h] = s(d, g, e)
                    }
                }
            q.setCustomVar = function (e, d) {
                    r.custom[e] = d
                };

            function t(e) {
                    if (p(e)) {
                        for (var g = 0; g < e.length; g++) {
                            try {
                                var f = e[g][0];
                                q[f].apply(q, (e[g].slice(1)))
                            } catch (d) {}
                        }
                    }
                }
            q.send = function (h) {
                    try {
                        t(h);
                        var k = false;
                        var g = r.custom;
                        for (var w in g) {
                            var d = g[w];
                            m(w, d);
                            k = true
                        }
                        if (k) {
                            var i = (typeof URLPrefix != "undefined" && URLPrefix.tracker) ? URLPrefix.tracker : "tracker.yhd.com";
                            var e = ("https:" == document.location.protocol ? "https://" : "http://") + i + "/related/logInfo.do?1=1";
                            var j = e + o();
                            l(j)
                        }
                    } catch (f) {}
                }
        };
        var c = {
            init: function () {
                function q(d) {
                    return Object.prototype.toString.call(Object(d)) == "[object Array]"
                }
                function i(h) {
                    var e = window.EventEntity || (window.EventEntity = {});
                    var j = e.paramObj;
                    if (j && j[h] && q(j[h])) {
                        var k = j[h];
                        var g = k.length;
                        var d = new b;
                        for (var u = 0; u < g; u++) {
                            var f = k.shift();
                            d.send(f)
                        }
                    }
                }
                try {
                    var t = {
                        logSendEvent: i
                    };
                    var m = window.document;
                    for (var n in t) {
                        i(n);
                        var s = t[n];
                        if (m.createEvent) {
                            m.addEventListener(n, function () {
                                s(n)
                            }, false)
                        } else {
                            if (m.attachEvent) {
                                var o = m.getElementsByTagName("meta");
                                for (var r = 0; r < o.length; r++) {
                                    if (o[r].getAttribute("name") == n) {
                                        var l = o[r];
                                        l.attachEvent("onpropertychange", function (d) {
                                            if (d.propertyName == "fakeEvents") {
                                                s(n)
                                            }
                                        });
                                        break
                                    }
                                }
                            }
                        }
                    }
                } catch (p) {}
            }
        };
        c.init()
    } catch (a) {}
})();