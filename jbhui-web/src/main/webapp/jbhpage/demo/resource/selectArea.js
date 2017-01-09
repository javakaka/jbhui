define("common_selectArea", ["common_mcookie", "global_env", "util_yhd.url", "tracker_ref_yhd.global_spm"], function (y, s, u, x) {
    var p = 1,
        r, q;
    var v = {};
    var n = {};
    var t = function (b) {
            var a = document.createElement("link");
            a.rel = "stylesheet";
            a.href = b;
            document.head.appendChild(a)
        };
    var z = function (a, d) {
            t(q.cssUrl);
            var e = d || "上海";
            var c = '<div class="select_receiving_area" data-tpa="H5_HOMEPAGE_PROVINCE"><div class="sra-main"><div class="sra-btn_close"><span class="gicon-clear"></span></div><div class="sra-head">请确认您的收货区域</div><div class="sra-body"><div class="sra-select_wrap" ><div class="sra-title_box"><span class="sra-icon_location gicon-location"></span><span class="sra-text">当前区域：</span><span class="sra-city" select-id="' + p + '">' + e + '</span><span class="sra-icon_arrow gicon-direction"></span></div><div class="sra-select_area" ><div class="sra-nav_title">X</div><div class="sra-ul"><div class="sra-title">热门地区</div><div class="sra-li"><a href="#" data-id="2">北京</a></div><div class="sra-li"><a href="#" data-id="1">上海</a></div><div class="sra-li"><a href="#" data-id="20">广东</a></div><div class="sra-li"><a href="#" data-id="6">浙江</a></div><div class="sra-li"><a href="#" data-id="5">江苏</a></div><div class="sra-title">A</div><div class="sra-li"><a href="#" data-id="13">安徽</a></div><div class="sra-title">B</div><div class="sra-li"><a href="#" data-id="2">北京</a></div><div class="sra-title">C</div><div class="sra-li"><a href="#" data-id="7">重庆</a></div><div class="sra-title">F</div><div class="sra-li"><a href="#" data-id="14">福建</a></div><div class="sra-title">G</div><div class="sra-li"><a href="#" data-id="27">甘肃</a></div><div class="sra-li"><a href="#" data-id="20">广东</a></div><div class="sra-li"><a href="#" data-id="21">广西</a></div><div class="sra-li"><a href="#" data-id="23">贵州</a></div><div class="sra-title">H</div><div class="sra-li"><a href="#" data-id="22">海南</a></div><div class="sra-li"><a href="#" data-id="4">河北</a></div><div class="sra-li"><a href="#" data-id="17">河南</a></div><div class="sra-li"><a href="#" data-id="11">黑龙江</a></div><div class="sra-li"><a href="#" data-id="18">湖北</a></div><div class="sra-li"><a href="#" data-id="19">湖南</a></div><div class="sra-title">J</div><div class="sra-li"><a href="#" data-id="10">吉林</a></div><div class="sra-li"><a href="#" data-id="5">江苏</a></div><div class="sra-li"><a href="#" data-id="15">江西</a></div><div class="sra-title">L</div><div class="sra-li"><a href="#" data-id="9">辽宁</a></div><div class="sra-title">N</div><div class="sra-li"><a href="#" data-id="8">内蒙古</a></div><div class="sra-li"><a href="#" data-id="30">宁夏</a></div><div class="sra-title">Q</div><div class="sra-li"><a href="#" data-id="28">青海</a></div><div class="sra-title">S</div><div class="sra-li"><a href="#" data-id="16">山东</a></div><div class="sra-li"><a href="#" data-id="26">陕西</a></div><div class="sra-li"><a href="#" data-id="32">山西</a></div><div class="sra-li"><a href="#" data-id="1">上海</a></div><div class="sra-li"><a href="#" data-id="12">四川</a></div><div class="sra-title">T</div><div class="sra-li"><a href="#" data-id="3">天津</a></div><div class="sra-title">X</div><div class="sra-li"><a href="#" data-id="29">新疆</a></div><div class="sra-li"><a href="#" data-id="25">西藏</a></div><div class="sra-title">Y</div><div class="sra-li"><a href="#" data-id="24">云南</a></div><div class="sra-title">Z</div><div class="sra-li"><a href="#" data-id="6">浙江</a></div></div><div class="sra-fast_nav"><span class="sra-item">A</span><span class="sra-item">B</span><span class="sra-item">C</span><span class="sra-item">F</span><span class="sra-item">G</span><span class="sra-item">H</span><span class="sra-item">J</span><span class="sra-item">L</span><span class="sra-item">N</span><span class="sra-item">Q</span><span class="sra-item">S</span><span class="sra-item">T</span><span class="sra-item">X</span><span class="sra-item">Y</span><span class="sra-item">Z</span></div></div></div></div><div class="sra-foot"><a href="javascript:;" class="sra-btn btn_confirm">确认</a></div></div></div>';
            $(document.body).append(c);
            n = $(".select_receiving_area");
            var b = n.find("[data-id='" + a + "']");
            $(".sra-select_wrap .sra-city").text(b.html()).attr("select-id", b.attr("data-id"));
            $("html,body").css("overflow", "hidden");
            n.show();
            v.selectArea()
        };
    v.selectArea = function () {
            var e = 0;
            var k = 0;
            var F = [];
            var b = [];
            var m = 0;
            var f = $(".sra-main", n);
            var a = $(".sra-select_wrap", n);
            var d = $(".sra-select_area", n);
            var i = $(".sra-nav_title", n);
            var l = $(".sra-title", n);
            var G = $(".sra-ul", n);
            var H = $(".sra-fast_nav", n);
            var j = $(".sra-item", n);

            function c() {
                F = [];
                l.each(function () {
                    var A = $(this);
                    F.push(Math.floor($(this).position().top))
                });
                setTimeout(function () {
                    b = [];
                    _fast_nav_top = Math.floor(H[0].getBoundingClientRect().top);
                    j.each(function () {
                        b.push(Math.floor($(this).position().top))
                    })
                }, 600)
            }
            G.on("scroll", function () {
                var A = $(this).scrollTop();
                for (var B = 0; B < F.length; B++) {
                    if (A >= F[B]) {
                        k = B + 1
                    }
                }
                i.text(l.eq(k - 1).text())
            });
            H.on("touchstart", function (A) {
                var B = A.targetTouches[0].clientY;
                h(B)
            });
            H.on("touchmove", function (A) {
                A.preventDefault();
                var B = A.targetTouches[0].clientY;
                h(B)
            });

            function h(A) {
                var B = A - _fast_nav_top;
                for (var C = 0; C < b.length; C++) {
                    if (B >= b[C]) {
                        m = C + 1
                    }
                }
                G.scrollTop(F[m])
            }
            var g = $(window).height();
            var E = Math.floor(g * 0.75 - 126);
            a.attr("data-height", E + 44);
            d.css("height", E + "px");
            $(".sra-select_wrap .sra-title_box").on("click", function () {
                var A = $(this);
                var C = A.parents(".sra-select_wrap");
                var B = C.attr("data-height");
                if (!f.hasClass("show")) {
                    f.addClass("show");
                    C.css("height", B + "px");
                    d.show();
                    if (e === 0) {
                        c();
                        e++
                    }
                } else {
                    f.removeClass("show");
                    C.css("height", "44px");
                    setTimeout(function () {
                        d.hide()
                    }, 500)
                }
            });
            $(".sra-select_wrap .sra-ul .sra-li a").on("click", function () {
                var A = $(this);
                A.parents(".sra-main").removeClass("show");
                setTimeout(function () {
                    d.hide()
                }, 500);
                $(".sra-select_wrap").css("height", "44px");
                $(".sra-select_wrap .sra-city").text(A.text());
                $(".sra-select_wrap .sra-city").attr("select-id", A.attr("data-id"));
                return false
            });
            $(".select_receiving_area").on("click", function (A) {
                var B = $(A.target);
                if (B.hasClass("select_receiving_area")) {
                    $(this).hide();
                    $("html,body").css("overflow", "")
                }
                if (!s.getProvinceId()) {
                    p = $(".sra-select_wrap .sra-city").attr("select-id") || 1;
                    s.setProvinceId(p)
                }
            });
            $(".select_receiving_area .sra-btn_close").on("click", function () {
                s.setProvinceId(p);
                var A = document.location.href;
                if (typeof indexFlag != "undefined" && indexFlag == 1) {
                    A = "//m.yhd.com/" + p
                }
                x.refreshPage(A, this, this.tagName);
                n.hide();
                $("html,body").css("overflow", "")
            });
            $(".select_receiving_area .btn_confirm").on("click", function () {
                p = $(".sra-select_wrap .sra-city").attr("select-id") || 1;
                s.setProvinceId(p);
                n.hide();
                $("html,body").css("overflow", "");
                var A = document.location.href;
                if (typeof indexFlag != "undefined" && indexFlag == 1) {
                    A = "//m.yhd.com/" + p
                }
                x.refreshPage(A, this, this.tagName)
            })
        };
    var w = URLPrefix.index || "//m.yhd.com";

    function o() {
            var a = 1;
            $.ajax({
                url: w + "/mobile/homePage/ajaxGetProvinceIdByIPV2.do",
                dataType: "jsonp",
                jsonpCallback: "jsonp" + new Date().getTime(),
                success: function (b) {
                    if (b) {
                        a = b.provinceId;
                        if (s.isValidProvinceId(a)) {
                            p = a;
                            z(a)
                        } else {
                            z(1)
                        }
                    } else {
                        z(a)
                    }
                },
                error: function (b) {
                    z(a)
                }
            })
        }
    v.showProvince = function (b) {
            q = b;
            r = s.getProvinceId();
            var a = $(".select_receiving_area");
            if (a && a.length > 0) {
                a.show();
                return
            }
            p = r;
            z(r, b.pName)
        };
    v.init = function (b) {
            q = b;
            r = s.getProvinceId();
            if (r && s.isValidProvinceId(r)) {
                return
            }
            var a = u.getParams(window.location.href);
            if (a != null && a.fixedproid) {
                s.setProvinceId(provinceId)
            } else {
                o()
            }
        };
    return v
});