/* SVN.committedRevision=1724923 */
(function (f, h) {
    var o = {
        ie10: f.navigator.msPointerEnabled,
        ie11: f.navigator.pointerEnabled
    };
    var b = ["touchstart", "touchmove", "touchend"];
    var s = {
        touch: (f.Modernizr && Modernizr.touch === true) || (function () {
            return !!(("ontouchstart" in f) || f.DocumentTouch && document instanceof DocumentTouch)
        })()
    };
    if (o.ie10) {
        b = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]
    }
    if (o.ie11) {
        b = ["pointerdown", "pointermove", "pointerup"]
    }
    var c = {
        touchStart: b[0],
        touchMove: b[1],
        touchEnd: b[2]
    };
    var t = {
        replaceWebP: function (v) {
            return v
        }
    };
    var j = true;
    var a = f.devicePixelRatio || 1;
    h.fn.swipeSlide = function (v) {
        return new r(this, v)
    };
    var r = function (v, x) {
        var w = this;
        w.$el = h(v);
        w._distance = 50;
        w.allowSlideClick = true;
        w.init(x)
    };
    r.prototype.init = function (C) {
        var A = this;
        A.opts = h.extend({}, {
            ul: A.$el.children("ul"),
            li: A.$el.children().children("li"),
            index: 0,
            continuousScroll: false,
            autoSwipe: true,
            speed: 4000,
            axisX: true,
            transitionType: "ease",
            lazyLoad: false,
            callback: function () {}
        }, C);
        A._index = A.opts.index;
        A._liLength = A.opts.li.length;
        A.isScrolling;
        if (loli && loli.util && loli.util.webp) {
            t = loli.util.webp
        }
        var v = f.navigator.userAgent;
        var w = f.navigator.connection;
        if (/MicroMessenger/.test(v)) {
            if (/NetType/.test(v)) {
                var D = v.match(/NetType\/(\S)+/)[0].replace("NetType/", "");
                if (D && D != "WIFI") {
                    j = false
                }
            } else {
                document.addEventListener("WeixinJSBridgeReady", function B() {
                    WeixinJSBridge.invoke("getNetworkType", {}, function (E) {
                        if (E.err_msg != "network_type:wifi") {
                            j = false
                        }
                    })
                })
            }
        } else {
            if (w) {
                var x = w.type;
                if (x != "wifi" && x != "2" && x != "unknown") {
                    j = false
                }
            }
        }
        A.opts.callback(A._index, A._liLength);
        if (A._liLength <= 1) {
            if (A.opts.lazyLoad) {
                i(A, 0)
            }
            return false
        }
        if (A.opts.continuousScroll) {
            A.opts.ul.prepend(A.opts.li.last().clone()).append(A.opts.li.first().clone())
        }
        if (A.opts.lazyLoad) {
            i(A, A._index);
            if (A.opts.continuousScroll) {
                i(A, A._index + 1);
                i(A, A._index + 2);
                if (A._index == 0) {
                    i(A, A._liLength)
                } else {
                    if (A._index + 1 == A._liLength) {
                        i(A, 1)
                    }
                }
            } else {
                i(A, A._index + 1 == A._liLength ? A._liLength - 2 : A._index + 1)
            }
        }
        z();
        if (o.ie10 || o.ie11) {
            var y = "";
            if (A.opts.axisX) {
                y = "pan-y"
            } else {
                y = "none"
            }
            A.$el.css({
                "-ms-touch-action": y,
                "touch-action": y
            });
            A.$el.on("click", function () {
                return A.allowSlideClick
            })
        }
        e(A);
        A.$el.on(c.touchStart, function (E) {
            g(E);
            q(E, A)
        });
        A.$el.on(c.touchMove, function (E) {
            g(E);
            n(E, A)
        });
        A.$el.on(c.touchEnd, function () {
            u(A)
        });
        A.opts.ul.on("webkitTransitionEnd MSTransitionEnd transitionend", function () {
            e(A)
        });
        h(f).on("onorientationchange" in f ? "orientationchange" : "resize", function () {
            clearTimeout(A.timer);
            A.timer = setTimeout(z, 150)
        });

        function z() {
            var F = A.opts.ul.children();
            A._slideDistance = A.opts.axisX ? A.opts.li.width() : A.opts.li.height();
            p(A, A.opts.ul, 0);
            k(A, A.opts.ul, -A._slideDistance * A._index);
            p(A, F, 0);
            var E = A.opts.continuousScroll ? -1 : 0;
            F.each(function (G) {
                k(A, h(this), A._slideDistance * (G + E))
            })
        }
    };

    function p(v, w, x) {
        w.css({
            "-webkit-transition": "all " + x + "s " + v.opts.transitionType,
            transition: "all " + x + "s " + v.opts.transitionType
        })
    }
    function k(v, w, x) {
        var y = v.opts.axisX ? x + "px,0,0" : "0," + x + "px,0";
        w.css({
            "-webkit-transform": "translate3d(" + y + ")",
            transform: "translate3d(" + y + ")"
        })
    }
    function i(w, v) {
        var x = w.opts.ul.children();
        var y = x.eq(v).find("[data-src]");
        if (y) {
            y.each(function (A) {
                var C = h(this);
                var z = C.attr("data-src");
                var D = C.attr("data-src2x");
                var B = C.attr("data-src3x");
                if (j) {
                    if (B && D) {
                        C.attr("srcset", t.replaceWebP(D) + " 2x," + t.replaceWebP(B) + " 3x").attr("src", t.replaceWebP(D))
                    } else {
                        if (B) {
                            C.attr("srcset", t.replaceWebP(z) + " 2x," + t.replaceWebP(B) + " 3x").attr("src", t.replaceWebP(z))
                        } else {
                            if (D) {
                                C.attr("src", t.replaceWebP(D))
                            } else {
                                C.attr("src", t.replaceWebP(z))
                            }
                        }
                    }
                } else {
                    if (a > 2 && D) {
                        C.attr("src", t.replaceWebP(D))
                    } else {
                        C.attr("src", t.replaceWebP(z))
                    }
                }
            })
        }
    }
    function g(v) {
        if (s.touch && !v.touches) {
            v.touches = v.originalEvent.touches
        }
    }
    function q(w, v) {
        v.isScrolling = undefined;
        v._moveDistance = v._moveDistanceIE = 0;
        v._startX = s.touch ? w.touches[0].pageX : (w.pageX || w.clientX);
        v._startY = s.touch ? w.touches[0].pageY : (w.pageY || w.clientY)
    }
    function n(w, v) {
        if (v.opts.autoSwipe) {
            m(v)
        }
        v.allowSlideClick = false;
        v._curX = s.touch ? w.touches[0].pageX : (w.pageX || w.clientX);
        v._curY = s.touch ? w.touches[0].pageY : (w.pageY || w.clientY);
        v._moveX = v._curX - v._startX;
        v._moveY = v._curY - v._startY;
        if (typeof v.isScrolling == "undefined") {
            if (v.opts.axisX) {
                v.isScrolling = !! (Math.abs(v._moveX) >= Math.abs(v._moveY))
            } else {
                v.isScrolling = !! (Math.abs(v._moveY) >= Math.abs(v._moveX))
            }
        }
        if (v.isScrolling) {
            if (w.preventDefault) {
                w.preventDefault()
            } else {
                w.returnValue = false
            }
            p(v, v.opts.ul, 0);
            v._moveDistance = v._moveDistanceIE = v.opts.axisX ? v._moveX : v._moveY
        }
        if (!v.opts.continuousScroll) {
            if (v._index == 0 && v._moveDistance > 0 || (v._index + 1) >= v._liLength && v._moveDistance < 0) {
                v._moveDistance = 0
            }
        }
        k(v, v.opts.ul, -(v._slideDistance * v._index - v._moveDistance))
    }
    function u(v) {
        if (!v.isScrolling) {
            e(v)
        }
        if (o.ie10 || o.ie11) {
            if (Math.abs(v._moveDistanceIE) < 5) {
                v.allowSlideClick = true
            }
            setTimeout(function () {
                v.allowSlideClick = true
            }, 100)
        }
        if (Math.abs(v._moveDistance) <= v._distance) {
            d(v, "", ".3")
        } else {
            if (v._moveDistance > v._distance) {
                d(v, "prev", ".3")
            } else {
                if (Math.abs(v._moveDistance) > v._distance) {
                    d(v, "next", ".3")
                }
            }
        }
        v._moveDistance = v._moveDistanceIE = 0
    }
    function e(v) {
        if (v.opts.autoSwipe) {
            m(v);
            v.autoSlide = setInterval(function () {
                d(v, "next", ".3")
            }, v.opts.speed)
        }
    }
    function m(v) {
        clearInterval(v.autoSlide)
    }
    r.prototype.goTo = function (v) {
        var w = this;
        d(w, v, ".3")
    };

    function d(w, v, x) {
        if (typeof v === "number") {
            w._index = v;
            if (w.opts.lazyLoad) {
                if (w.opts.continuousScroll) {
                    i(w, w._index);
                    i(w, w._index + 1);
                    i(w, w._index + 2)
                } else {
                    i(w, w._index - 1);
                    i(w, w._index);
                    i(w, w._index + 1)
                }
            }
        } else {
            if (v == "next") {
                w._index++;
                if (w.opts.lazyLoad) {
                    if (w.opts.continuousScroll) {
                        i(w, w._index + 2);
                        if (w._index + 1 == w._liLength) {
                            i(w, 1)
                        } else {
                            if (w._index == w._liLength) {
                                i(w, 0)
                            }
                        }
                    } else {
                        i(w, w._index + 1)
                    }
                }
            } else {
                if (v == "prev") {
                    w._index--;
                    if (w.opts.lazyLoad) {
                        if (w.opts.continuousScroll) {
                            i(w, w._index);
                            if (w._index == 0) {
                                i(w, w._liLength)
                            } else {
                                if (w._index < 0) {
                                    i(w, w._liLength - 1)
                                }
                            }
                        } else {
                            i(w, w._index - 1)
                        }
                    }
                }
            }
        }
        if (w.opts.continuousScroll) {
            if (w._index >= w._liLength) {
                l(w, x);
                w._index = 0;
                setTimeout(function () {
                    l(w, 0);
                    w.opts.callback(w._index, w._liLength);
                    return
                }, 300)
            } else {
                if (w._index < 0) {
                    l(w, x);
                    w._index = w._liLength - 1;
                    setTimeout(function () {
                        l(w, 0);
                        w.opts.callback(w._index, w._liLength);
                        return
                    }, 300)
                } else {
                    l(w, x)
                }
            }
        } else {
            if (w._index >= w._liLength) {
                w._index = 0
            } else {
                if (w._index < 0) {
                    w._index = w._liLength - 1
                }
            }
            l(w, x)
        }
        w.opts.callback(w._index, w._liLength)
    }
    function l(w, v) {
        p(w, w.opts.ul, v);
        k(w, w.opts.ul, -w._index * w._slideDistance)
    }
})(window, window.Zepto || window.jQuery);
define("index", ["common_fastclick", "common_lazyload"], function (j, h) {
    j.attach(document.body);
    var g = {};
    var i = document;
    $(".information .icon_del").on("click", function () {
        $(this).parents(".information").hide()
    });
    var k = function () {
        if ($("#indexBanner").data("inited") == 1) {
            return
        }
        $("#indexBanner").data("inited", 1);
        $("#indexBanner").swipeSlide({
            speed: 4000,
            continuousScroll: true,
            lazyLoad: true,
            callback: function (a) {
                $(".public_com-swipeSlide .dot").children().eq(a).addClass("cur").siblings().removeClass("cur")
            }
        })
    };
    var l = $(".touchweb-com_header.index");
    $(window).on("scroll", function () {
        var a = $(this).scrollTop();
        if (a > 0) {
            l.addClass("fixed")
        } else {
            l.removeClass("fixed")
        }
    });
    g.init = function (b) {
        this.config = b || {};
        var c = $("#ajaxReplaceAdvCodesData");
        if (c.size() == 0) {
            k()
        } else {
            var a = setInterval(function () {
                var d = false;
                if (c.data("done") == 1) {
                    d = true
                }
                if (d) {
                    k();
                    clearInterval(a)
                }
            }, 100);
            setTimeout(function () {
                k();
                clearInterval(a)
            }, 5000)
        }
    };
    return g
});
(function () {
    var i = {};
    var h = {};
    var g = function (d, a) {
        if (!i[d]) {
            i[d] = []
        }
        var e = function () {
            if (typeof a === "function") {
                a()
            }
        };
        i[d].push(e);
        if (!h[d]) {
            h[d] = 1
        } else {
            if (h[d] == 2) {
                j(d, i);
                return
            } else {
                if (h[d] == 1) {
                    return
                }
            }
        }
        var c = document.getElementsByTagName("head")[0],
            b = document.createElement("script");
        b.setAttribute("type", "text/javascript");
        b.setAttribute("src", d + "?" + new Date().getTime());
        c.appendChild(b);
        if (document.all) {
                b.onreadystatechange = function () {
                    if (b.readyState == "loaded" || b.readyState == "complete") {
                        h[d] = 2;
                        j(d, i)
                    }
                }
            } else {
                b.onload = function () {
                    h[d] = 2;
                    j(d, i)
                }
            }
    };

    function j(c, a) {
        if (!c || !a) {
            return
        }
        var d = a[c];
        if (d && f(d)) {
            for (var b = 0; b < d.length; b++) {
                d[b]()
            }
        } else {
            if (d && typeof(d) === "function") {
                d()
            }
        }
        a[c] = null
    }
    function f(a) {
        return toString.apply(a) === "[object Array]"
    }
    if (Zepto) {
        $.getScript = g
    }
})();
define("homePageTimer", function () {
    var g = {};
    var j = null;
    g.countDown = function (e) {
        var c = $(e);
        if (!c || c.length == 0) {
            return
        }
        var d = c.attr("data-endDate");
        if (typeof d == "undefined") {
            return
        }
        var b = 0;
        var a = function () {
            if (b) {
                return
            }
            b = 1;
            if (j) {
                k(c, j)
            } else {
                var f = new Date();
                var v = f.getFullYear();
                var u = f.getMonth() + 1;
                var s = f.getDate();
                var w = f.getHours();
                var t = f.getMinutes();
                var x = f.getSeconds();
                j = v + "-" + u + "-" + s + "-" + w + "-" + t + "-" + x;
                k(c, j)
            }
        };
        i(a)
    };

    function k(f, e) {
        var a = f.attr("data-flag");
        if (a && a == 1) {
            return
        }
        f.attr("data-flag", 1);
        var b = f.attr("data-endDate");
        if (typeof b == "undefined") {
            return
        }
        var d = b.split("-");
        var s = new Date(d[0], d[1] - 1, d[2], d[3], d[4], d[5]);
        var r = (s - h(e)) / 1000;
        var c = f.find(".hour");
        var t = f.find(".min");
        var q = f.find(".second");
        f.show();
        l(r, c, t, q, f)
    }
    function i(a) {
        var b = setTimeout(a, 500);
        var c = "//www.yhd.com/time/dynamictime";
        $.getScript(c, function () {
            j = nowTime;
            a()
        })
    }
    function h(a) {
        var b = new Date();
        if (typeof(a) != "undefined" && a != null) {
            var c = a.split("-");
            b = new Date(c[0], c[1] - 1, c[2], c[3], c[4], c[5])
        }
        return b
    }
    function l(e, b, r, p, c) {
        var f = 0,
            d = 0,
            a = 0;
        var q = {};
        q[c.selector] = setInterval(function () {
                e--;
                if (e < 0) {
                    clearInterval(q[c.selector]);
                    return
                }
                f = ~~ (e / 3600);
                d = ~~ (e / 60 % 60);
                a = ~~ (e % 60);
                b.html(f < 10 ? "0" + f : f);
                r.html(d < 10 ? "0" + d : d);
                p.html(a < 10 ? "0" + a : a)
            }, 1000)
    }
    return g
});
define("chopHandPrice", ["common_mcookie", "lib_template_ejs", "common_lazyload"], function (p, l, r) {
    var o = {};
    var k = [];
    var m = [];
    var j = [];

    function q(b) {
        for (var d = 0; d < b.length; d++) {
            var c = b[d].promotionPrice.toString().split(".");
            var a = "<strong>" + c[0] + "</strong>";
            if (c.length > 1) {
                a = "<strong>" + c[0] + "</strong>." + c[1]
            }
            b[d].price = a;
            if (b[d].opType == 3) {
                b[d].productDetailUrl = "//item.m.yhd.com/item/lp/" + b[d].promotionId + "_" + b[d].pmId
            } else {
                b[d].productDetailUrl = "//item.m.yhd.com/item/" + b[d].pmId
            }
            if (b[d].promotionId) {
                m.push(b[d].pmId);
                j.push(b[d].promotionId)
            } else {
                k.push(b[d].pmId)
            }
        }
        return b
    }
    var n = function (d) {
        var u = websiteurl + "/mobile/template/homepage/chopHandPrice.ejs";
        if (d && d.prodcutVOList && d.prodcutVOList.length > 0) {
            d.prodcutVOList = q(d.prodcutVOList)
        }
        var g = new Date(d.activityRemainTime);
        var a = g.getFullYear();
        var b = g.getMonth() + 1;
        var v = g.getDate();
        var e = g.getHours();
        var f = g.getMinutes();
        var h = g.getSeconds();
        d.activityRemainTime = a + "-" + b + "-" + v + "-" + e + "-" + f + "-" + h;
        var c = {
            data: d
        };
        var i = new l({
            url: u
        }).render(c);
        $("#chopHandPrice").html(i);
        require(["homePageTimer"], function (s) {
            s.countDown("#lowPriceRemainTime")
        });
        r.trigger();
        r.scrollObj($("#chopHandList"))
    };
    o.init = function () {
        if (typeof(chopHandPriceUrl) == "undefined" || !chopHandPriceUrl) {
            return
        }
        $.ajax({
            type: "GET",
            url: chopHandPriceUrl,
            dataType: "json",
            success: function (a) {
                if (a && a.activityRemainTime > 0 && a.prodcutVOList && a.prodcutVOList.length > 0) {
                    n(a);
                    require(["biz_yhd_productInfo"], function (b) {
                        var d = $("#chopHandPrice");
                        if (k && k.length > 0) {
                            var c = {
                                ids: k
                            };
                            b.getProductInfo(c, function (f) {
                                for (var e = 0; e < f.length; e++) {
                                    d.find("[data-pmId=" + f[e].pmId + "]").html("￥" + f[e].price)
                                }
                            })
                        }
                        if (j && j.length > 0) {
                            b.getProductInfo({
                                productType: "promotion",
                                promotionIds: j,
                                pmIds: m,
                                ids: m
                            }, function (f) {
                                for (var e = 0; e < f.length; e++) {
                                    d.find("[data-pmId='" + f[e].pmId + "']").html("￥" + f[e].promPrice)
                                }
                            })
                        }
                    })
                }
            }
        })
    };
    return o
});
define("homePageBS", ["global_env"], function (e) {
    var f = e.getProvinceId() || 1;
    var d = {};
    d.URLPrefix_busystock = "//gps.yhd.com";
    d.channelId_102 = 102;
    d.channelId_1 = 1;
    d.flushProduct = function (i, a, j) {
        if (typeof j == "undefined" || j == null) {
            j = 1
        }
        if (i == null || i.length < 1) {
            return
        }
        var b = [];
        i.each(function () {
            var g = $(this);
            g.removeAttr("data-needReflushType");
            if (g.attr("data-pmId")) {
                b.push(g.attr("data-pmId"))
            }
        });
        if (b.length < 1) {
            return
        }
        var c = d.getPtProcutUrl(b);
        $.getJSON(c, function (g) {
            if (!g || g.length == 0) {
                return true
            }
            i.each(function (s, h) {
                var q = $(h);
                var t = q.attr("data-pmId");
                if (!t) {
                    return true
                }
                var v = false;
                for (var r = 0; r < g.length; r++) {
                    var u = g[r];
                    if (u == null || u.pmId == null || u.pmId == -1) {
                        continue
                    }
                    if (t != u.pmId) {
                        continue
                    }
                    if (7 == j) {
                        if (u.ruleType == 5 || (u.ruleType == 2 && u.mutexPromotion == 1)) {
                            q.remove();
                            continue
                        }
                    }
                    d.updatePrice(q, u);
                    v = true;
                    break
                }
                if (!v) {
                    q.remove()
                }
            });
            if (a) {
                a(g)
            }
        })
    };
    d.updatePrice = function (a, b) {
        if (!a || !b) {
            return
        }
        $(".current_price", a).html("￥" + b.price);
        $(".market_price", a).html("￥" + b.marketPrice)
    };
    d.busyStockSpi = function (b, a) {
        d.flushProduct(b, a, 1)
    };
    d.pm_busyStockSpi = function (b, a) {
        d.flushProduct(b, a, 7)
    };
    d.lp_busyStockSpi = function (c, a) {
        if (c.length < 1) {
            return
        }
        var h = [];
        var b = [];
        c.each(function () {
            $(this).removeAttr("data-needReflushType");
            var g = $(this).attr("data-langdingId");
            if (g) {
                if (b.indexOf(g) == -1) {
                    b.push(g)
                }
                h.push(this)
            }
        });
        if (b.length < 1) {
            return
        }
        d.cmsBusystockLazyForLandingpage(b, h, a)
    };
    d.cmsBusystockLazyForLandingpage = function (c, b, a) {
        var h = d.getLandpingProcutUrl(c);
        $.getJSON(h, function (g) {
            if (!g || g.length == 0) {
                return true
            }
            $(b).each(function () {
                var q = $(this);
                var t = q.attr("data-pmId");
                var s = q.attr("data-langdingId");
                if (!t || !s) {
                    return true
                }
                var p = false;
                for (var r = 0; r < g.length; r++) {
                    var i = g[r];
                    if (i == null || i.pmId == null || i.pmId == -1 || t != i.pmId || s != i.promId) {
                        continue
                    }
                    if (i.point && i.point > 0 && i.promPrice >= i.yhdPrice) {
                        q.remove();
                        break
                    }
                    d.updatePrice(q, i);
                    p = true;
                    break
                }
                if (!p) {
                    q.remove()
                }
            });
            if (a) {
                a(g)
            }
        })
    };
    d.t_busyStockSpi = function (h, a) {
        if (h.length < 1) {
            return
        }
        var b = [];
        h.each(function () {
            var g = $(this);
            g.removeAttr("data-needReflushType");
            if (g.attr("data-grouponId")) {
                b.push(g.attr("data-grouponId"))
            }
        });
        if (b.length < 1) {
            return
        }
        var c = d.getGrouponBsUrl(b);
        $.getJSON(c, function (g) {
            if (!g || g.code == 0) {
                return true
            }
            h.each(function (u, z) {
                var i = $(z);
                var x = i.attr("data-grouponId");
                if (!x) {
                    return true
                }
                var B = false;
                for (var w = 0; w < g.length; w++) {
                    var t = g[w];
                    if (t == null || x != t.grouponId) {
                        continue
                    }
                    if (t.code == 0) {
                        i.remove()
                    }
                    var y = t.marketPrice;
                    var v = t.currentPrice;
                    var A = (t.siteType == 1) ? y : t.yhdPrice;
                    $(".current_price", i).html(v);
                    $(".market_price", i).html(A);
                    B = true;
                    break
                }
                if (!B) {
                    i.remove()
                }
            });
            if (a) {
                a(g)
            }
        })
    };
    d.getPtProcutUrl = function (c) {
        if (c == null || c == undefined) {
            return ""
        }
        var a = "";
        for (var i = 0; i < c.length; i++) {
            if (c[i] == "") {
                continue
            }
            a += "&pmIds=" + c[i]
        }
        var b = 1;
        var j = d.URLPrefix_busystock + "/restful/promotion?channelId=" + d.channelId_102 + "&provinceId=" + f + a + "&callback=?";
        return j
    };
    d.getLandpingProcutUrl = function (c) {
        if (c == null || c == undefined) {
            return ""
        }
        var a = "";
        for (var i = 0; i < c.length; i++) {
            if (c[i] == "") {
                continue
            }
            a += "&promotionIds=" + c[i]
        }
        var b = 1;
        var j = d.URLPrefix_busystock + "/restful/promotion?channelId=" + d.channelId_1 + "&provinceId=" + f + a + "&callback=?";
        return j
    };
    d.getGrouponBsUrl = function (b) {
        if (b == null || b == undefined) {
            return ""
        }
        var a = "";
        for (var c = 0; c < b.length; c++) {
            if (b[c] == "") {
                continue
            }
            a += "&grouponIds=" + b[c]
        }
        var h = d.URLPrefix_busystock + "/restful/groupon?provinceId=" + f + "&channelId=" + d.channelId_102 + a + "&callback=?";
        return h
    };
    d.manualFlush = function (b, a) {
        var c = $("[data-needReflushType='0']", b);
        var k = [];
        var m = [];
        var n = [];
        var l = [];
        if (c.length > 0) {
            c.each(function () {
                var g = 1;
                var h = $(this).attr("data-langdingId");
                if (h) {
                    g = 2
                }
                if (g) {
                    if (g == 1) {
                        k.push(this)
                    } else {
                        if (g == 2) {
                            m.push(this)
                        } else {
                            if (g == 4) {
                                n.push(this)
                            } else {
                                if (g == 7) {
                                    l.push(this)
                                }
                            }
                        }
                    }
                }
            })
        }
        if (k.length > 0) {
            d.busyStockSpi($(k), a)
        }
        if (m.length > 0) {
            d.lp_busyStockSpi($(m), a)
        }
        if (n.length > 0) {
            d.t_busyStockSpi($(n), a)
        }
        if (l.length > 0) {
            d.pm_busyStockSpi($(l), a)
        }
    };
    return d
});
define("icons", [], function () {
    var h = {};
    var g = $(".touchweb_components-headerMenu");
    var j = $('.icon_box[data-extends="cart"]', g);
    var k = URLPrefix.cart || "//m.yhd.com";
    var l = function () {
        if (j.size() <= 0) {
            return
        }
        if (URLPrefix.cart) {
            $.ajax({
                url: k + "/cart/countCart",
                dataType: "jsonp",
                jsonpCallback: "jsonp" + new Date().getTime(),
                success: function (a) {
                    if (a && a.code == "00000000" && a.data && a.data.resultData && a.data.resultData.num) {
                        var b = a.data.resultData.num;
                        if (b != "0") {
                            $(j).each(function () {
                                $(this).append('<span class="tips">' + b + "</span>")
                            })
                        }
                    }
                }
            })
        } else {
            $.ajax({
                type: "POST",
                url: "//m.yhd.com/mw/carCounts",
                success: function (a) {
                    if (a && a != "0") {
                        $(j).each(function () {
                            $(this).append('<span class="tips">' + a + "</span>")
                        })
                    }
                }
            })
        }
    };
    var i = function () {
        var a = $("span.tips", g);
        $(a).each(function () {
            $(this).html($(this).html().substr(0, 5))
        })
    };
    h.init = function () {
        l();
        i()
    };
    return h
});
define("index_initAjaxAdv", ["common_mcookie"], function (g) {
    var h = {};
    var e = function () {
        var a = $("body a[data-advId]");
        a.each(function () {
            var b = $(this);
            if (b.attr("data-done") != "1" && b.attr("data-ajax") == "1" && b.attr("data-fake") == "1") {
                if (b.parents("#indexBanner").size() > 0) {
                    var c = b.parent("li").index() + 1;
                    $("#indexBanner ul li:nth-child(" + c + ")").remove();
                    $("#indexBanner div span:nth-child(" + c + ")").remove()
                } else {
                    b.remove()
                }
            }
        })
    };
    h.removeAjaxUnReplaceAdvs = e;
    var f = function () {
        var a = $("#ajaxReplaceAdvCodesData");
        if (a.size() == 0) {
            return
        }
        var v = a.val();
        var z = (v && v.length > 0) ? v.split(",") : [];
        var t = (typeof currSiteId == "undefined") ? 1 : currSiteId;
        var d = g.getCookie("provinceId") || 1;
        var s = "";
        var x = function (i, k) {
            var n = null;
            var j = i[k];
            var o = j != null ? j : [];
            for (var l = 0; l < o.length; l++) {
                var m = o[l];
                if (m && m.commonScreenImgUrl) {
                    n = m;
                    break
                }
            }
            return n
        };
        var w = function (i, k) {
            if (i.attr("data-done") == "1") {
                return
            }
            var l = k.tc;
            var j = k.tc_ext;
            if (l) {
                i.attr("data-tc", l + ".1");
                if (j) {
                    i.attr("data-tce", j)
                }
            }
            i.attr("href", (k.landingPage && k.landingPage.replace("http:", ""))).attr("title", k.text).attr("data-done", "1").attr("data-ref", k.ref)
        };
        var c = function (l, m, i) {
            var j = m || 60;
            var n = i || 60;
            var k = /_\d+x\d+\.([a-zA-Z]+)$/;
            if (l) {
                if (k.test(l)) {
                    l = l.replace(k, "_" + j + "x" + n + ".$1")
                } else {
                    l = l.substring(0, l.lastIndexOf(".")) + "_" + j + "x" + n + l.substring(l.lastIndexOf("."))
                }
            } else {
                l = "//image.yihaodianimg.com/front-homepage/global/images/defaultproduct_" + j + "x" + n + ".jpg"
            }
            return l
        };
        var u = function (j, m) {
            if (j.attr("data-done") == "1") {
                return
            }
            var p = m.commonScreenImgUrl;
            var k = !isNaN(j.attr("data-width")) ? parseInt(j.attr("data-width")) : 0;
            var n = !isNaN(j.attr("data-height")) ? parseInt(j.attr("data-height")) : 0;
            var o = p && p.replace("http:", "");
            var l = p && p.replace("http:", "");
            var i = p && p.replace("http:", "");
            if (k != 0 && n != 0) {
                o = c(p, Math.floor(k / 3), Math.floor(n / 3));
                l = c(p, Math.floor(k / 1.5), Math.floor(n / 1.5))
            }
            j.attr("alt", m.text).attr("src", o).attr("data-done", "1");
            if (j.attr("data-src") != null) {
                j.attr("data-src", o)
            }
            if (j.attr("data-src2x") != null) {
                j.attr("data-src2x", l)
            }
            if (j.attr("data-src3x") != null) {
                j.attr("data-src3x", i)
            }
            if (j.attr("original") != null) {
                j.attr("original", o)
            }
            if (j.attr("original2x") != null) {
                j.attr("original2x", l)
            }
            if (j.attr("original3x") != null) {
                j.attr("original3x", i)
            }
        };
        var b = function () {
            if (a.size() == 0) {
                return
            }
            var l = a.advsData;
            var k = a.doneAdvCodes != null ? a.doneAdvCodes.split(",") : [];
            if (l != null) {
                for (var o = 0; o < z.length; o++) {
                    var i = x(l, z[o]);
                    var n = false;
                    for (var p = 0; p < k.length; p++) {
                        if (k[p] == z[o]) {
                            n = true;
                            break
                        }
                    }
                    if (!n && i != null) {
                        var j = $("body a[data-advId='" + i.regionId + "']");
                        var m = $("body img[data-advId='" + i.regionId + "']");
                        if (j.size() > 0) {
                            for (var q = 0; q < j.size(); q++) {
                                w(j.eq(q), i);
                                u(m.eq(q), i)
                            }
                            k.push(z[o]);
                            a.doneAdvCodes = k.join(",")
                        }
                    }
                }
            }
        };
        h.runAjaxReplaceAdvs = b;
        var r = function (j, k, m) {
            var l = "//p4p.yhd.com/advdolphin/external/saleTypeWeightAd?callback=?";
            var i = {
                mcSiteId: t,
                provinceId: d,
                codes: j,
                categoryIds: k,
                screenType: "1"
            };
            $.getJSON(l, i, function (o) {
                if (o && o.status == 1) {
                    var n = o.value;
                    if (n) {
                        var p = a.advsData;
                        if (p == null) {
                            a.advsData = n
                        } else {
                            p = $.extend(p, n);
                            a.advsData = p
                        }
                        b()
                    }
                }
                if (m) {
                    e();
                    a.data("done", 1)
                }
            })
        };
        var y = function () {
            var j = [];
            for (var i = 0; i < z.length; i++) {
                j.push(z[i]);
                if (j.length >= 20) {
                    r(j.join(","), s, i == z.length - 1);
                    j = []
                }
            }
            if (j.length > 0) {
                r(j.join(","), s, 1)
            }
        };
        y()
    };
    h.init = function () {
        f();
        setTimeout(function () {
            e();
            var a = $("#ajaxReplaceAdvCodesData");
            if (a.size() > 0) {
                a.data("done", 1)
            }
        }, 5000)
    };
    return h
});
require.config({
    urlArgs: currVersion,
    waitSeconds: 0
});
require(["index_initAjaxAdv"], function (b) {
    b.init()
});
require(["indexRedRain"], function (b) {
    b.init()
});
require(["biz_popupAppDownload"], function (b) {
    b.init("//m.yhd.com")
});
require(["trackerAd"], function (b) {
    b.intTrackerAd()
});
require(["biz_newUserPopup"], function (b) {
    b.init()
});
(function () {
    require(["common_lazyload"], function (b) {
        b.init({
            srcStore: "original",
            srcStore2x: "original2x",
            srcStore3x: "original3x",
            cla: "lazyload",
            horizontal: true
        })
    })
})();
(function () {
    $("body").on("click", "a", function () {
        var c = $(this);
        var d = c.data("ref");
        if ($.trim(d) != "") {
            addTrackPositionToCookie("1", d)
        }
    })
})();
require(["index"], function (b) {
    b.init()
});
require(["icons"], function (b) {
    b.init()
});
require(["chopHandPrice"], function (b) {
    b.init()
});
require(["recommendData"], function (b) {
    b.init()
});
require(["homePageTimer"], function (b) {
    b.countDown("#groupon_time_left");
    b.countDown("#flashsale_time_left")
});

function getQueryString(e) {
    var d = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i");
    var f = window.location.search.substr(1).match(d);
    if (f != null) {
        return unescape(f[2])
    }
    return null
}
function isFromBaidu() {
    var c = getQueryString("tracker_u");
    var d = document.referrer;
    if ((c && c == "10687488789") || (d && d.indexOf("m.baidu.com") >= 0)) {
        return true
    } else {
        return false
    }
}
if (isFromBaidu()) {
    var tag = document.getElementsByTagName("head")[0];
    var js = document.createElement("script");
    js.setAttribute("type", "text/javascript");
    js.setAttribute("name", "baidu-tc-cerfication");
    js.setAttribute("src", "//apps.bdimg.com/cloudaapi/lightapp.js#878834e15195ec8c41a6faf69052cb02");
    tag.appendChild(js);
    if (document.all) {
        js.onreadystatechange = function () {
            if (js.readyState == "loaded" || js.readyState == "complete") {
                window.bd && bd._qdc && bd._qdc.init({
                    app_id: "29c59d3e7ad714333fd3e610"
                })
            }
        }
    } else {
        js.onload = function () {
            window.bd && bd._qdc && bd._qdc.init({
                app_id: "29c59d3e7ad714333fd3e610"
            })
        }
    }
};
define("recommendData", ["common_mcookie", "global_env", "common_lazyload"], function (v, q, x) {
    var t = {};
    var p = q.getProvinceId() || 1;

    function m(a) {
        var b = $(a);
        $("#_RECOMMENDCHEAP").replaceWith(b.find("#__RECOMMENDCHEAP").html());
        $("#_RECOMMENDDXXL").replaceWith(b.find("#__RECOMMENDDXXL").html());
        $("#_RECOMMENDGROUPON").replaceWith(b.find("#__RECOMMENDGROUPON").html());
        x.trigger();
        x.scrollObj($(".precision_scroll"))
    }
    function r(a) {
        var b = $(a);
        $("#_YOULIKE").replaceWith(b.html());
        x.trigger()
    }
    function s(f, d) {
        var a = /_\d{1,}x\d{1,}\./;
        var b = f;
        if (!a.test(b)) {
            var e = f.split(".");
            var c = e.pop();
            b = e.join(".") + d + "." + c
        }
        return b
    }
    function u(e) {
        var a = "";
        var b = e.adList;
        var g = [];
        for (var d = 0; d < b.length; d++) {
            var c = b[d].originalImgUrl;
            var h = "_112x112";
            c = s(c, h);
            c = (c && c.replace("http:", ""));
            g.push(b[d].pmInfoId);
            var f = b[d].ref.replace("ad.", "");
            a += '<a href="' + (b[d].landingPage && b[d].landingPage.replace("http:", "")) + '" class="item lazyload" data-tc="' + (b[d].tc || "") + '" data-tce="' + b[d].tc_ext + '" data-recordTracker="1">';
            a += '<div class="pic">';
            a += '<img data-lazyload="1" src="//image.yihaodianimg.com/front-homepage/global/images/blank.gif"  alt="" original="' + c + '"  alt="' + b[d].imgAdTips + '" >';
            a += "</div>";
            a += "<h3>" + b[d].productName + "</h3>";
            a += '<div class="price_box">';
            a += '<span id="' + b[d].pmInfoId + '">￥' + b[d].currentPrice + "</span>";
            a += "</div>";
            a += "</a>"
        }
        var i = $("#hotRecommendation");
        i.html(a);
        $(".hot_recommendation").show();
        require(["tracker_adContentTracker"], function (j) {
            j.run()
        });
        if (typeof(invokePrice) != "undefined" && invokePrice) {
            require(["biz_yhd_productInfo"], function (j) {
                var k = {
                    ids: g
                };
                j.getProductInfo(k, function (l) {
                    for (var z = 0; z < l.length;
                    z++) {
                        $("#" + l[z].pmId).html("￥" + l[z].price)
                    }
                })
            })
        }
        x.scrollObj($(".precision_scroll"));
        x.trigger()
    }
    function o() {
        var a = "//p4p.yhd.com/advdolphin/external/multiCatesBiddingAd?mcSiteId=102&adspaceCode=MOBIHOME_JXTJ_RMTJ_1DTGG&currentPage=0&toPage=1&screenType=1&isYhd=0&platform=4&pageSize=15&adComposition=%5B%7B%22compoType%22:%22CPC_AD%22,%22compositionType%22:%22cpc%22,%22reqSrc%22:%22search%22%7D%5D";
        var b = {
            provinceId: p,
            moreCategorys: categoryIds
        };
        $.ajax({
            url: a,
            dataType: "jsonp",
            data: b,
            jsonpCallback: "jsonp" + new Date().getTime(),
            success: function (c) {
                if (c && c.response && c.response.adList && c.response.adList.length > 0) {
                    u(c.response)
                }
            }
        })
    }
    function w() {
        $.ajax({
            type: "get",
            url: websiteurl + "/mobile/homePage/getRecommendation.do",
            dataType: "text",
            success: function (a) {
                if (a && a.length > 0) {
                    m(a)
                }
            }
        })
    }
    function n() {
        $.ajax({
            type: "get",
            url: websiteurl + "/mobile/homePage/getYouLike.do",
            dataType: "text",
            success: function (a) {
                if (a && a.length > 0) {
                    r(a)
                }
            }
        })
    }
    t.init = function () {
        w();
        n();
        if (typeof(categoryIds) != "undefined" && categoryIds) {
            o()
        }
    };
    t.initYouLike = n;
    t.initRecommendation = w;
    t.initRecommend = o;
    return t
});
(function () {
    var g = '<div class="touchweb_com-indexPop pop_add-cart" id="mCart_confirm_popup" ><div class="inner"><div class="content"><p>添加成功！<br/>商品已成功加入购物车</p></div><div id="mcart_confirm_popup_btns" class="btn_box"><a href="javascript:void(0);" class="btn btn_cancel">再逛逛</a><a href="' + (URLPrefix.index || "//m.yhd.com") + '/mw/cart" class="btn btn_confirm">去购物车</a></div></div></div>';

    function e() {
        require(["common_cart"], function (b) {
            b.refreshCart()
        });
        var a = $("#mCart_confirm_popup");
        if (a.length < 1) {
            $("body").append(g)
        }
        $("#mCart_confirm_popup .content").html("<p>添加成功！<br/>商品已成功加入购物车</p>");
        $("#mCart_confirm_popup").addClass("show")
    }
    function h(b) {
        var a = $("#mCart_confirm_popup");
        if (a.length < 1) {
            $("body").append(g)
        }
        if (typeof(b) != "undefined" && b) {
            $("#mCart_confirm_popup .content").html("<p>" + b + "</p>")
        } else {
            $("#mCart_confirm_popup .content").html("系统繁忙!")
        }
        $("#mCart_confirm_popup").addClass("show")
    }
    $("body").on("click", "#mCart_confirm_popup .btn_cancel", function (a) {
        $("#mCart_confirm_popup").removeClass("show")
    });
    $("body").on("click", "#mCart_confirm_popup .btn_confirm", function (a) {
        $("#mCart_confirm_popup").removeClass("show")
    });

    function f(q, v, a, c, d, u, t) {
        var b = {
            pmId: q,
            productId: v,
            promotionId: a,
            merchantId: c,
            needpoint: d,
            productType: u,
            num: 1
        };
        if ($.trim(a) != "" && a != "null" && a != "0") {
            b.opType = "3";
            var w = {};
            w[q] = 1;
            b.pmIdStr = w
        }
        try {
            if (t) {
                b.dom = t;
                b.tag = t.tagName;
                require(["tracker_ref_yhd.global_spm"], function (i) {
                    var j = i.getData(t, t.tagName);
                    j.positionTypeId = "4";
                    gotracker(q, "add_cart", v, j)
                })
            }
        } catch (r) {}
        var s = {
            addToCartSuccess: e,
            addToCartError: h
        };
        require(["common_cart"], function (i) {
            i.addToCart(b, s)
        })
    }
    $("#blocks").on("click", "a.icon_add_cart", function () {
        if ($(this).attr("data-canBuy") === "false") {
            return
        }
        var a = $(this).data("addproduct");
        var b = a.split(",");
        f(b[0], b[1], b[2], b[3], b[4], b[5], this)
    })
})();
define("trackerAd", function () {
    var d = {};
    d.intTrackerAd = function () {
        if (typeof(trackerAdJson) == "undefined" || !trackerAdJson.from_trackers) {
            return
        }
        var a = getQueryStringRegExp("tracker_u") || $.fn.cookie("unionKey");
        if (!a || trackerAdJson.from_trackers.indexOf(a) < 0) {
            return
        }
        var b = $(".floor_column_1");
        if (b && b.length > 0) {
            var h = b.eq(0);
            h.find("a").attr("href", trackerAdJson.trackerUrl).attr("data-tc", "indexH5.0.top.1.1");
            h.find("img").attr("src", trackerAdJson.trackerImg).removeAttr("srcset").removeAttr("data-lazyload").removeAttr("original").removeAttr("original2x").removeAttr("original3x")
        } else {
            var g = c(trackerAdJson.trackerImg, trackerAdJson.trackerUrl);
            $("#iconNav").after(g)
        }
    };

    function c(b, a) {
        return '<div class="floor_column_1" data-tpa="H5_MOBIHOME_PROMO6_IMAGEA1"><a class="big_topbanner" target="_blank" href="' + a + '" data-tc="index.0.top.1.1"><img alt="" src="' + b + '"></a></div>'
    }
    return d
});
define("indexRedRain", function () {
    var l = {};
    var g = 0;
    var k = 0;
    var j = $("#red_rain_next_div > span");
    var i = function () {
        var b = function () {
            var e = parseInt(g / (60 * 60)) + "";
            var c = parseInt((g % (60 * 60)) / 60) + "";
            var d = (g % (60 * 60)) % 60 + "";
            j.eq(0).text((e.length == 1 ? "0" : "") + e);
            j.eq(2).text((c.length == 1 ? "0" : "") + c);
            j.eq(4).text((d.length == 1 ? "0" : "") + d)
        };
        b();
        var a = setInterval(function () {
            if (g > 0) {
                g--;
                b()
            } else {
                g = 0;
                clearInterval(a);
                h()
            }
        }, 1000)
    };
    var h = function () {
        var b = $.fn.cookie("provinceId") || 1;
        var a = $.fn.cookie("cityId") || "";
        $.ajax({
            type: "POST",
            url: "//m.yhd.com/mobile/homePage/listRedRainAd.do?provinceId=" + b + "&cityId=" + a,
            dataType: "json",
            success: function (y) {
                if (y && y.status == 1 && y.data) {
                    try {
                        var v = y.data;
                        var A = v.startTime;
                        var C = v.remainingSeconds2Next;
                        var e = v.remainingMillisecond2End;
                        var B = v.isFirstActivity;
                        var f = v.isEndActivity;
                        var z = "距下一场红包雨还剩";
                        var d = (v.linkUrl && v.linkUrl.replace("http:", ""));
                        var x = v.tc;
                        var D = (v.imageUrl && v.imageUrl.replace("http:", ""));
                        if (d && D) {
                            if (B == "1") {
                                z = "距今日第一场红包雨还剩"
                            }
                            if (C) {
                                g = parseInt(C);
                                i();
                                $("#red_rain_next_div > label").text(z);
                                $("#red_rain_activity_div").hide();
                                if (f) {
                                    $("#red_rain_next_div").hide()
                                } else {
                                    $("#red_rain_next_div").show()
                                }
                                $("#red_rain_whole_div").show()
                            }
                            if (e) {
                                var w = (A && A.length >= 5) ? A.substring(0, 5) : A;
                                $("#red_rain_activity_time").text(w);
                                $("#red_rain_activity_div").show();
                                $("#red_rain_next_div").hide();
                                $("#red_rain_whole_div").show();
                                if (k < 5) {
                                    k++;
                                    setTimeout(function () {
                                        h()
                                    }, e + 1000)
                                }
                            }
                            if (!C && !e) {
                                $("#red_rain_whole_div").hide()
                            } else {
                                $("#red_rain_linkUrl").attr("href", d);
                                if (x) {
                                    $("#red_rain_linkUrl").attr("data-tc", x)
                                }
                                $("#red_rain_img").attr("src", D)
                            }
                        } else {
                            $("#red_rain_whole_div").hide()
                        }
                    } catch (c) {}
                } else {
                    $("#red_rain_whole_div").hide()
                }
            },
            error: function (c) {
                $("#red_rain_whole_div").hide()
            }
        })
    };
    l.init = function () {
        if ($("#red_rain_whole_div").length > 0) {
            h()
        }
    };
    return l
});