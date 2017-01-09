common_globalTimingRely = {
    relyResource: [],
    _getResource: function (c) {
        for (var b = 0; b < this.relyResource.length; b++) {
            var a = this.relyResource[b];
            if (a.key == c) {
                return a
            }
        }
        return null
    },
    addResource: function (d, c, b) {
        var a = this._getResource(d);
        if (!a) {
            var a = {
                key: d,
                status: (c || 0),
                time: (b || -1)
            };
            this.relyResource.push(a)
        }
    },
    getRelyResource: function () {
        return this.relyResource
    },
    setRelyResource: function (b, a) {
        var c = this._getResource(b);
        if (c) {
            c.status = 1;
            c.time = a
        }
    }
};
define("common_mcookie", function (b, a) {
    a.setCookie = function (e, g, d) {
        var f = d || 30;
        var c = new Date();
        c.setTime(c.getTime() + f * 24 * 60 * 60 * 1000);
        document.cookie = e + "=" + g + ";expires=" + c.toGMTString() + ";path=/"
    };
    a.getCookie = function (c) {
        var e, d = new RegExp("(^| )" + c + "=([^;]*)(;|$)");
        if (e = document.cookie.match(d)) {
            return (e[2])
        } else {
            return null
        }
    };
    a.delCookie = function (e) {
        var d = new Date();
        d.setTime(d.getTime() - 1);
        var c = getCookie(e);
        if (c != null) {
            document.cookie = e + "=" + c + ";expires=" + d.toGMTString() + ";path=/"
        }
    }
});
if (require && require.config) {
    var staticPath = window.pathurl || "//image.yihaodianimg.com/front-homepage";
    require.config({
        baseUrl: staticPath,
        paths: {
            common_cart: staticPath + "/mglobal/js/common/cart",
            common_lazyload: staticPath + "/mglobal/js/common/lazyload",
            common_popupTips: staticPath + "/mglobal/js/common/popupTips",
            "common_yhd.storage": staticPath + "/mglobal/js/common/yhd.storage",
            common_slider: staticPath + "/mglobal/js/libs/slider",
            libs_c_slide: staticPath + "/mglobal/js/libs/c_slide",
            common_touch: staticPath + "/mglobal/js/libs/touch",
            common_mcookie: staticPath + "/mglobal/js/common/cookie",
            common_globalTiming: staticPath + "/mglobal/js/common/yhd.globalTiming",
            util_globalLogin: staticPath + "/mglobal/js/util/yhd.globalLogin",
            global_env: staticPath + "/mglobal/js/global/env",
            "tracker_ref_yhd.global_spm": staticPath + "/mglobal/js/tracker/ref/yhd.global_spm",
            "tracker_ref_yhd.uid": staticPath + "/mglobal/js/tracker/ref/yhd.uid",
            tracker_adContentTracker: staticPath + "/mglobal/js/tracker/adContentTracker",
            tracker_areaModuleTracker: staticPath + "/mglobal/js/tracker/areaModuleTracker",
            "tracker_ref_yhd.extTrackerSend": staticPath + "/mglobal/js/tracker/ref/yhd.extTrackerSend",
            common_search: staticPath + "/mglobal/js/common/search_v2",
            biz_yhd_productInfo: staticPath + "/mglobal/js/biz/yhd.productInfo",
            biz_loli_page: staticPath + "/mglobal/js/biz/loli.page",
            biz_appDownloadBottom: staticPath + "/mglobal/js/biz/appDownloadBottom",
            biz_newUserMesssage: staticPath + "/mglobal/js/biz/newUserMesssage",
            common_popupWindow: staticPath + "/mglobal/js/common/popupWindow",
            common_redirect: staticPath + "/mglobal/js/common/redirect",
            native_redirect: staticPath + "/mglobal/js/common/redirectNative",
            common_fastclick: staticPath + "/mglobal/js/libs/fastclick",
            base_observer: staticPath + "/global/js/base/yhd.observer",
            global_provinceSwitch: staticPath + "/mglobal/js/global/provinceSwitch",
            libs_jweixin: staticPath + "/mglobal/js/libs/jweixin-1.0.0",
            libs_jsencrypt: staticPath + "/mglobal/js/libs/jsencrypt",
            common_yhd_webp: staticPath + "/mglobal/js/common/yhd.webp",
            common_back: staticPath + "/mglobal/js/common/yhd.globalBack",
            nearshop_redirectCart: staticPath + "/mglobal/js/nearshop/redirectCart",
            abtestPv_tracker: staticPath + "/mglobal/js/tracker/abtestPvTracker",
            biz_newUserPopup: staticPath + "/mglobal/js/biz/yhd.newUserPopup",
            common_locateAddress: staticPath + "/mglobal/js/common/locationAddress",
            common_selectArea: staticPath + "/mglobal/js/common/selectArea"
        }
    })
}(function () {
    var rsplit = function (string, regex) {
        var result = regex.exec(string),
            retArr = new Array(),
            first_idx, last_idx, first_bit;
        while (result != null) {
                first_idx = result.index;
                last_idx = regex.lastIndex;
                if ((first_idx) != 0) {
                    first_bit = string.substring(0, first_idx);
                    retArr.push(string.substring(0, first_idx));
                    string = string.slice(first_idx)
                }
                retArr.push(result[0]);
                string = string.slice(result[0].length);
                result = regex.exec(string)
            }
        if (!string == "") {
                retArr.push(string)
            }
        return retArr
    },
        chop = function (string) {
            return string.substr(0, string.length - 1)
        },
        extend = function (d, s) {
            for (var n in s) {
                if (s.hasOwnProperty(n)) {
                    d[n] = s[n]
                }
            }
        };
    EJS = function (options) {
            options = typeof options == "string" ? {
                view: options
            } : options;
            this.set_options(options);
            if (options.precompiled) {
                this.template = {};
                this.template.process = options.precompiled;
                EJS.update(this.name, this);
                return
            }
            if (options.element) {
                if (typeof options.element == "string") {
                    var name = options.element;
                    options.element = document.getElementById(options.element);
                    if (options.element == null) {
                        throw name + "does not exist!"
                    }
                }
                if (options.element.value) {
                    this.text = options.element.value
                } else {
                    this.text = options.element.innerHTML
                }
                this.name = options.element.id;
                if (!options.type) {
                    this.type = "["
                }
                this.type = options.type
            } else {
                if (options.url) {
                    options.url = EJS.endExt(options.url, this.extMatch);
                    this.name = this.name ? this.name : options.url;
                    var url = options.url;
                    var template = EJS.get(this.name, this.cache);
                    if (template) {
                        return template
                    }
                    if (template == EJS.INVALID_PATH) {
                        return null
                    }
                    try {
                        this.text = EJS.request(url + (this.cache ? "" : "?" + Math.random()))
                    } catch (e) {}
                    if (this.text == null) {
                        throw ({
                            type: "EJS",
                            message: "There is no template at " + url
                        })
                    } else {
                        if (options.srcTemplateText) {
                            this.text = options.srcTemplateText
                        }
                    }
                }
            }
            var template = new EJS.Compiler(this.text, this.type);
            template.compile(options, this.name);
            EJS.update(this.name, this);
            this.template = template
        };
    EJS.prototype = {
            render: function (object, extra_helpers) {
                object = object || {};
                this._extra_helpers = extra_helpers;
                var v = new EJS.Helpers(object, extra_helpers || {});
                return this.template.process.call(object, object, v)
            },
            update: function (element, options) {
                if (typeof element == "string") {
                    element = document.getElementById(element)
                }
                if (options == null) {
                    _template = this;
                    return function (object) {
                        EJS.prototype.update.call(_template, element, object)
                    }
                }
                if (typeof options == "string") {
                    params = {};
                    params.url = options;
                    _template = this;
                    params.onComplete = function (request) {
                        var object = eval(request.responseText);
                        EJS.prototype.update.call(_template, element, object)
                    };
                    EJS.ajax_request(params)
                } else {
                    element.innerHTML = this.render(options)
                }
            },
            out: function () {
                return this.template.out
            },
            set_options: function (options) {
                this.type = options.type || EJS.type;
                this.cache = options.cache != null ? options.cache : EJS.cache;
                this.text = options.text || null;
                this.name = options.name || null;
                this.ext = options.ext || EJS.ext;
                this.extMatch = new RegExp(this.ext.replace(/\./, "."))
            }
        };
    EJS.endExt = function (path, match) {
            if (!path) {
                return null
            }
            match.lastIndex = 0;
            return path + (match.test(path) ? "" : this.ext)
        };
    EJS.Scanner = function (source, left, right) {
            extend(this, {
                left_delimiter: left + "%",
                right_delimiter: "%" + right,
                double_left: left + "%%",
                double_right: "%%" + right,
                left_equal: left + "%=",
                left_comment: left + "%#"
            });
            this.SplitRegexp = left == "[" ? /(\[%%)|(%%\])|(\[%=)|(\[%#)|(\[%)|(%\]\n)|(%\])|(\n)/ : new RegExp("(" + this.double_left + ")|(%%" + this.double_right + ")|(" + this.left_equal + ")|(" + this.left_comment + ")|(" + this.left_delimiter + ")|(" + this.right_delimiter + "\n)|(" + this.right_delimiter + ")|(\n)");
            this.source = source;
            this.stag = null;
            this.lines = 0
        };
    EJS.Scanner.to_text = function (input) {
            if (input == null || input === undefined) {
                return ""
            }
            if (input instanceof Date) {
                return input.toDateString()
            }
            if (input.toString) {
                return input.toString()
            }
            return ""
        };
    EJS.Scanner.prototype = {
            scan: function (block) {
                scanline = this.scanline;
                regex = this.SplitRegexp;
                if (!this.source == "") {
                    var source_split = rsplit(this.source, /\n/);
                    for (var i = 0; i < source_split.length; i++) {
                        var item = source_split[i];
                        this.scanline(item, regex, block)
                    }
                }
            },
            scanline: function (line, regex, block) {
                this.lines++;
                var line_split = rsplit(line, regex);
                for (var i = 0; i < line_split.length; i++) {
                    var token = line_split[i];
                    if (token != null) {
                        try {
                            block(token, this)
                        } catch (e) {
                            throw {
                                type: "EJS.Scanner",
                                line: this.lines
                            }
                        }
                    }
                }
            }
        };
    EJS.Buffer = function (pre_cmd, post_cmd) {
            this.line = new Array();
            this.script = "";
            this.pre_cmd = pre_cmd;
            this.post_cmd = post_cmd;
            for (var i = 0; i < this.pre_cmd.length; i++) {
                this.push(pre_cmd[i])
            }
        };
    EJS.Buffer.prototype = {
            push: function (cmd) {
                this.line.push(cmd)
            },
            cr: function () {
                this.script = this.script + this.line.join("; ");
                this.line = new Array();
                this.script = this.script + "\n"
            },
            close: function () {
                if (this.line.length > 0) {
                    for (var i = 0; i < this.post_cmd.length; i++) {
                        this.push(pre_cmd[i])
                    }
                    this.script = this.script + this.line.join("; ");
                    line = null
                }
            }
        };
    EJS.Compiler = function (source, left) {
            this.pre_cmd = ["var ___ViewO = [];"];
            this.post_cmd = new Array();
            this.source = " ";
            if (source != null) {
                if (typeof source == "string") {
                    source = source.replace(/\r\n/g, "\n");
                    source = source.replace(/\r/g, "\n");
                    this.source = source
                } else {
                    if (source.innerHTML) {
                        this.source = source.innerHTML
                    }
                }
                if (typeof this.source != "string") {
                    this.source = ""
                }
            }
            left = left || "<";
            var right = ">";
            switch (left) {
            case "[":
                right = "]";
                break;
            case "<":
                break;
            default:
                throw left + " is not a supported deliminator";
                break
            }
            this.scanner = new EJS.Scanner(this.source, left, right);
            this.out = ""
        };
    EJS.Compiler.prototype = {
            compile: function (options, name) {
                options = options || {};
                this.out = "";
                var put_cmd = "___ViewO.push(";
                var insert_cmd = put_cmd;
                var buff = new EJS.Buffer(this.pre_cmd, this.post_cmd);
                var content = "";
                var clean = function (content) {
                    content = content.replace(/\\/g, "\\\\");
                    content = content.replace(/\n/g, "\\n");
                    content = content.replace(/"/g, '\\"');
                    return content
                };
                this.scanner.scan(function (token, scanner) {
                    if (scanner.stag == null) {
                        switch (token) {
                        case "\n":
                            content = content + "\n";
                            buff.push(put_cmd + '"' + clean(content) + '");');
                            buff.cr();
                            content = "";
                            break;
                        case scanner.left_delimiter:
                        case scanner.left_equal:
                        case scanner.left_comment:
                            scanner.stag = token;
                            if (content.length > 0) {
                                buff.push(put_cmd + '"' + clean(content) + '")')
                            }
                            content = "";
                            break;
                        case scanner.double_left:
                            content = content + scanner.left_delimiter;
                            break;
                        default:
                            content = content + token;
                            break
                        }
                    } else {
                        switch (token) {
                        case scanner.right_delimiter:
                            switch (scanner.stag) {
                            case scanner.left_delimiter:
                                if (content[content.length - 1] == "\n") {
                                    content = chop(content);
                                    buff.push(content);
                                    buff.cr()
                                } else {
                                    buff.push(content)
                                }
                                break;
                            case scanner.left_equal:
                                buff.push(insert_cmd + "(EJS.Scanner.to_text(" + content + ")))");
                                break
                            }
                            scanner.stag = null;
                            content = "";
                            break;
                        case scanner.double_right:
                            content = content + scanner.right_delimiter;
                            break;
                        default:
                            content = content + token;
                            break
                        }
                    }
                });
                if (content.length > 0) {
                    buff.push(put_cmd + '"' + clean(content) + '")')
                }
                buff.close();
                this.out = buff.script + ";";
                var to_be_evaled = "/*" + name + "*/this.process = function(_CONTEXT,_VIEW) { try { with(_VIEW) { with (_CONTEXT) {" + this.out + " return ___ViewO.join('');}}}catch(e){e.lineNumber=null;throw e;}};";
                try {
                    eval(to_be_evaled)
                } catch (e) {
                    if (typeof JSLINT != "undefined") {
                        JSLINT(this.out);
                        for (var i = 0; i < JSLINT.errors.length; i++) {
                            var error = JSLINT.errors[i];
                            if (error.reason != "Unnecessary semicolon.") {
                                error.line++;
                                var e = new Error();
                                e.lineNumber = error.line;
                                e.message = error.reason;
                                if (options.view) {
                                    e.fileName = options.view
                                }
                                throw e
                            }
                        }
                    } else {
                        throw e
                    }
                }
            }
        };
    EJS.config = function (options) {
            EJS.cache = options.cache != null ? options.cache : EJS.cache;
            EJS.type = options.type != null ? options.type : EJS.type;
            EJS.ext = options.ext != null ? options.ext : EJS.ext;
            var templates_directory = EJS.templates_directory || {};
            EJS.templates_directory = templates_directory;
            EJS.get = function (path, cache) {
                if (cache == false) {
                    return null
                }
                if (templates_directory[path]) {
                    return templates_directory[path]
                }
                return null
            };
            EJS.update = function (path, template) {
                if (path == null) {
                    return
                }
                templates_directory[path] = template
            };
            EJS.INVALID_PATH = -1
        };
    EJS.config({
            cache: true,
            type: "<",
            ext: ".ejs"
        });
    EJS.Helpers = function (data, extras) {
            this._data = data;
            this._extras = extras;
            extend(this, extras)
        };
    EJS.Helpers.prototype = {
            view: function (options, data, helpers) {
                if (!helpers) {
                    helpers = this._extras
                }
                if (!data) {
                    data = this._data
                }
                return new EJS(options).render(data, helpers)
            },
            to_text: function (input, null_text) {
                if (input == null || input === undefined) {
                    return null_text || ""
                }
                if (input instanceof Date) {
                    return input.toDateString()
                }
                if (input.toString) {
                    return input.toString().replace(/\n/g, "<br />").replace(/''/g, "'")
                }
                return ""
            }
        };
    EJS.newRequest = function () {
            var factories = [function () {
                return new ActiveXObject("Msxml2.XMLHTTP")
            },


            function () {
                return new XMLHttpRequest()
            },


            function () {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }];
            for (var i = 0;
            i < factories.length; i++) {
                try {
                    var request = factories[i]();
                    if (request != null) {
                        return request
                    }
                } catch (e) {
                    continue
                }
            }
        };
    EJS.request = function (path) {
            var request = new EJS.newRequest();
            request.open("GET", path, false);
            try {
                request.send(null)
            } catch (e) {
                return null
            }
            if (request.status == 404 || request.status == 2 || (request.status == 0 && request.responseText == "")) {
                return null
            }
            return request.responseText
        };
    EJS.ajax_request = function (params) {
            params.method = (params.method ? params.method : "GET");
            var request = new EJS.newRequest();
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    if (request.status == 200) {
                        params.onComplete(request)
                    } else {
                        params.onComplete(request)
                    }
                }
            };
            request.open(params.method, params.url);
            request.send(null)
        }
})();
if (typeof define === "function") {
    define("lib_template_ejs", function (c, b, a) {
        a.exports = EJS
    })
} else {
    if (typeof exports !== "undefined") {
        module.exports = EJS
    }
}
$(function () {
    if ($("#searchBox").size() > 0) {
        require(["common_search"], function (a) {
            a.init()
        })
    }
    if ($("#globalCart").size() > 0 || $("body>div.global-nav").size() > 0) {
        require(["common_cart"], function (a) {
            a.refreshCart()
        })
    }
    if ($("#globalMore").size() > 0) {
        $("#globalMore").on("click", function () {
            var a = $("#globalMoreList");
            if (a.hasClass("hide")) {
                a.removeClass("hide")
            } else {
                a.addClass("hide")
            }
        });
        $(document.body).on("click", function (a) {
            var b = a.target ? a.target : a.srcElement;
            if (b) {
                if ($(b).closest("div.more_list").size() == 0 && $(b).closest("#globalMore").size() == 0) {
                    $("#globalMoreList").addClass("hide")
                }
            }
        })
    }
    if ((typeof indexFlag != "undefined" && indexFlag == 1) || $("#cprovincename").length > 0) {
        require(["common_popupTips", "common_mcookie", "global_env"], function (c, a, b) {
            var d = b.getProvinceId() || 1;
            if (d && d == currProvinceId) {
                $("#cprovincename").html(c.proviceObj["p_" + d])
            } else {
                if (currProvinceId) {
                    $("#cprovincename").html(c.proviceObj["p_" + currProvinceId])
                } else {
                    $("#cprovincename").html(c.proviceObj.p_1)
                }
            }
        });
        $("#cprovincename").click(function () {
            var a = $(this).text();
            require(["common_selectArea", "global_env"], function (c, e) {
                if (typeof(_isNotglGeoLocation) != "undefined" && _isNotglGeoLocation) {
                    return
                }
                if (glGeoLocation) {
                    var d = e.isInApp();
                    if (!d) {
                        var b = "//image.yihaodianimg.com/statics";
                        var f = {
                            cssUrl: pathurl + "/mglobal/css/selectAddress.css",
                            pName: a
                        };
                        c.showProvince(f)
                    }
                }
            })
        })
    }
    require(["common_back"], function (a) {
        a.saveURL()
    })
});
$(function () {
    var b = $(".global-nav"),
        c = $(".global-nav__operate-wrap");
    c.on("click", function () {
            if (c.parent().hasClass("global-nav--current")) {
                a()
            } else {
                d()
            }
        });
    var d = function () {
            b.addClass("global-nav--current")
        };
    var a = function () {
            b.removeClass("global-nav--current")
        };
    $(window).on("scroll", function () {
            if (b.hasClass("global-nav--current")) {
                a()
            }
        });
    require(["global_env"], function (f) {
            var e = f.isInApp();
            if (e) {
                b.hide()
            }
        })
});
(function () {
    require(["common_selectArea", "global_env"], function (d, f) {
        if (typeof(_isNotglGeoLocation) != "undefined" && _isNotglGeoLocation) {
            return
        }
        var b = f.getProvinceId();
        if (!b && glGeoLocation) {
            var e = f.isInApp();
            if (!e) {
                var c = "//image.yihaodianimg.com/statics";
                var a = {
                    cssUrl: pathurl + "/mglobal/css/selectAddress.css"
                };
                d.init(a)
            }
        }
    })
})();
(function () {
    function a() {
        require(["common_globalTiming"], function (c) {
            function b() {
                var f = 1;
                var h = [];
                if (typeof common_globalTimingRely != "undefined" && common_globalTimingRely) {
                    var e = common_globalTimingRely.getRelyResource();
                    if (e && e.length > 0) {
                        for (var d = 0; d < e.length; d++) {
                            var g = e[d];
                            if (g && g.status != 1) {
                                f = 0;
                                break
                            } else {
                                if (g && g.status == 1) {
                                    h.push(g.key + "_" + g.time)
                                }
                            }
                        }
                    }
                }
                if (f) {
                    c.loadBaseTime(h)
                } else {
                    setTimeout(b, 2000)
                }
            }
            setTimeout(b, 2000)
        })
    }
    if (document.addEventListener) {
        window.addEventListener("load", a, false)
    } else {
        if (document.attachEvent) {
            document.attachEvent("onload", function () {
                a()
            })
        }
    }
})();
(function () {
    if (window.sessionStorage) {
        var a = window.sessionStorage.getItem("latitude");
        var b = window.sessionStorage.getItem("longitude");
        if (a && b) {
            trackerContainer.addParameter(new Parameter("latitude", a));
            trackerContainer.addParameter(new Parameter("longitude", b))
        }
    }
})();
$(function () {
    var a = $("#g_openAppId");
    var b = document.referrer;
    if (a.length > 0) {
        if (b.indexOf("baidu.com") > -1 || b.indexOf("haosou.com") > -1 || b.indexOf("m.sm.cn") > -1 || b.indexOf("sogou.com") > -1) {
            require(["biz_appDownloadBottom"], function (c) {})
        } else {
            a.hide()
        }
    }
});

function commonStatistics(a, b, c, d) {
    addTrackPositionToCookie(b, c);
    if (d != null && d != "") {
        window.location = d + "?time=" + (new Date().getTime())
    } else {
        gotracker(b, c, null)
    }
}
define("common_globalTiming", function () {
    var c = {};
    var b = {};
    var d = ".";
    b.checkTpPage = function (f) {
        if (!f) {
            return null
        }
        var e = f.split(d);
        return e.length == 2 ? e : null
    };
    b.glSpmcodeToId = function (f, e) {
        if (typeof(_globalSpmDataModelJson) != "undefined" && _globalSpmDataModelJson) {
            var g = 0;
            if (f) {
                g = _globalSpmDataModelJson[f][e]
            } else {
                g = _globalSpmDataModelJson[e]
            }
            if (g) {
                return g
            }
        }
        return e
    };

    function a() {
        var e = $("meta[name=tp_page]").attr("content");
        if (typeof(e) == "undefined") {
            return
        }
        e = b.checkTpPage(e);
        if (!e) {
            return
        }
        return b.glSpmcodeToId(null, e[0])
    }
    c.timeToStr = function (h, f) {
        var e = [];
        for (var g in h) {
            if (h[g].value == -1 || h[g].value >= 3 * 60 * 1000) {
                continue
            }
            e.push(h[g].name + "_" + h[g].value)
        }
        if (f) {
            if ((typeof f == "object") && f.constructor == Array) {
                if (f.length > 0) {
                    e = e.concat(f)
                }
            } else {
                e.push(f)
            }
        }
        return (e.join("-"))
    };
    c.basicTime = function (j) {
        if (!window.performance) {
            return
        }
        var e = window.performance,
            h = e.timing,
            k = e.navigation,
            g = {
                redirectCount: {
                    name: "RDTT",
                    value: k.redirectCount
                },
                redirectTime: {
                    name: "RDTM",
                    value: h.redirectEnd - h.redirectStart
                },
                domainLookupTime: {
                    name: "DMLKT",
                    value: h.domainLookupEnd - h.domainLookupStart
                },
                connectTime: {
                    name: "CONTT",
                    value: h.connectEnd - h.connectStart
                },
                requestTime: {
                    name: "REQT",
                    value: h.responseStart - (h.requestStart || h.responseStart + 1)
                },
                responseTime: {
                    name: "RSPT",
                    func: function () {
                        var i = h.responseEnd - h.responseStart;
                        if (h.domContentLoadedEventStart) {
                            if (i < 0) {
                                i = 0
                            }
                        } else {
                            i = -1
                        }
                        return i
                    },
                    value: -1
                },
                domParsingTime: {
                    name: "DMPT",
                    func: function () {
                        return h.domContentLoadedEventStart ? h.domInteractive - h.domLoading : -1
                    },
                    value: -1
                },
                domLoadedTime: {
                    name: "DMLT",
                    func: function () {
                        if (h.loadEventStart) {
                            return h.loadEventStart - h.domInteractive
                        }
                        return h.domComplete ? h.domComplete - h.domInteractive : -1
                    },
                    value: -1
                },
                winOnLoadTime: {
                    name: "ONLOADT",
                    func: function () {
                        return h.loadEventEnd ? h.loadEventEnd - h.loadEventStart : -1
                    },
                    value: -1
                },
                pageLoadTime: {
                    name: "PAGET",
                    func: function () {
                        if (h.loadEventStart) {
                            return h.loadEventStart - h.fetchStart
                        }
                        return h.domComplete ? h.domComplete - h.fetchStart : -1
                    },
                    value: -1
                },
                allLoadTime: {
                    name: "ALLT",
                    func: function () {
                        if (h.loadEventEnd) {
                            return h.loadEventEnd - h.navigationStart
                        }
                        return h.domComplete ? h.domComplete - h.navigationStart : -1
                    },
                    value: -1
                },
                firstPaintTime: {
                    name: "FPAINTT",
                    func: function () {
                        var i = h.firstPaint || h.msFirstPaint || h.mozFirstPaint || h.webkitFirstPaint || h.oFirstPaint;
                        if (!i && window.chrome && window.chrome.loadTimes) {
                            i = parseInt(window.chrome.loadTimes().firstPaintTime * 1000)
                        }
                        return i ? i - h.navigationStart : -1
                    },
                    value: -1
                },
                beforeDomLoadingTime: {
                    name: "BEFDMLT",
                    func: function () {
                        return h.domLoading ? h.domLoading - h.navigationStart : -1
                    },
                    value: -1
                },
                resourcesLoadedTime: {
                    name: "RESLOADT",
                    func: function () {
                        if (h.loadEventStart) {
                            return h.loadEventStart - h.domLoading
                        }
                        return h.domComplete ? h.domComplete - h.domLoading : -1
                    },
                    value: -1
                },
                scriptRunTime: {
                    name: "SCRIPTT",
                    func: function () {
                        var i = h.domContentLoadedEventEnd - h.domContentLoadedEventStart;
                        return i > 0 ? i : -1
                    },
                    value: -1
                },
                customInteractTime: {
                    name: "CINTT",
                    func: function () {
                        var l = window.global || (window.global = {});
                        var m = l.vars = (l.vars || {});
                        var i = l.vars.customInteractTime;
                        if (i) {
                            return i - window.performance.timing.navigationStart
                        } else {
                            return -1
                        }
                    },
                    value: -1
                },
                interactTime: {
                    name: "INTT",
                    func: function () {
                        if (h.domContentLoadedEventStart) {
                            return h.domContentLoadedEventStart - h.navigationStart
                        }
                        return -1
                    },
                    value: -1
                }
            };
        for (var f in g) {
                if (g[f].value == -1 && typeof g[f].func == "function") {
                    g[f].value = g[f].func()
                }
            }
        return this.timeToStr(g, j)
    };
    c.eventHandleTime = function (g) {
        try {
            var f = [];
            if (typeof g == "undefined") {
                return false
            } else {
                if (g instanceof Array) {
                    var e = false;
                    for (var k = 0; k < g.length; k++) {
                        var j = g[k];
                        if (typeof j == "object") {
                            if (typeof j.name == "undefined" || j.endTime == "undefined" || j.startTime == "undefined") {
                                console.log("data format is wrong! propeties should have name or endTime or startTime ");
                                continue
                            } else {
                                if (typeof j.endTime != "number" || typeof j.startTime != "number") {
                                    console.log(" endTime or startTime of " + j.name + "Object is not number type");
                                    continue
                                } else {
                                    f.push(j.name + "_" + (j.endTime - j.startTime));
                                    e = true
                                }
                            }
                        } else {
                            console.log("data format of Array is wrong! should be single Object");
                            continue
                        }
                    }
                    if (e) {
                        c.sendTimerTracker(f.join("|"));
                        return true
                    }
                } else {
                    if (typeof g == "object") {
                        if (typeof g.name == "undefined" || g.startTime == "undefined" || g.endTime == "undefined") {
                            console.log("data format is wrong! propeties should be name and startTime ");
                            return false
                        } else {
                            if (typeof g.startTime != "number" || typeof g.endTime != "number") {
                                console.log(" startTime of " + g.name + "Object is not number type");
                                return false
                            }
                            c.sendTimerTracker(g.name + "_" + (g.endTime - g.startTime));
                            return true
                        }
                    } else {
                        return false
                    }
                }
            }
        } catch (h) {}
    };
    c.sendTimerTracker = function (e) {
        if (e && $.trim(e) != "") {
            var f = a();
            if (!f || isNaN(f) || parseInt(f) <= 0) {
                recordTrackInfoWithType("2", e);
                return
            }
            var g = {
                w_pt: f
            };
            recordTrackInfoWithType("2", e, null, null, g)
        }
    };
    c.loadBaseTime = function (e) {
        if (!window.performance) {
            return
        }
        if (typeof stopGlobalTimingLoadFlag == "undefined") {
            c.sendTimerTracker(c.basicTime(e))
        }
    };
    return c
});
define("common_yhd.storage", function () {
    var c = window.loli || (window.loli = {});
    var i = "localStorage",
        k = "sessionStorage",
        e = {},
        h = {};
    e.set = function (n, m) {};
    e.get = function (m) {};
    e.remove = function (m) {};
    e.clear = function () {};
    h.set = function (n, m) {};
    h.get = function (m) {};
    h.remove = function (m) {};
    h.clear = function () {};

    function f(m) {
            try {
                if (m in window && window[m]) {
                    localStorage.setItem("__testLocal", "1");
                    var o = localStorage.getItem("__testLocal");
                    return o
                }
                return false
            } catch (n) {
                return false
            }
        }
    function j(m, n) {
            var o = window[m];
            n.set = function (p, q) {
                if (q === undefined) {
                    return o.remove(p)
                }
                o.setItem(p, q);
                return q
            };
            n.get = function (p) {
                return o.getItem(p)
            };
            n.remove = function (p) {
                o.removeItem(p)
            };
            n.clear = function () {
                o.clear()
            }
        }
    if (f(i)) {
            j(i, e)
        }
    if (f(k)) {
            j(k, h)
        }
    var b = function () {
            var p = true;
            var o = document.domain;
            var m = /([^\.]*)\.yhd\.com/;
            if (m.test(o)) {
                var n = m.exec(o)[1];
                if (n != "www") {
                    p = false
                }
            }
            return p
        };
    var a = function () {
            var n = window.navigator.userAgent.toLowerCase();
            var o = /safari/i;
            var m = /chrome/i;
            var p = /Android/i;
            if (o.test(n) && !m.test(n) && !p.test(n)) {
                return true
            }
            return false
        };
    var g = function () {
            var m = new Date();
            return (m.getYear() + 1900) + "" + (m.getMonth() + 1)
        };
    var l = function (q, o, s, m) {
            var r = s ||
            function () {};
            var y = (m && m == "session") ? h : e;
            if (b()) {
                var p = y.set(q, o);
                r({
                    status: 1,
                    key: q,
                    value: p
                })
            } else {
                if (a() && m != "session") {
                    $.fn.cookie(q, encodeURIComponent(o), {
                        domain: "m.yhd.com",
                        path: "/",
                        expires: 30
                    });
                    r({
                        status: 1,
                        key: q,
                        value: o
                    });
                    return
                }
                if (!window.postMessage || !window.addEventListener) {
                    r({
                        status: 0,
                        key: q,
                        value: null
                    });
                    return
                }
                var w = "globalLocalStorageAdaptorForSet";
                var t = $("#" + w);
                if (t.size() == 0) {
                    var v = document.createElement("iframe");
                    v.setAttribute("id", w);
                    v.setAttribute("style", "display:none");
                    v.setAttribute("src", window.location.protocol + "//www.yhd.com/html/setLocalStorageH5.html?v=" + g());
                    document.body.appendChild(v);
                    t = $("#" + w)
                }
                if (t.attr("loaded")) {
                    var x = t.get(0).contentWindow;
                    var n = window.location.protocol + "//www.yhd.com";
                    var u = {
                        key: q,
                        value: o,
                        type: m
                    };
                    x.postMessage(u, n);
                    setTimeout(function () {
                        r({
                            status: 1,
                            key: q,
                            value: o
                        })
                    }, 200)
                } else {
                    t.on("load", function () {
                        $(this).attr("loaded", "1");
                        var B = $(this).get(0).contentWindow;
                        var z = window.location.protocol + "//www.yhd.com";
                        var A = {
                            key: q,
                            value: o,
                            type: m
                        };
                        B.postMessage(A, z);
                        setTimeout(function () {
                            r({
                                status: 1,
                                key: q,
                                value: o
                            })
                        }, 200)
                    })
                }
            }
        };
    var d = function (B, x, m, r) {
            var z = function (E) {
                if (x) {
                    if (r && E && (E.value == null || typeof E.value === "undefined")) {
                        var F = $.fn.cookie(B);
                        if (F !== null && typeof F !== "undefined") {
                            F = decodeURIComponent(F)
                        }
                        E.value = F
                    }
                    x(E)
                }
            };
            var p = z;
            var y = (m && m == "session") ? h : e;
            if (b()) {
                var D = y.get(B);
                p({
                    status: 1,
                    key: B,
                    value: D
                })
            } else {
                if (a() && m != "session") {
                    var D = $.fn.cookie(B);
                    if (D !== null) {
                        D = decodeURIComponent(D)
                    }
                    p({
                        status: 1,
                        key: B,
                        value: D
                    });
                    return
                }
                if (!window.postMessage || !window.addEventListener) {
                    p({
                        status: 0,
                        key: B,
                        value: null
                    });
                    return
                }
                var v = window["yhd.storage.get.callback"] || (window["yhd.storage.get.callback"] = []);
                v.push(p);
                var n = v.length - 1;
                var s = "globalLocalStorageAdaptorForGet";
                var q = $("#" + s);
                if (q.size() == 0) {
                    var w = document.createElement("iframe");
                    w.setAttribute("id", s);
                    w.setAttribute("style", "display:none");
                    w.setAttribute("src", window.location.protocol + "//www.yhd.com/html/getLocalStorageH5.html?v=" + g());
                    document.body.appendChild(w);
                    q = $("#" + s)
                }
                if (q.attr("loaded")) {
                    var o = q.get(0).contentWindow;
                    var t = window.location.protocol + "//www.yhd.com";
                    var u = window.location.protocol + "//" + window.location.host;
                    var A = {
                        key: B,
                        host: u,
                        version: n,
                        type: m
                    };
                    o.postMessage(A, t)
                } else {
                    q.on("load", function () {
                        $(this).attr("loaded", "1");
                        var H = $(this).get(0).contentWindow;
                        var E = window.location.protocol + "//www.yhd.com";
                        var F = window.location.protocol + "//" + window.location.host;
                        var G = {
                            key: B,
                            host: F,
                            version: n,
                            type: m
                        };
                        H.postMessage(G, E)
                    })
                }
                var C = function (H) {
                    var G = /^http[s]?:\/\/([\.\w]*)\.yhd\.com/i;
                    if (G.test(H.origin)) {
                        var F = H.data;
                        if (F) {
                            var E = v[F.version];
                            if (E) {
                                E({
                                    status: 1,
                                    key: F.key,
                                    value: F.value
                                })
                            } else {
                                p({
                                    status: 1,
                                    key: F.key,
                                    value: F.value
                                })
                            }
                        }
                    }
                };
                if (!window["yhd.storage.get.handler"]) {
                    window.addEventListener("message", C);
                    window["yhd.storage.get.handler"] = C
                }
            }
        };
    e.setFromRoot = function (m, o, n) {
            l(m, o, n, "local")
        };
    e.getFromRoot = function (n, o, m) {
            d(n, o, "local", m)
        };
    h.setFromRoot = function (m, o, n) {
            l(m, o, n, "session")
        };
    h.getFromRoot = function (n, o, m) {
            d(n, o, "session", m)
        };
    c.yhdStore = e;
    c.yhdSessionStore = h;
    return e
});
define("common_search", ["tracker_ref_yhd.global_spm", "common_yhd.storage"], function (c, d) {
    var f = {};
    var o = (typeof isSearchKeyWords != "undefined" && isSearchKeyWords == "1") ? 1 : 0;
    var h = (typeof indexFlag != "undefined" && indexFlag == 1) ? 1 : 0;
    var k = (typeof globalSearchSelectFlag != "undefined" && globalSearchSelectFlag == "0") ? 0 : 1;
    var p = $("#keyword");
    var e = $("#searchSuggest");
    var l = $("#searchBtn");
    var n = $("#searchBox");
    var j = window.loli || (window.loli = {});
    var m = j.app = j.app || {};
    var b = j.app.search = j.app.search || {};
    var a = URLPrefix.search || "//search.m.yhd.com";
    var i = "//m.yhd.com";
    b.delayCall = function (t, q, w, s) {
        var r = $(t);
        r.lastTime = new Date().getTime();
        if (q) {
            var u = q.call(r);
            r.lastResult = u
        }
        var v = setTimeout(function () {
            var x = r.lastTime ? r.lastTime : new Date().getTime();
            var z = (typeof r.lastResult == "undefined" || r.lastResult) ? true : false;
            var y = new Date().getTime();
            if (y - x >= (s - 50)) {
                if (w && z) {
                    w.call(r)
                }
            }
        }, s)
    };
    b.filterXml = function (q) {
        if (q != null && q != "" && typeof q == "string") {
            q = q.replace(/\&/g, "&amp;");
            q = q.replace(/\</g, "&lt;");
            q = q.replace(/\>/g, "&gt;");
            q = q.replace(/\\/g, "&#92;");
            q = q.replace(/\'/g, "&#039;");
            q = q.replace(/\"/g, "&#034;")
        }
        return q
    };
    b.filterJs = function (q) {
        if (q != null && q != "" && typeof q == "string") {
            q = q.replace(/\&/g, "%5C%26");
            q = q.replace(/\</g, "%5C%3C");
            q = q.replace(/\>/g, "%5C%3E");
            q = q.replace(/\\/g, "%5C%5C");
            q = q.replace(/\'/g, "%5C%27");
            q = q.replace(/\"/g, "%5C%22")
        }
        return q
    };
    b.filterInvalid = function (q) {
        if (q != null && q != "" && typeof q == "string") {
            q = $.trim(q)
        }
        return q
    };
    b.saveKeyword = function (r, q) {
        var s = d;
        if (s) {
            s.getFromRoot("search_keyword_history", function (v) {
                if (v && v.status == 1) {
                    var y = v.value;
                    var w = [];
                    var t = [];
                    if (y) {
                        w = y.split(",")
                    }
                    for (var z = 0; z < w.length; z++) {
                        var x = decodeURIComponent(decodeURIComponent(w[z]));
                        if (x != null && x.length > 0) {
                            t.push(x)
                        }
                    }
                    var u = false;
                    for (var z = 0; z < t.length; z++) {
                        if (t[z] == r) {
                            u = true;
                            break
                        }
                    }
                    if (!u) {
                        t.push(r);
                        if (t.length > 10) {
                            t.shift()
                        }
                        for (var z = 0; z < t.length; z++) {
                            t[z] = encodeURIComponent(encodeURIComponent(t[z]))
                        }
                        s.setFromRoot("search_keyword_history", t.join(","), function (A) {
                            if (A && A.status == 1) {
                                if (q) {
                                    q()
                                }
                            }
                        })
                    } else {
                        if (q) {
                            q()
                        }
                    }
                }
            })
        }
        if (q) {
            setTimeout(function () {
                q()
            }, 3 * 1000)
        }
    };
    b.getSearchKeywordUrl = function (s, q, r) {
        if (r) {
            s = s + " " + r
        }
        if (!q) {
            q = "0";
            return a + "/search/k" + encodeURIComponent(encodeURIComponent(s))
        }
        return a + "/search/c" + q + "-0/k" + encodeURIComponent(encodeURIComponent(s))
    };
    b.goSearch = function (r, t, q) {
        r = b.filterInvalid(r);
        var s = function () {
            var u = b.getSearchKeywordUrl(r, t, q);
            c.refreshPage(u, n)
        };
        b.saveKeyword(r, s)
    };
    b.goMerchant = function (s, r) {
        if (s && s > 0) {
            var q = function () {
                var t = i + "/store/m-" + s + "-1.html";
                c.refreshPage(t, n)
            };
            b.saveKeyword(r, q)
        } else {
            r = b.filterInvalid(r);
            var q = function () {
                var t = a + "/search/searchShopStore_list/k" + encodeURIComponent(encodeURIComponent(r));
                c.refreshPage(t, n)
            };
            b.saveKeyword(r, q)
        }
    };
    b.showHistory = function (q, s) {
        if (!k) {
            return
        }
        var r = b.filterInvalid(q.val());
        var t = d;
        var v = function () {
            var w = a + "/search/getSmartKeyword/?callback=?";
            $.getJSON(w, function (y) {
                if (y && y.hotSearchKeywords && y.hotSearchKeywords.length > 0) {
                    var z = [];
                    for (var A = 0; A < y.hotSearchKeywords.length; A++) {
                        var x = y.hotSearchKeywords[A];
                        z.push("<a class='item' href='javascript:goSearch(\"" + x + "\")'>" + x + "</a>")
                    }
                    $("div.tags", s).html(z.join(""));
                    $("div.tags", s).show()
                }
                if (t) {
                    t.getFromRoot("search_keyword_history", function (E) {
                        if (E && E.status == 1) {
                            var F = E.value;
                            var C = [];
                            var B = [];
                            if (F) {
                                C = F.split(",")
                            }
                            for (var G = C.length - 1; G >= 0; G--) {
                                var D = b.filterInvalid(decodeURIComponent(decodeURIComponent(C[G])));
                                if (D != null && D.length > 0) {
                                    B.push("<li><a class='link_text' href='javascript:goSearch(\"" + b.filterJs(D) + "\")'>");
                                    B.push("<span class='icon gicon-history'></span>");
                                    B.push("<span class='text'>" + b.filterXml(D) + "</span>");
                                    B.push("<span class='icon_arrow gicon-right_arrow'></span>");
                                    B.push("</a></li>")
                                }
                            }
                            $("ul", s).html(B.join(""));
                            if (C.length == 0) {
                                s.find("a.clear_history").hide()
                            } else {
                                s.find("a.clear_history").show()
                            }
                        }
                    })
                }
                $("#globalHeader").addClass("search_show");
                u(q, s)
            })
        };
        var u = function (w, x) {
            x.on("click", "a.clear_history", function () {
                t.setFromRoot("search_keyword_history", "");
                $(this).hide();
                $("ul", x).html("")
            })
        };
        if (r == "" || $.trim(r) == "") {
            v()
        }
    };
    b.showSuggest = function (q, t) {
        if (!k) {
            return
        }
        var s = 2;
        var r = b.filterInvalid(q.val());
        var v = function (y, w, x) {
            if (s == 1) {
                return
            }
            if (y && y != null) {
                if (2 == x) {
                    w.push("<li>");
                    w.push("<a class='link_text' href='javascript:goGlobalMerchant(" + y.merchantId + ',"' + y.keyword + "\")'>");
                    w.push("<span class='icon gicon-simple_shop'></span>");
                    w.push("<span class='text'>" + y.keyword + "</span>");
                    w.push("</a>");
                    w.push("</li>")
                }
                if (1 == x) {
                    w.push("<li>");
                    w.push("<a class='link_text' href='javascript:goGlobalMerchant(0,\"" + y.keyword + "\")'>");
                    w.push("<span class='icon gicon-search'></span>");
                    w.push("<span class='text'>\"" + y.keyword + '"相关店铺 </span>');
                    w.push("</a>");
                    w.push("</li>")
                }
            }
        };
        var u = function () {
            var w = a + "/search/getSmartKeyword/?keyword=" + encodeURIComponent(encodeURIComponent(r)) + "&callback=?";
            $.getJSON(w, function (B) {
                if (B) {
                    var A = [];
                    var D = r;
                    if (B.shopKeywords && B.shopKeywords.length > 0) {
                        var C = B.shopKeywords[0];
                        if (C.matchType == 2) {
                            v(C, A, 2)
                        }
                    }
                    if (B.keywords && B.keywords.length > 0) {
                        var x = B.keywords[0];
                        D = B.keywords[0].keyword;
                        A.push("<li>");
                        A.push("<a class='link_text' href='javascript:goSearch(\"" + x.keyword + "\")'>");
                        A.push("<span class='icon gicon-search'></span>");
                        A.push("<span class='text'>" + x.keyword + "</span>");
                        A.push("</a>");
                        for (var y = 0; y < x.attrs.length; y++) {
                            A.push("<a class='link_tag' href='javascript:goSearch(\"" + x.keyword + '",0,"' + x.attrs[y] + "\")'>" + x.attrs[y] + "</a>")
                        }
                        A.push("</li>")
                    }
                    if (B.recommendCID1 && B.recommendCNA1) {
                        A.push("<li><a class='link_text' href='javascript:goSearch(\"" + D + '","' + B.recommendCID1 + "\")'>");
                        A.push("<span class='icon gicon-sort'></span>");
                        A.push("<span class='text_category'>在<strong>" + B.recommendCNA1 + "</strong>分类中搜索</span>");
                        A.push("<span class='icon_arrow gicon-right_arrow'></span>");
                        A.push("</li></a>")
                    }
                    if (B.recommendCID2 && B.recommendCNA2) {
                        A.push("<li><a class='link_text' href='javascript:goSearch(\"" + D + '","' + B.recommendCID2 + "\")'>");
                        A.push("<span class='icon gicon-sort'></span>");
                        A.push("<span class='text_category'>在<strong>" + B.recommendCNA2 + "</strong>分类中搜索</span>");
                        A.push("<span class='icon_arrow gicon-right_arrow'></span>");
                        A.push("</li></a>")
                    }
                    if (B.keywords && B.keywords.length > 0) {
                        for (var z = 1; z < B.keywords.length; z++) {
                            var x = B.keywords[z];
                            A.push("<li>");
                            A.push("<a class='link_text' href='javascript:goSearch(\"" + x.keyword + "\")'>");
                            A.push("<span class='icon gicon-search'></span>");
                            A.push("<span class='text'>" + x.keyword + "</span>");
                            A.push("</a>");
                            for (var y = 0; y < x.attrs.length; y++) {
                                A.push("<a class='link_tag' href='javascript:goSearch(\"" + x.keyword + '",0,"' + x.attrs[y] + "\")'>" + x.attrs[y] + "</a>")
                            }
                            A.push("</li>");
                            if (B.keywords.length > 2) {
                                if (z == 2) {
                                    if (B.shopKeywords && B.shopKeywords.length > 0) {
                                        var C = B.shopKeywords[0];
                                        if (C.matchType == 1) {
                                            v(C, A, 1)
                                        }
                                    }
                                }
                            } else {
                                if (B.keywords.length == z) {
                                    if (B.shopKeywords && B.shopKeywords.length > 0) {
                                        var C = B.shopKeywords[0];
                                        if (C.matchType == 1) {
                                            v(C, A, 1)
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (B.shopKeywords && B.shopKeywords.length > 0) {
                            var C = B.shopKeywords[0];
                            if (C.matchType == 1) {
                                v(C, A, 1)
                            }
                        }
                    }
                    $("ul", t).html(A.join(""));
                    $("div.tags", t).hide();
                    t.find("a.clear_history").hide();
                    $("#globalHeader").addClass("search_show")
                }
            })
        };
        if (r != "" && $.trim(r) != "") {
            u()
        }
    };
    b.registerGlobalEvent = function () {
        var r = function (u, s, w) {
            u = u || window.event;
            if (u) {
                var v = u.keyCode;
                if (v == "116" || v == "16" || v == "17" || v == "18" || v == "38" || v == "40" || v == "13") {
                    return
                }
            }
            var t = b.filterInvalid(s.val());
            if (t == "" || $.trim(t) == "") {
                b.delayCall(s, function () {
                    n.find("span.icon_delete").hide()
                }, function () {
                    b.showHistory(s, w)
                }, 200)
            } else {
                b.delayCall(s, function () {
                    n.find("span.icon_delete").show()
                }, function () {
                    b.showSuggest(s, w)
                }, 200)
            }
        };
        var q = function (u, s, v) {
            var t = b.filterInvalid(s.val());
            if (t == "" || $.trim(t) == "") {
                b.delayCall(s, null, function () {
                    b.showHistory(s, v)
                }, 200)
            } else {
                b.delayCall(s, null, function () {
                    b.showSuggest(s, v)
                }, 200)
            }
        };
        p.on("focus", function (s) {
            q(s, p, e)
        });
        p.on("input", function (s) {
            r(s, p, e)
        });
        l.on("click", function (t) {
            var s = b.filterInvalid(p.val());
            if (s != "" && $.trim(s) != "") {
                b.goSearch(s)
            }
        });
        $("#searchForm").on("submit", function () {
            var s = b.filterInvalid(p.val());
            if (s != "" && $.trim(s) != "") {
                b.goSearch(s)
            }
            return false
        });
        g()
    };

    function g() {
        n.on("click", "span.icon_back", function () {
            p.val(p.attr("data-original"));
            n.find("span.icon_delete").hide();
            $("#globalHeader").removeClass("search_show")
        });
        n.on("click", "span.icon_delete", function (q) {
            p.val("");
            n.find("span.icon_delete").hide();
            p.trigger("focus")
        });
        $("#searchMask").on("click", function () {
            p.val(p.attr("data-original"));
            n.find("span.icon_delete").hide();
            $("#globalHeader").removeClass("search_show")
        })
    }
    f.init = function () {
        if ("shop" == globalTopType || "groupShop" == globalTopType) {
            g();
            p.on("click", function () {
                $("#globalHeader").addClass("search_show");
                e.hide()
            });
            return
        }
        b.registerGlobalEvent();
        window.goSearch = function (s, q, r) {
            b.goSearch(s, q, r)
        };
        window.goGlobalMerchant = function (r, q) {
            b.goMerchant(r, q)
        }
    };
    f.show = function () {
        var q = b.filterInvalid(p.val());
        if (q == "" || $.trim(q) == "") {
            b.showHistory(p, e)
        } else {
            b.showSuggest(p, e)
        }
    };
    return f
});
define("biz_newUserMesssage", ["common_mcookie", "util_globalLogin"], function (e, b) {
    var a = $("#g_newUserMesssage");

    function d(h) {
        var l = new Date(),
            i = l.getTime() % (1000 * 60 * 60 * 24),
            k = h.getTime() - l.getTime(),
            j = k + i;
        if (j < 0 || j > 1000 * 60 * 60 * 24) {
                return false
            } else {
                return true
            }
    }
    var g = function (h) {
        if (h.result == 1) {
            a.hide()
        } else {
            a.show()
        }
    };

    function f() {
        var h = localStorage.getItem("newUserMesssage");
        if (h) {
            var i = new Date(h);
            if (d(i)) {
                a.hide()
            } else {
                a.show()
            }
        } else {
            a.show()
        }
    }
    var c = e.getCookie("yihaodian_uid");
    if (c) {
        a.hide()
    } else {
        f();
        b.globalCheckLogin(g)
    }
    a.on("click", ".icon-delete", function () {
        a.hide();
        localStorage.setItem("newUserMesssage", (new Date()).toISOString())
    })
});
define("biz_popupAppDownload", ["common_mcookie", "lib_template_ejs"], function (c, b) {
    var f = function () {
        var k = 0;
        var j = window.localStorage;
        if (j) {
            var l = j.getItem("apolloDonwloadFlag");
            if (l && !isNaN(l)) {
                var i = new Date().getTime() - parseInt(l);
                if (i >= 0 && i < 3 * 24 * 3600 * 1000) {
                    k = 1
                }
            }
        }
        return k
    };
    var a = function () {
        return window.location.search != "" && (window.location.search.indexOf("from=") > 0 || window.location.search.indexOf("Apphost=") > 0)
    };
    var h = function (l) {
        var k = "//m.yhd.com/mobile/homePage/ajaxFindAppDownloadInfo.do";
        var j = function (m) {
            var n = g(m);
            if (n) {
                if ($("#newUserPopup").size() > 0) {
                    return
                }
                $(document.body).append(n);
                d()
            }
        };
        var i = {
            url: l
        };
        $.getJSON(k, i, function (m) {
            if (m) {
                if (m.status == 1) {
                    j(m.data)
                }
            }
        })
    };
    var g = function (j) {
        var l = false;
        var i = /(iPod|iTouch|iPhone|iPad)/i;
        if (i.test(window.navigator.userAgent)) {
            l = true
        }
        var n = "//m.yhd.com/statics/mglobal/js/biz/popupAppDownload.ejs";
        var k = {
            pathurl: pathurl,
            isIOS: l,
            data: j
        };
        var m = new b({
            url: n
        }).render(k);
        return m
    };
    var d = function () {
        setTimeout(function () {
            $("#globalPopupAppDownload").show()
        }, 200);
        $("#globalPopupAppDownload_close").click(function () {
            $("#globalPopupAppDownload").hide();
            gotracker("2", "h5_global_popupAppDownload_close")
        });
        $("#globalPopupAppDownload div.layout_white").get(0).addEventListener("touchmove", function () {
            $("#globalPopupAppDownload").hide();
            gotracker("2", "h5_global_popupAppDownload_close")
        }, false);
        $("#globalPopupAppDownload_link1,#globalPopupAppDownload_link2").click(function () {
            $("#globalPopupAppDownload").hide();
            gotracker("2", $(this).attr("data-ref"))
        });
        var i = window.localStorage;
        if (i) {
            i.setItem("apolloDonwloadFlag", new Date().getTime())
        }
    };
    var e = {};
    e.init = function (i) {
        if (!f() && !a() && i) {
            h(i)
        }
    };
    return e
});
define("common_back", ["tracker_ref_yhd.global_spm", "common_yhd.storage"], function (m, i) {
    var g = {};
    var a = window.loli || (window.loli = {});
    var p = a.app = a.app || {};
    var k = a.app.url = a.app.url || {};
    var e = a.yhdSessionStore;
    var o = a.app.url.cfg = a.app.url.cfg || {
        enable: true,
        type: "url",
        maxSize: 100
    };
    var c = function () {
        var t = "user_browse_history";
        if (window.name == "") {
            window.name = new Date().getTime()
        }
        return t + "_" + window.name
    };
    var f = c();
    var b = function (t) {
        e.getFromRoot(f, function (w) {
            var u = null;
            if (w && w.status == 1) {
                var v = w.value;
                u = (v != null && v != "") ? $.parseJSON(v) : null
            }
            t(u)
        })
    };
    var l = function (u, t) {
        var v = u ? JSON.stringify(u) : "";
        e.setFromRoot(f, v, function (w) {
            if (t) {
                t(w)
            }
        })
    };
    var r = function (z) {
        var w = "";
        var B = "";
        var u = "";
        var x = "";
        var A = /^(http[s]?:\/\/[\.\w]*\.yhd\.com)[\/]?/i;
        var v = /^http[s]?:\/\/[\.\w]*\.yhd\.com(\/[^\?]*\/?)[\?\#]*/i;
        var y = /(\?[^\#]*)/i;
        var t = /(\#.*)/i;
        if (A.test(z)) {
            w = A.exec(z)[1]
        }
        if (v.test(z)) {
            B = v.exec(z)[1]
        }
        if (y.test(z)) {
            u = y.exec(z)[1]
        }
        if (t.test(z)) {
            x = t.exec(z)[1]
        }
        return {
            domain: w,
            path: B,
            params: u,
            hash: x
        }
    };
    var q = function (t, u) {
        var x = new RegExp("[?&]" + u + "=[^&#]*");
        var w = t;
        if (x.test(t)) {
            var v = x.exec(t)[0];
            if (v.charAt(0) == "?") {
                w = t.replace(x, "?")
            } else {
                w = t.replace(x, "")
            }
            if (w.indexOf("?&") != -1) {
                w = w.substring(0, w.indexOf("?&") + 1) + w.substring(w.indexOf("?&") + 2)
            }
            if (w.charAt(w.length - 1) == "?") {
                w = w.substring(0, w.length - 1)
            }
        }
        return w
    };
    var d = function (v) {
        var u = /(\#.*)/i;
        var t = v;
        if (u.test(v)) {
            t = v.replace(u, "")
        }
        return t
    };
    var n = function (u) {
        var t = q(u, "tp");
        t = q(t, "tc");
        t = q(t, "tce");
        return t
    };
    var s = function (E, w) {
        var z = window.user_browse_history;
        var t = n(document.location.href);
        var y = -1;
        if (z && z.data && z.data.length > 0) {
            if (E == "url") {
                if (w) {
                    for (var B = z.index - 1; B >= 0; B--) {
                        var u = d(n(z.data[B]));
                        if (u && w == u) {
                            y = B - z.index;
                            break
                        }
                    }
                } else {
                    var D = d(n(t));
                    var C = false;
                    for (var B = z.index - 1; B >= 0; B--) {
                        var u = d(n(z.data[B]));
                        if (u && D != u) {
                            y = B - z.index;
                            C = true;
                            break
                        }
                    }
                    if (!C) {
                        if (window.history.length > z.data.length) {
                            y = 0 - (z.index + 1)
                        }
                    }
                }
            } else {
                if (E == "path") {
                    if (w) {
                        for (var B = z.index - 1; B >= 0; B--) {
                            var u = n(z.data[B]);
                            if (u) {
                                var A = r(u);
                                if (A.path == w) {
                                    y = B - z.index;
                                    break
                                }
                            }
                        }
                    } else {
                        var v = r(t).path;
                        var C = false;
                        for (var B = z.index - 1; B >= 0; B--) {
                            var u = n(z.data[B]);
                            if (u) {
                                var A = r(u);
                                if (A.path != v) {
                                    y = B - z.index;
                                    C = true;
                                    break
                                }
                            }
                        }
                        if (!C) {
                            if (window.history.length > z.data.length) {
                                y = 0 - (z.index + 1)
                            }
                        }
                    }
                } else {
                    if (E == "domain") {
                        if (w) {
                            for (var B = z.index - 1; B >= 0; B--) {
                                var u = n(z.data[B]);
                                if (u) {
                                    var A = r(u);
                                    if (A.domain == w) {
                                        y = B - z.index;
                                        break
                                    }
                                }
                            }
                        } else {
                            var x = r(t).domain;
                            var C = false;
                            for (var B = z.index - 1; B >= 0; B--) {
                                var u = n(z.data[B]);
                                if (u) {
                                    var A = r(u);
                                    if (A.domain != x) {
                                        y = B - z.index;
                                        C = true;
                                        break
                                    }
                                }
                            }
                            if (!C) {
                                if (window.history.length > z.data.length) {
                                    y = 0 - (z.index + 1)
                                }
                            }
                        }
                    } else {
                        if (w) {
                            for (var B = z.index - 1; B >= 0; B--) {
                                var u = n(z.data[B]);
                                if (u && w == u) {
                                    y = B - z.index;
                                    break
                                }
                            }
                        } else {
                            y = -1
                        }
                    }
                }
            }
        }
        return y
    };
    var h = function (u, v) {
        var y = window.user_browse_history != null ? window.user_browse_history : {
            data: [],
            index: -1,
            timestamp: 0
        };
        var w = document.location.href;
        if (!u) {
            return
        }
        if (u == 1) {
            if (y.data && y.data.length > 0) {
                var x = y.data[y.index];
                if (x == w) {
                    return
                }
            }
            if (y.data && y.data.length > 0 && y.index > -1) {
                if (y.data.length - 1 >= y.index + 1) {
                    y.data.splice(y.index + 1)
                }
            }
            y.data.push(w);
            y.index = y.index + 1
        } else {
            if (u == 2) {
                y = {
                    data: [],
                    index: -1
                };
                y.data.push(w);
                y.index = y.index + 1
            } else {
                if (u == 3) {
                    if (y.index != -1) {
                        y.index = y.index - 1
                    }
                } else {
                    if (u == 4) {
                        if (y.index != -1) {
                            y.index = y.index + 1
                        }
                    } else {
                        if (u == 5) {
                            if (v != -1) {
                                y.index = v
                            }
                        }
                    }
                }
            }
        }
        var t = y.data.length - o.maxSize;
        if (t > 0 && y.index >= t) {
            y.data.splice(0, t);
            y.index = y.index - t
        }
        y.timestamp = new Date().getTime();
        y.historyLength = window.history.length;
        l(y, function () {
            window.user_browse_history = y
        })
    };
    var j = function (x) {
        var y = document.location.href;
        var t = 0;
        var u = -1;
        if (x && x.data && x.data.length > 0 && x.index > -1) {
            var z = x.data[x.index - 1];
            var A = x.data[x.index + 1];
            if (y == z) {
                t = 3
            } else {
                if (y == A) {
                    t = 4
                } else {
                    t = 5;
                    for (var w = x.index - 1; w >= 0; w--) {
                        var v = x.data[w];
                        if (v == y) {
                            u = w;
                            break
                        }
                    }
                    if (u == -1) {
                        for (var w = x.index; w < x.data.length; w++) {
                            var v = x.data[w];
                            if (v == y) {
                                u = w;
                                break
                            }
                        }
                    }
                    if (u == -1) {
                        t = 2
                    }
                }
            }
        } else {
            t = 2
        }
        return {
            flag: t,
            curIndex: u
        }
    };
    k.saveURL = function () {
        var u = document.referrer;
        var t = document.location.href;
        if (window.user_browse_history) {
            return
        }
        b(function (w) {
            window.user_browse_history = w;
            var v = 0;
            var x = -1;
            if (!w || !w.data || w.data.length == 0) {
                v = 2;
                h(v);
                return
            }
            var z = window.performance.navigation.type;
            if (z == 0) {
                if (w && w.data && w.data.length > 0) {
                    var y = w.data[w.index];
                    if (u == "") {
                        if (window.history.length - 1 > w.historyLength) {
                            v = 2
                        } else {
                            v = 1
                        }
                    } else {
                        if (u == y || u == d(y)) {
                            v = 1
                        } else {
                            v = 2
                        }
                    }
                } else {
                    v = 2
                }
            } else {
                if (z == 1) {
                    v = 0;
                    if (w && w.data && w.data.length > 0) {
                        var y = w.data[w.index];
                        if (y != t) {
                            v = 2
                        }
                    } else {
                        v = 2
                    }
                } else {
                    if (z == 2) {
                        var A = j(w);
                        v = A.flag;
                        x = A.curIndex
                    } else {
                        v = 1
                    }
                }
            }
            if (v) {
                h(v, x)
            }
        })
    };
    k.saveAnchor = function () {
        var t = window.history.length;
        var u = window.history.state;
        window.onpopstate = function (x) {
            var A = x || window.event;
            var y = document.location.href;
            var v = 0;
            var B = -1;
            var z = function (E) {
                if (!E || !E.data || E.data.length == 0) {
                    v = 2;
                    h(v);
                    return
                }
                if (E.data && E.data.length > 0) {
                    var C = E.data[E.index];
                    if (C == y) {
                        return
                    }
                }
                if (E && E.data && E.data.length > 0 && E.index > -1) {
                    var C = E.data[E.index];
                    if (d(y) != d(C)) {
                        var F = j(E);
                        v = F.flag;
                        B = F.curIndex;
                        h(v, B);
                        return
                    }
                }
                if (t == window.history.length) {
                    var D = window.history.state;
                    if (D == null && u != null) {
                        v = 3
                    } else {
                        if (D != null && u != null) {
                            if (D.timestamp <= u.timestamp) {
                                v = 3
                            } else {
                                v = 4
                            }
                        } else {
                            if (D != null && u == null) {
                                v = 4
                            } else {
                                v = 0
                            }
                        }
                    }
                } else {
                    var G = new Date().getTime();
                    window.history.replaceState({
                        timestamp: G
                    }, "", document.location.hash);
                    v = 1
                }
                t = window.history.length;
                u = window.history.state;
                if (v) {
                    h(v, B)
                }
            };
            var w = window.user_browse_history;
            if (w) {
                z(w)
            } else {
                b(z)
            }
        }
    };
    k.goBack = function (v, u) {
        var t = v ? v : o.type;
        var w = s(t, u);
        window.history.go(w)
    };
    k.isHTML5 = function () {
        if (window.performance && window.history.replaceState && window.sessionStorage && window.postMessage) {
            return true
        }
        return false
    };
    k.isSafari = function () {
        var v = window.navigator.userAgent.toLowerCase();
        var w = /safari/i;
        var u = /chrome/i;
        var t = /Android/i;
        if (w.test(v) && !u.test(v) && !t.test(v)) {
            return true
        }
        return false
    };
    g.saveURL = function () {
        if (a.app.url.isHTML5() && !a.app.url.isSafari()) {
            a.app.url.saveURL();
            a.app.url.saveAnchor()
        }
    };
    g.init = function (t) {
        if (t) {
            o = $.extend(o, t)
        }
        if (!o.enable) {
            return
        }
        if (a.app.url.isHTML5() && !a.app.url.isSafari()) {
            $("#topIconBack").attr("href", "javascript:void(0);");
            $("#topIconBack").off().on("click", function () {
                a.app.url.goBack()
            })
        }
    };
    return g
});
var backtopTimer;
$(window).on("scroll", function () {
    var e = $(this);
    var f = e.scrollTop();
    var d = e.height();
    if (f > d) {
        clearTimeout(backtopTimer);
        $(".touchweb_com-backTop").addClass("show");
        backtopTimer = setTimeout(function () {
            $(".touchweb_com-backTop").removeClass("show")
        }, 3000)
    } else {
        $(".touchweb_com-backTop").removeClass("show")
    }
});
define("biz_newUserPopup", ["tracker_ref_yhd.global_spm", "common_yhd.storage"], function (l, n) {
    var m = {};
    var a = window.loli || (window.loli = {});
    var j = a.app = a.app || {};
    var o = a.app.user = a.app.user || {};
    var k = a.yhdStore;
    var d = a.yhdSessionStore;
    var c = (typeof popupNewUserFlag != "undefined" && popupNewUserFlag == "1") ? 1 : 0;
    var q = $.fn.cookie("provinceId") || 1;
    var i = $.fn.cookie("cityId") || "";
    var g = $.fn.cookie("yihaodian_uid") || "";
    var s = $.fn.cookie("guid");
    var b = $.fn.cookie("unionKey") || "";
    var r = (typeof r == "undefined") ? 1 : r;
    var t = 3;
    var e = "MOBIHOME_H5_DC_TP";
    var u = function () {
        var x = "//gemini.yhd.com/libraService/exactNewCrowdAdServe?callback=?";
        var w = function (y) {
            var z = h(y);
            if (z != "") {
                if ($("#globalPopupAppDownload").size() > 0) {
                    return
                }
                $("body").append(z);
                d.setFromRoot("newUserPopupFlag", "1");
                f()
            }
        };
        var v = {
            mcSiteId: r,
            provinceId: q,
            cityId: i,
            userId: g,
            guId: s,
            platformId: t,
            trackerU: b,
            codes: e
        };
        if (i == "") {
            $.ajax({
                type: "GET",
                url: "//m.yhd.com/mobile/homePage/getProvinceAndCityId.do",
                dataType: "jsonp",
                success: function (y) {
                    if (y) {
                        if (y.ipProvinceId == q) {
                            v.provinceId = y.ipProvinceId;
                            v.cityId = y.ipCityId;
                            $.fn.cookie("cityId", y.ipCityId, {
                                domain: ".yhd.com",
                                path: "/",
                                expires: 30
                            })
                        }
                        $.getJSON(x, v, function (z) {
                            if (z && z.status == 1 && z.value && z.value.sourceList) {
                                w(z.value.sourceList)
                            }
                        })
                    }
                }
            })
        } else {
            $.getJSON(x, v, function (y) {
                if (y && y.status == 1 && y.value && y.value.sourceList) {
                    w(y.value.sourceList)
                }
            })
        }
    };
    var h = function (v) {
        var w = [];
        if (v.length > 0) {
            var x = v[0];
            if (x && x.imageUrl) {
                if (x.imageUrl.substring(x.imageUrl.lastIndexOf(".") + 1).toLowerCase() == "png") {
                    w.push("<div class='global_banner_mask' id='newUserPopup'>");
                    w.push("<a data-tpa='H5_GLOBAL_HEADER_USERPOPUP' href='" + x.linkUrl + "' title='" + x.displayTitle + "' data-ref='" + x.ref + "' data-tc='" + x.tc + "'>");
                    w.push("<img src='" + x.imageUrl + "'>");
                    w.push("</a>");
                    w.push("<span class='global_banner_mask-btn_close'></span>");
                    w.push("</div>")
                }
            }
        }
        return w.join("")
    };
    var f = function () {
        $("#newUserPopup").find("span").click(function () {
            $("#newUserPopup").hide()
        })
    };
    var p = function (v) {
        var w = v ||
        function () {};
        d.getFromRoot("newUserPopupFlag", function (x) {
            if (x && x.status == 1) {
                if ("1" == x.value) {
                    w(0)
                } else {
                    if (g == "") {
                        w(1);
                        return
                    }
                    k.getFromRoot("top_prism_order_num_" + g, function (z) {
                        if (z && z.status == 1) {
                            var y = (z.value && !isNaN(z.value)) ? parseInt(z.value) : 0;
                            if (y > 0) {
                                w(0)
                            } else {
                                w(1)
                            }
                        }
                    })
                }
            }
        })
    };
    o.popupNewUserWin = function () {
        if (c) {
            p(function (v) {
                if (v) {
                    if ($("body").data("newUserPopupFlag")) {
                        $("#newUserPopup").show();
                        return
                    }
                    $("body").data("newUserPopupFlag", 1);
                    u()
                }
            })
        }
    };
    o.checkFlag = function (v) {
        p(v)
    };
    m.init = function () {
        o.popupNewUserWin()
    };
    return m
});
(function (x) {
    var D = "deeplink",
        u = "guid",
        w = "tracker_msessionid";
    var C = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    function E(a) {
            var b = location.href;
            if (b && b.indexOf("#") > 0) {
                b = b.substring(0, b.indexOf("#"))
            }
            var c = new RegExp("(^|\\?|&)" + a + "=([^&]*)(\\s|&|$)", "i");
            if (c.test(b)) {
                return unescape(RegExp.$2.replace(/\+/g, " "))
            } else {
                return ""
            }
        }
    function r(a) {
            var b = "";
            for (var c = 0; c < a; c++) {
                var d = Math.floor(Math.random() * 32);
                b += C[d]
            }
            return b
        }
    var q = {
            getCookie: function (c, a) {
                var b = new RegExp(a ? c + "=(?:.*?&)*?" + a + "=([^&;$]*)" : c + "=([^;$]*)", "i");
                return b.test(unescape(document.cookie)) ? RegExp.$1 : ""
            },
            setCookie: function (a, d, b) {
                var e = b || 30;
                var c = new Date();
                c.setTime(c.getTime() + e * 60 * 1000);
                document.cookie = a + "=" + d + ";expires=" + c.toGMTString() + ";domain=.yhd.com;path=/;"
            }
        };
    var v = x.document,
        y = x.sys || {},
        z = "http://a.app.qq.com/o/simple.jsp?pkgname=com.thestore.main&g_f=992180",
        F = "https://itunes.apple.com/cn/app/1hao-dian-wo-jia-quan-qiu/id427457043?mt=8",
        s = "//m.yhd.com/downloads/TheStoreApp.apk";
    _userAgent = x.navigator.userAgent.toLowerCase();
    if ((_userAgent.indexOf("iphone") > -1 || _userAgent.indexOf("pod") > -1 || _userAgent.indexOf("pad") > -1 || _userAgent.indexOf("mac") > -1 || _userAgent.indexOf("ios") > -1)) {
            y.isIphone = true
        } else {
            if (_userAgent.indexOf("android") > -1 || _userAgent.indexOf("kindle") > -1 || _userAgent.indexOf("linux") > -1 || _userAgent.indexOf("bb10") > -1) {
                y.isAndroid = true
            }
        }
    if (_userAgent.indexOf("micromessenger") > -1) {
            y.isWeixin = true
        }
    x.sys = y;

    function B(b) {
            if (y.isIphone) {
                window.location = b
            } else {
                var a = v.createElement("iframe");
                a.id = "callapp_iframe_" + new Date().getTime(),
                a.src = b;
                a.style.display = "none";
                v.body.appendChild(a);
                setTimeout(function () {
                    v.body.removeChild(a)
                }, 1000)
            }
        }
    function t(a) {
            var b = a.flag;
            var c = a.tracker_u || "";
            setTimeout(function () {
                if (y.isWeixin) {
                    window.location = z
                } else {
                    if (y.isIphone) {
                        window.location = F
                    } else {
                        if (y.isAndroid) {
                            if (b) {
                                window.location = "//m.yhd.com/downloads/" + b + "/TheStoreApp.apk"
                            } else {
                                window.location = s + "?tracker_u=" + c
                            }
                        } else {
                            if (b) {
                                window.location = "//m.yhd.com/mw/d?flag" + b
                            } else {
                                window.location = "//m.yhd.com/mw/d?flag=" + c + "&tracker_u=" + c
                            }
                        }
                    }
                }
            }, 10)
        }
    var A = x.libs || {};
    A.downloadAppByGlobal = function (a) {
            if (!a) {
                return
            }
            t(a)
        };
    A.openDownloadApp = function (a) {
            if (!a || !a.url) {
                return
            }
            require(["util_yhd.url"], function (b) {
                var c = q.getCookie(u, "");
                if (!c) {
                    c = r(36);
                    q.setCookie(u, c, 10 * 365 * 24 * 60)
                }
                var e = q.getCookie(w, "");
                if (!e) {
                    e = r(32);
                    q.setCookie(w, e, 30)
                }
                var f = {};
                f.b_cpt = D;
                f.guid = c;
                f.sessionId = e;
                var d = b.appendAppParams(a.url, f);
                B(d)
            });
            setTimeout(function () {
                if (a.redirectUrl) {
                    window.location = a.redirectUrl
                } else {
                    var b = E("tracker_u");
                    if (b) {
                        a.tracker_u = b
                    }
                    t(a)
                }
            }, 2000)
        };
    A.isJson = function (a) {
            var b = typeof(a) == "object" && Object.prototype.toString.call(a).toLowerCase() == "[object object]" && !a.length;
            return b
        };
    x.libs = A
})(window);
$(function () {
    if (typeof showGlobalHeadAppDownNotice != "undefined" && showGlobalHeadAppDownNotice && showGlobalHeadAppDownNotice != "false") {
        var a = $.fn.cookie("unionKey");
        require(["common_yhd.storage", "util_yhd.url", "tracker_ref_yhd.global_spm"], function (e, d, c) {
            try {
                loli.yhdSessionStore.getFromRoot("appDownNoticeCloseFlag", function (r) {
                    var h = (r && r.value) ? r.value : "";
                    if (!h && (a || showGlobalHeadAppDownNotice == "true")) {
                        var q = {};
                        q.tracker_u = a;
                        q.openSource = a;
                        var p = showGlobalHeadAppDownNotice.split(",");
                        var l = p.length;
                        var m = false;
                        if (showGlobalHeadAppDownNotice != "true") {
                            for (var g = 0; g < l; g++) {
                                var f = p[g];
                                if (f == a) {
                                    m = true;
                                    break
                                }
                            }
                        } else {
                            m = true
                        }
                        if (m) {
                            var k = $.fn.cookie("websiteid");
                            var j = $.fn.cookie("uid");
                            if (k) {
                                q.websiteId = k
                            }
                            if (j) {
                                q.uid = j
                            }
                            var o = $("meta[name='android']").attr("content");
                            if (o) {
                                var n = $("#txtAppDownNotice").val();
                                $("#txtAppDownNotice").replaceWith(n);
                                $("#div_globalHeadAppDown").show();
                                $("body").on("click", "#appdown-icon-close", function () {
                                    $("#div_globalHeadAppDown").remove();
                                    loli.yhdSessionStore.setFromRoot("appDownNoticeCloseFlag", 1)
                                });
                                $("body").on("click", "#openAppId", function () {
                                    var i = c.getData($("#openAppId"), "a");
                                    if (i) {
                                        q.tp = i.tp;
                                        q.tc = i.tc
                                    }
                                    var s = d.appendAppParams(o, q);
                                    var t = {
                                        url: s,
                                        redirectUrl: "//m.yhd.com/downloadApp.html?flag=672681131&tp=" + q.tp + "&tc=" + q.tc
                                    };
                                    libs.openDownloadApp(t)
                                })
                            }
                        }
                    }
                })
            } catch (b) {}
        })
    }
});