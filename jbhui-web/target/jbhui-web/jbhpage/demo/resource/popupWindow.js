define("common_popupWindow", function () {
    var b = {};
    b.insertStyle = function (a) {
        var d = document.createElement("link");
        d.rel = "stylesheet";
        d.href = a;
        document.head.appendChild(d)
    };
    b.getLocationPopup = function (p, o) {
        if (!p) {
            return
        }
        b.insertStyle(p);
        var o = o || {
            title: "默认标题",
            closeBtn: false,
            content: "描述文字。。。",
            btnHighlight: {
                text: "确定",
                url: "//www.yhd.com"
            },
            btnGeneral: {
                text: "取消",
                url: "//www.yhd.com"
            }
        };
        if (o.closeBtn) {
            var l = '<b class="close"></b>'
        } else {
            var l = ""
        }
        if (o.hasOwnProperty("btnHighlight")) {
            var q = '<a href="' + o.btnHighlight.url + '" class="btn_public btn_highlight">' + o.btnHighlight.text + "</a>"
        } else {
            var q = ""
        }
        if (o.hasOwnProperty("btnGeneral")) {
            var r = '<a href="' + o.btnGeneral.url + '" class="btn_public btn_general">' + o.btnGeneral.text + "</a>"
        } else {
            var r = ""
        }
        var m = '<div class="m_popup_wrap"><div class="m_popup_box"><div class="title">' + o.title + l + '</div><div class="text"><p>' + o.content + '</p></div><div class="btn_box">' + r + q + "</div></div></div>";
        var n = document.createElement("div");
        n.id = "popupTipsLocation";
        n.innerHTML = m;
        document.body.appendChild(n);
        var k = n.querySelector(".close");
        k.addEventListener("click", function () {
            b.closePopup()
        }, false);
        var a = n.querySelector(".m_popup_wrap");
        a.addEventListener("click", function (c) {
            if (c.target === document.querySelector(".m_popup_wrap")) {
                b.closePopup()
            } else {
                c.stopPropagation()
            }
        }, false)
    };
    b.closePopup = function () {
        var a = document.querySelector("#popupTipsLocation");
        a.parentNode.removeChild(a)
    };
    return b
});