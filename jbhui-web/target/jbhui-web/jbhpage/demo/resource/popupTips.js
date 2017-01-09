define("common_popupTips", ["common_mcookie", "global_env", "util_yhd.url", "common_popupWindow"], function (z, t, w, o) {
    var p, u, r;
    var x = {};
    var s = 0;
    var y = URLPrefix.index || "//m.yhd.com";
    x.getGeo = function (b, c, d) {
        p = b;
        u = c;
        r = d;
        var a = t.getProvinceId();
        if (a) {
            if (a < 1 || a > 32) {
                t.setProvinceId("")
            } else {
                return
            }
        }
        if (navigator.geolocation) {
            var e = navigator.geolocation.getCurrentPosition(B, A, {
                timeout: 2000
            })
        } else {
            q()
        }
    };

    function q() {
        $.ajax({
            url: y + "/mobile/homePage/ajaxGetProvinceIdByIPV2.do",
            dataType: "jsonp",
            jsonpCallback: "jsonp" + new Date().getTime(),
            success: function (c) {
                if (c) {
                    var a = c.provinceId;
                    if (t.isValidProvinceId(a)) {
                        var b = w.getParams(window.location.href);
                        if (b != null && b.fixedproid) {
                            t.setProvinceId(a);
                            return
                        }
                        var d = location.href;
                        d = w.appendParams(d, {
                            fixedproid: a
                        });
                        var e = x.proviceObj["p_" + a];
                        o.getLocationPopup(r, {
                            title: "获取定位",
                            closeBtn: true,
                            content: "1号店要使用您当前的位置:" + e,
                            btnGeneral: {
                                text: "手动选择",
                                url: y + "/province"
                            },
                            btnHighlight: {
                                text: "好",
                                url: d
                            }
                        });
                        $(".btn_highlight").on("click", function () {
                            t.setProvinceId(a)
                        })
                    } else {
                        v();
                        return
                    }
                } else {
                    v();
                    return
                }
            },
            error: function () {
                v()
            }
        })
    }
    function v() {
        var a = w.getParams(window.location.href);
        if (a != null && a.fixedproid) {
            return
        }
        o.getLocationPopup(r, {
            title: "收货省份",
            closeBtn: true,
            content: "请手动选择收货省份",
            btnGeneral: {
                text: "取消",
                url: "javascript:;;"
            },
            btnHighlight: {
                text: "手动选择",
                url: y + "/province"
            }
        });
        $(".btn_general").on("click", function () {
            o.closePopup()
        })
    }
    x.proviceObj = {
        p_1: "上海",
        p_2: "北京",
        p_3: "天津",
        p_4: "河北",
        p_5: "江苏",
        p_6: "浙江",
        p_7: "重庆",
        p_8: "内蒙古",
        p_9: "辽宁",
        p_10: "吉林",
        p_11: "黑龙江",
        p_12: "四川",
        p_13: "安徽",
        p_14: "福建",
        p_15: "江西",
        p_16: "山东",
        p_17: "河南",
        p_18: "湖北",
        p_19: "湖南",
        p_20: "广东",
        p_21: "广西",
        p_22: "海南",
        p_23: "贵州",
        p_24: "云南",
        p_25: "西藏",
        p_26: "陕西",
        p_27: "甘肃",
        p_28: "青海",
        p_29: "新疆",
        p_30: "宁夏",
        p_32: "山西"
    };
    var B = function (c) {
        var a = c.coords.latitude;
        var b = c.coords.longitude;
        $.ajax({
            url: y + "/mobile/homePage/getProvinceidBygeoV2.do?latitude=" + a + "&longitude=" + b,
            dataType: "jsonp",
            jsonpCallback: "jsonp" + new Date().getTime(),
            success: function (d) {
                var e = d.cityName;
                var f = d.proId;
                var g = d.referer;
                g = w.appendParams(g, {
                    fixedproid: f
                });
                if (e != "上海" && f != "1") {
                    t.setProvinceId(f);
                    location.href = g
                } else {
                    t.setProvinceId(f)
                }
            }
        })
    };
    var A = function (a) {
        if (s == 0) {
            q()
        }
        s = 1
    };
    return x
});