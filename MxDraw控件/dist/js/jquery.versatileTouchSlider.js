(function (e) {
    e.versatileTouchSlider = function (t, n) {
        function q() {
            k.css({opacity: 0});
            var n = "";
            for (var r = 0; r < k.length; r++) {
                var i = k.eq(r);
                var s = k.eq(r).children(".link");
                i.stop().delay(140 * r).animate({opacity: 1}, {duration: 500});
                s.stop().delay(240 * r).animate({opacity: .8}, {duration: 1e3});
                s.mouseover(function (n) {
                    e(this).fadeTo("fast", .5);
                    if (D) {
                        var r = e(this).attr("title");
                        if (r != undefined) {
                            e(t).append('<div class="sti_tooltip">' + r + "</div>");
                            e(".sti_tooltip").css({
                                top: e(this).offset().top - e(".sti_tooltip").height() - e(this).height() + 7,
                                left: e(this).offset().left - e(".sti_tooltip").width() / 2 + 4,
                                opacity: 0
                            });
                            e(".sti_tooltip").stop().animate({opacity: .9}, {duration: 500})
                        }
                    }
                }).mouseout(function () {
                    e(this).fadeTo("fast", .8);
                    if (D) {
                        e(".sti_tooltip").remove()
                    }
                });
                var o = i.children("img").height();
                i.height(o);
                var u = i.children("img").width();
                i.width(u);
                s.css({bottom: o / 2 - 16, left: u / 2 - 16});
                if (e.browser.opera) {
                    i.css({"margin-bottom": -6})
                }
                var a = i.attr("data-effects");
                if (a == "true" || a == undefined) {
                    var f = e(t).attr("id") + "_shd_" + r;
                    var l = e(t).attr("id") + "_leftside_" + r;
                    n += '<img class="fx_shadow" id="' + f + '" src="img/fx_shadow.png">';
                    n += '<img class="fx_leftside" id="' + l + '" src="img/fx_leftside.png">';
                    i.append(n);
                    n = "";
                    if (o != null) {
                        e("#" + f).height(parseInt(o));
                        e("#" + l).height(parseInt(o))
                    }
                }
                if (m == "image_gallery") {
                    i.addClass("sti_thumb_gallery");
                    var c = parseInt(i.children("img").css("border-left-width"));
                    var h = parseInt(i.children("img").css("padding-left"));
                    var p = h * 2 + c;
                    i.children(".ribbon").css({top: -p - 6, right: -p - 6});
                    s.css({bottom: o / 2 - 16 + h + c, left: u / 2 - 16 + h + c})
                }
            }
        }

        function z() {
            e("#" + R).css({top: (b.height() - e("#" + R).height()) / 2});
            e("#" + U).css({top: (b.height() - e("#" + U).height()) / 2})
        }

        function G() {
            if (p == "left") {
                T.css({"float": "left"})
            } else if (p == "right") {
                T.css({"float": "right"})
            } else {
                T.css({left: (b.width() - T.width()) / 2})
            }
        }

        function Z(t, n, r, o) {
            if (n == "move" && (r == "left" || r == "right" || r == "up" || r == "down")) {
                A = true;
                if (e(".sti_tooltip").length > 0)e(".sti_tooltip").remove();
                if (y == "vertical" && (r == "left" || r == "right"))return false;
                if (y == "horizontal" && (r == "up" || r == "down"))return false;
                var f = 0;
                if (y == "vertical") {
                    var l = -L;
                    C.css({top: -l, position: "absolute"})
                } else {
                    var c = -L;
                    C.css({left: -c, position: "absolute"})
                }
                if (r == "left") {
                    it(i * u + o, f)
                } else if (r == "right") {
                    it(i * u - o, f)
                } else if (r == "up") {
                    it(s * u + o, f)
                } else if (r == "down") {
                    it(s * u - o, f)
                }
            } else if (n == "cancel") {
                setTimeout(function () {
                    A = false
                }, 50);
                if (y == "vertical") {
                    if (!_) {
                        setTimeout(function () {
                            C.stop().animate({top: L}, {duration: a / 2.5})
                        }, 10)
                    }
                    it(s * u, a)
                } else {
                    if (!_) {
                        setTimeout(function () {
                            C.stop().animate({left: L}, {duration: a / 2.5})
                        }, 10)
                    }
                    it(i * u, a)
                }
            } else if (n == "end") {
                setTimeout(function () {
                    A = false
                }, 50);
                ht();
                if (!_) {
                    if (y == "vertical") {
                        setTimeout(function () {
                            C.stop().animate({top: L}, {duration: a})
                        }, 10)
                    } else {
                        setTimeout(function () {
                            C.stop().animate({left: L}, {duration: a})
                        }, 10)
                    }
                }
                if (y == "vertical") {
                    if (r == "down") {
                        et(A)
                    } else if (r == "up") {
                        tt(A)
                    }
                } else {
                    if (r == "right") {
                        et(A)
                    } else if (r == "left") {
                        tt(A)
                    }
                }
            }
        }

        function et(e) {
            u = Math.max(u - 1, 0);
            console.log(e);
            if (y == "vertical") {
                it(s * u, a);
                if (!_ && !e) {
                    C.css({position: "absolute"});
                    setTimeout(function () {
                        C.stop().animate({top: L}, {duration: a})
                    }, 10)
                }
            } else {
                it(i * u, a);
                if (!_ && !e) {
                    C.css({position: "absolute"});
                    setTimeout(function () {
                        C.stop().animate({left: L}, {duration: a})
                    }, 10)
                }
            }
            setTimeout(function () {
                r.onScrollEvent.call(this, u)
            }, a);
            rt(u)
        }

        function tt(e) {
            u = Math.min(u + 1, E - 1);
            if (y == "vertical") {
                it(s * u, a);
                if (!_ && !e) {
                    C.css({position: "absolute"});
                    setTimeout(function () {
                        C.stop().animate({top: L}, {duration: a})
                    }, 10)
                }
            } else {
                it(i * u, a);
                if (!_ && !e) {
                    C.css({position: "absolute"});
                    setTimeout(function () {
                        C.stop().animate({left: L}, {duration: a})
                    }, 10)
                }
            }
            setTimeout(function () {
                r.onScrollEvent.call(this, u)
            }, a);
            rt(u)
        }

        function nt(e, t) {
            u = e;
            if (y == "vertical") {
                it(s * u, a);
                if (!_ && !t) {
                    C.css({position: "absolute"});
                    setTimeout(function () {
                        C.stop().animate({top: L}, {duration: a})
                    }, 10)
                }
            } else {
                it(i * u, a);
                if (!_ && !t) {
                    C.css({position: "absolute"});
                    setTimeout(function () {
                        C.stop().animate({left: L}, {duration: a})
                    }, 10)
                }
            }
            setTimeout(function () {
                r.onScrollEvent.call(this, u)
            }, a);
            rt(u)
        }

        function rt(n) {
            if (g == "numbers") {
                S.children("a").removeClass("active");
                S.children("a").eq(n).addClass("active")
            } else if (g == "bullets") {
                S.children("a").removeClass("bullets_page_active").addClass("bullets_page");
                S.children("a").eq(n).addClass("bullets_page_active")
            } else if (g == "thumbnails") {
                S.children("a").removeClass("thumbnails_page_active").addClass("thumbnails_page");
                S.children("a").eq(n).addClass("thumbnails_page_active")
            }
            if (n == E - 1) {
                e(t + " .sti_next").css({opacity: .3})
            } else {
                e(t + " .sti_next").css({opacity: .8})
            }
            if (n == 0) {
                e(t + " .sti_previous").css({opacity: .3})
            } else {
                e(t + " .sti_previous").css({opacity: .8})
            }
        }

        function it(t, n) {
            if (e(".sti_tooltip").length > 0)e(".sti_tooltip").remove();
            b.stop().animate({height: P[u]}, {duration: 400});
            if (_) {
                C.css({
                    "-webkit-transition-duration": (n / 1e3).toFixed(1) + "s",
                    "-moz-transition-duration": (n / 1e3).toFixed(1) + "s",
                    "-o-transition-duration": (n / 1e3).toFixed(1) + "s",
                    "-ms-transition-duration": (n / 1e3).toFixed(1) + "s",
                    "transition-duration": (n / 1e3).toFixed(1) + "s"
                });
                var r = (t < 0 ? "" : "-") + Math.abs(t).toString();
                if (y == "vertical") {
                    if (e.browser.msie || e.browser.opera) {
                        C.css({
                            "-webkit-transform": "translate(0px," + r + "px)",
                            "-moz-transform": "translate(0px," + r + "px)",
                            "-o-transform": "translate(0px," + r + "px)",
                            "-ms-transform": "translate(0px," + r + "px)",
                            transform: "translate(0px," + r + "px)"
                        })
                    } else {
                        C.css({
                            "-webkit-transform": "translate3d(0px," + r + "px,0px)",
                            "-moz-transform": "translate3d(0px," + r + "px,0px)",
                            "-o-transform": "translate3d(0px," + r + "px,0px)",
                            "-ms-transform": "translate3d(0px," + r + "px,0px)",
                            transform: "translate3d(0px," + r + "px,0px)"
                        })
                    }
                } else {
                    if (e.browser.msie || e.browser.opera) {
                        C.css({
                            "-webkit-transform": "translate(" + r + "px,0px)",
                            "-moz-transform": "translate(" + r + "px,0px)",
                            "-o-transform": "translate(" + r + "px,0px)",
                            "-ms-transform": "translate(" + r + "px,0px)",
                            transform: "translate(" + r + "px,0px)"
                        })
                    } else {
                        C.css({
                            "-webkit-transform": "translate3d(" + r + "px,0px,0px)",
                            "-moz-transform": "translate3d(" + r + "px,0px,0px)",
                            "-o-transform": "translate3d(" + r + "px,0px,0px)",
                            "-ms-transform": "translate3d(" + r + "px,0px,0px)",
                            transform: "translate3d(" + r + "px,0px,0px)"
                        })
                    }
                }
            } else {
                L = (t < 0 ? "" : "-") + Math.abs(t).toString()
            }
        }

        function st() {
            N.show()
        }

        function ot(e) {
            N.children("a").removeClass("active");
            N.children("a").eq(e).addClass("active")
        }

        function ut() {
            if (d == "left") {
                N.css({"float": "left"})
            } else if (d == "right") {
                N.css({"float": "right"})
            } else {
                N.css({left: (b.width() - N.width()) / 2})
            }
        }

        function ct() {
            function e() {
                if (u >= E - 1) {
                    if (ft > 0 && lt < ft) {
                        if (lt == ft - 1)lt = -1;
                        var e = N.children("a").eq(lt + 1);
                        var t = e.attr("data-url");
                        clearInterval(at);
                        N.children("a").off("click");
                        r.ajaxEvent.call(undefined, t, f);
                        ot(lt + 1);
                        lt++
                    } else {
                        nt(0)
                    }
                } else {
                    tt()
                }
            }

            f = true;
            at = setInterval(e, l)
        }

        function ht() {
            clearInterval(at);
            f = false;
            if (c) {
                W.show();
                X.hide()
            }
        }

        function vt() {
            if (m == "image_banner") {
                for (var n = 0; n < w.length; n++) {
                    var r = w.eq(n);
                    P[n] = r.height()
                }
                if (y == "vertical")s = P[0];
                nt(u)
            }
            if (m == "image_text") {
                for (var n = 0; n < w.length; n++) {
                    var r = w.eq(n);
                    P[n] = r.height()
                }
                if (y == "vertical") {
                    s = P[0]
                }
                nt(u)
            }
            if (m == "image_gallery") {
                e(t).find(".sti_clear").remove();
                for (var n = 0; n < w.length; n++) {
                    var r = w.eq(n);
                    var i = r.find(k).length;
                    for (var o = 0; o < i; o++) {
                        var a = r.find(k).eq(o);
                        var f = r.find(k).eq(0);
                        var l = parseInt(a.position().left) + a.width() + parseInt(a.css("margin-left"), 10) + 11;
                        var c = parseInt(f.position().left) + f.width() + parseInt(f.css("margin-left"), 10) + 11;
                        if (l > b.width() || l == c) {
                            e(a).before('<div class="sti_clear"></div>')
                        }
                    }
                    b.height(r.height());
                    P[n] = r.height();
                    nt(u)
                }
                if (y == "vertical")s = P[0]
            }
            if (m == "image_shelf") {
                e(t).find(".sti_shelf_divider").remove();
                for (var n = 0; n < w.length; n++) {
                    var r = w.eq(n);
                    var i = r.find(k).length;
                    for (var o = 0; o < i; o++) {
                        var a = r.find(k).eq(o);
                        var f = r.find(k).eq(0);
                        var l = parseInt(a.position().left) + a.width() + parseInt(a.css("margin-left"), 10) + 0;
                        var c = parseInt(f.position().left) + f.width() + parseInt(f.css("margin-left"), 10) + 0;
                        if (l > b.width() || l == c) {
                            e(a).before('<div class="sti_shelf_divider"></div>')
                        }
                    }
                    b.height(r.height());
                    P[n] = r.height();
                    nt(u)
                }
                if (y == "vertical")s = P[0]
            }
            e("#mask_lightbox").width(e(window).width());
            e("#mask_lightbox").height(e(document).height())
        }

        var r = {
            slideWidth: 550,
            slideHeight: 208,
            showPreviousNext: true,
            currentSlide: 0,
            scrollSpeed: 500,
            autoSlide: false,
            autoSlideDelay: 5e3,
            showPlayPause: true,
            showPagination: true,
            alignPagination: "left",
            alignMenu: "left",
            swipeDrag: true,
            sliderType: "image_shelf",
            pageStyle: "numbers",
            orientation: "horizontal",
            onScrollEvent: function () {
            },
            ajaxEvent: function () {
            }
        };
        if (n) {
            e.extend(r, n)
        }
        var i = r.slideWidth, s = r.slideHeight, o = r.showPreviousNext, u = r.currentSlide, a = r.scrollSpeed, f = r.autoSlide, l = r.autoSlideDelay, c = r.showPlayPause, h = r.showPagination, p = r.alignPagination, d = r.alignMenu, v = r.swipeDrag, m = r.sliderType, g = r.pageStyle, y = r.orientation;
        var b = e(t + " .sti_slider"), w = e(t + " .sti_slide"), E = w.length, S = e(t + " .sti_page"), x = e(t + " .sti_control"), T = e(t + " .sti_paginate"), N = e(t + " .sti_menu"), C = e(t + " .sti_items"), k = e(t + " .sti_prod");
        var L = 0;
        var A = false;
        if (e.browser.msie && parseInt(e.browser.version) == 7) {
            var O = true
        }
        if (e.browser.msie && parseInt(e.browser.version) == 8) {
            var M = true
        }
        C.show();
        var _ = supportsTransitions();
        var D = "ontouchstart" in window;
        if (i == "100%") {
            i = e(t).parent().width()
        }
        e(t).width(i);
        b.width(i);
        w.width(i);
        if (s != "auto") {
            b.height(s)
        }
        w.height(s);
        if (y == "vertical") {
            w.css({"float": "none"});
            C.css({width: i})
        }
        if (E > 0) {
            var P = Array();
            if (m == "image_shelf") {
                b.css({background: "#000 url(img/texture_01_dark.jpg)"})
            }
            if (m == "image_banner") {
                w.css({background: "none"})
            }
            if (m == "image_gallery") {
                w.css({background: "none"});
                b.css({background: "#fff"})
            }
            setTimeout(function () {
                r.onScrollEvent.call(this, u)
            }, a);
            w.children("img").css({opacity: 0});
            w.children(".banner_title").hide();
            var H = 0;
            var B = w.eq(H);
            var j;

            function F() {
                function n() {
                    B.imagesLoaded(function (r, i, o) {
                        if (i.height() != null) {
                            e(this).children(".preload_32").remove();
                            e(this).children("img").css({
                                display: "block",
                                opacity: 0
                            }).stop().animate({opacity: 1}, {duration: 400});
                            e(this).children(".banner_title").css({
                                display: "block",
                                opacity: 0
                            }).stop().delay(300).animate({opacity: .8}, {duration: 400});
                            var u;
                            if (m == "image_shelf" || m == "image_text" || m == "image_gallery") {
                                u = this.height();
                                P.push(this.height())
                            } else if (m == "image_banner" && s != "auto") {
                                u = s;
                                P.push(s)
                            } else {
                                u = i.height();
                                P.push(i.height())
                            }
                            if (H == 0) {
                                b.stop().animate({height: u}, {duration: 400});
                                if (e(window).width() < b.width()) {
                                    e(t).trigger("resize")
                                }
                                if (f)ct()
                            }
                            H++;
                            B = w.eq(H);
                            if (I)clearTimeout(I);
                            I = setTimeout(n, 500)
                        }
                    });
                    if (H > E - 1) {
                        clearTimeout(I);
                        e(t + " .preload_32").remove();
                        w.children("img").show()
                    }
                }

                w.append('<div class="preload_32"></div>');
                w.children(".preload_32").css({left: B.width() / 2 - 21, top: B.height() / 2 - 21});
                if (m == "image_banner") {
                    w.children(".preload_32").css({
                        background: "url(img/preload_32.gif) center no-repeat",
                        boxShadow: "none",
                        border: "none"
                    })
                }
                if (m == "image_gallery") {
                    w.children(".preload_32").css({top: 20})
                }
                I = setTimeout(n, 100)
            }

            var I;
            F();
            q()
        } else {
            return false
        }
        if (o) {
            var R = "prev_" + e(t).attr("id");
            var U = "next_" + e(t).attr("id");
            b.append('<div class="sti_previous" id="' + R + '"></div><div class="sti_next" id="' + U + '"></div>');
            rt(u)
        }
        if (v && !D) {
            b.mouseover(function (t) {
                e(this).addClass("grab_cursor");
                e(this).mousedown(function () {
                    e(this).removeClass("grab_cursor").addClass("grabbing_cursor")
                }).mouseup(function () {
                    e(this).removeClass("grabbing_cursor").addClass("grab_cursor")
                })
            }).mouseout(function () {
                e(this).removeClass("grab_cursor")
            })
        }
        var W = e(t + " .sti_control .sti_play");
        var X = e(t + " .sti_control .sti_pause");
        X.hide();
        if (!c) {
            x.hide()
        } else {
            if (f) {
                X.show();
                W.hide()
            } else {
                X.hide();
                W.show()
            }
            x.css("display", "none").fadeTo("slow", 1)
        }
        if (!h) {
            S.hide();
            x.css({border: "none", marginLeft: 0, paddingLeft: 0});
            X.css({margin: 0});
            W.css({margin: 0})
        } else {
            var V = "";
            for (var J = 0; J < E; J++) {
                if (g == "numbers") {
                    var K = J + 1;
                    if (u == J) {
                        V += '<a href="#" class="sti_btn active">' + K + "</a>"
                    } else {
                        V += '<a href="#" class="sti_btn">' + K + "</a>"
                    }
                } else if (g == "bullets") {
                    if (u == J) {
                        V += '<a href="#" class="bullets_page_active"></a>'
                    } else {
                        V += '<a href="#" class="bullets_page"></a>'
                    }
                } else if (g == "thumbnails") {
                    var Q = S.children("img").eq(J).attr("src");
                    if (u == J) {
                        V += '<a href="#" class="thumbnails_page_active">' + '<img src="' + Q + '" alt="">' + "</a>"
                    } else {
                        V += '<a href="#" class="thumbnails_page">' + '<img src="' + Q + '" alt="">' + "</a>"
                    }
                }
            }
            S.children("img").remove();
            S.fadeTo("fast", 0).append(V).fadeTo("normal", 1);
            G()
        }
        var Y = {
            triggerOnTouchEnd: true,
            swipeStatus: Z,
            allowPageScroll: y == "vertical" ? "horizontal" : "vertical",
            fallbackToMouseEvents: v ? true : false,
            threshold: 20
        };
        C.swipe(Y);
        w.on("click", function (e) {
            if (A)return false
        });
        e(t + " .sti_previous").on("click", function (e) {
            e.preventDefault();
            et();
            ht()
        });
        e(t + " .sti_next").on("click", function (e) {
            e.preventDefault();
            tt();
            ht()
        });
        S.children("a").on("click", function (t) {
            t.preventDefault();
            nt(e(this).index());
            ht()
        });
        if (u > 0 && u < E) {
            setTimeout(function () {
                nt(u)
            }, 500)
        }
        W.on("click", function (t) {
            t.preventDefault();
            ct();
            e(this).hide();
            X.show();
            X.css({opacity: 0}).stop().animate({opacity: 1}, {duration: 500})
        });
        X.on("click", function (t) {
            t.preventDefault();
            ht();
            e(this).hide();
            W.show();
            W.css({opacity: 0}).stop().animate({opacity: 1}, {duration: 500})
        });
        N.children("a").on("click", function (t) {
            t.preventDefault();
            if (e(this).index() == lt || f == true && typeof at == "undefined")return false;
            N.children("a").off("click");
            var n = e(this).attr("data-url");
            r.ajaxEvent.call(undefined, n, f);
            ot(e(this).index());
            ht()
        });
        ut();
        var at;
        var ft = N.children("a").length;
        for (var J = 0; J < ft; J++) {
            if (N.children("a").eq(J).hasClass("active")) {
                var lt = J;
                break
            }
        }
        var pt = e(t + " .sti_lightbox");
        var dt;
        pt.on("click", function (n) {
            function f(t) {
                s = e(window).width();
                o = e(window).height();
                a = e(document).height();
                var n = t;
                var r = n.attr("href");
                if (n.attr("data-type") != undefined) {
                    var c = n.attr("data-type")
                }
                if (n.attr("data-poster") != undefined) {
                    var h = n.attr("data-poster")
                } else {
                    h = ""
                }
                if (n.attr("data-size") != undefined) {
                    var p = n.attr("data-size").split("x")
                } else {
                    var p = [640, 360]
                }
                dt = p[0];
                var d = r.indexOf(".jpg") != -1 || r.indexOf(".gif") != -1 || r.indexOf(".png") != -1 || c == "image" ? true : false;
                if (d) {
                    var v = n;
                    if (O || M) {
                        var m = e("<img />").attr("src", r + "?" + (new Date).getTime())
                    } else {
                        var m = e("<img />").attr("src", r)
                    }
                    m.load(function () {
                        var t = this.width;
                        var n = this.height;
                        if (this.width > s) {
                            var r = s - 80;
                            var i = this.width;
                            var o = r / i * 100;
                            this.height = o / 100 * this.height;
                            this.width = r
                        }
                        dt = this.width;
                        l(this.width, this.height, m, v);
                        e(m).hide()
                    })
                } else if (c == "video-youtube") {
                    var g = parseInt(p[0]), y = parseInt(p[1]);
                    if (g > s) {
                        g = s - 80
                    }
                    var b = r.split("?v=");
                    var E = "?autohide=2&autoplay=0&controls=1&disablekb=0&fs=1&hd=0&loop=0&rel=1&showinfo=0&showsearch=1&wmode=transparent&enablejsapi=1";
                    var S = '<iframe class="video_player" width="' + g + '" height="' + y + '" frameborder="0" src="http://www.youtube.com/embed/' + b[1] + E + '"></iframe>';
                    l(g, y, S, n)
                } else if (c == "video-vimeo") {
                    var g = parseInt(p[0]), y = parseInt(p[1]);
                    if (g > s) {
                        g = s - 80
                    }
                    var b = r.split("/").pop();
                    var S = '<iframe class="video_player" src="http://player.vimeo.com/video/' + b + '?title=0&byline=0&portrait=0&autoplay=0" width="' + g + '" height="' + y + '" frameborder="0"></iframe>';
                    l(g, y, S, n)
                } else if (c == "html-content") {
                    var g = parseInt(p[0]), y = parseInt(p[1]);
                    if (g > s) {
                        g = s - 80
                    }
                    var S = '<iframe id="html_content_lightbox" src="' + r + '" width="' + g + '" height="' + y + '" frameborder="0"><div id="preload_lightbox"></div></iframe>';
                    l(g, y, S, n)
                } else {
                    if (e("#script_media_element").length < 1) {
                        var x = document.createElement("script");
                        x.type = "text/javascript";
                        x.src = "mep/player/mediaelement-and-player.min.js";
                        x.id = "script_media_element";
                        document.body.appendChild(x)
                    }
                    var g = parseInt(p[0]), y = parseInt(p[1]);
                    if (g > s) {
                        g = s - 80
                    }
                    if (c == "video") {
                        var T = '<div class="video_player"><video src="' + r + '" width="' + g + '" height="' + y + '" poster="' + h + '"></video></div>';
                        l(g, y, T, n)
                    } else if (c == "audio") {
                        var T = '<div id="audio_player"><audio src="' + r + '" width="' + g + '" height="' + y + '" poster="' + h + '" type="audio/mp3" controls="controls"></audio></div>';
                        l(g, y, T, n)
                    }
                }
                i.append('<div id="sti_previous_lightbox"></div><div id="sti_next_lightbox"></div>');
                var N = w.eq(u).children(k).find(".sti_lightbox").length;
                e("#sti_previous_lightbox").css({opacity: 0, display: "none"});
                e("#sti_next_lightbox").css({opacity: 0, display: "none"});
                e("#sti_previous_lightbox").on("click", function (t) {
                    n = n.parent().prevAll(":has(.sti_lightbox):first").find(".sti_lightbox");
                    if (n.length > 0) {
                        if (!D) {
                            e("audio").each(function () {
                                e(this)[0].player.pause()
                            })
                        }
                        i.html("");
                        f(n)
                    } else {
                        if (!D) {
                            e("audio").each(function () {
                                e(this)[0].player.pause()
                            })
                        }
                        i.html("");
                        f(w.eq(u).children(k).find(".sti_lightbox").eq(N - 1))
                    }
                    e("#popup_lightbox").append("<div id='preload_lightbox'></div>")
                });
                e("#sti_next_lightbox").on("click", function (t) {
                    n = n.parent().nextAll(":has(.sti_lightbox):first").find(".sti_lightbox");
                    if (n.length > 0) {
                        if (!D) {
                            e("audio").each(function () {
                                e(this)[0].player.pause()
                            })
                        }
                        i.html("");
                        f(n)
                    } else {
                        if (!D) {
                            e("audio").each(function () {
                                e(this)[0].player.pause()
                            })
                        }
                        i.html("");
                        f(w.eq(u).children(k).find(".sti_lightbox").eq(0))
                    }
                    e("#popup_lightbox").append("<div id='preload_lightbox'></div>")
                });
                i.mouseover(function (t) {
                    e("#sti_previous_lightbox").css({display: "block"}).stop().animate({opacity: .5}, {duration: 400});
                    e("#sti_next_lightbox").css({display: "block"}).stop().animate({opacity: .5}, {duration: 400})
                }).mouseout(function () {
                    e("#sti_previous_lightbox").stop().animate({opacity: 0}, {duration: 400});
                    e("#sti_next_lightbox").stop().animate({opacity: 0}, {duration: 400})
                })
            }

            function l(t, n, r, i) {
                if (t > s) {
                    t = s - 80
                }
                var u = e("#popup_lightbox");
                u.stop().delay(100).animate({
                    top: o / 2 - u.height() / 2,
                    left: s / 2 - u.width() / 2
                }, 400, function () {
                    e("#preload_lightbox").remove()
                });
                var a = s / 2 - t / 2;
                var f = o / 2 - n / 2;
                u.stop().delay(100).animate({height: n, width: t, top: f, left: a}, 400, function () {
                    u.append(r);
                    e(r).fadeIn(500);
                    if (e(i).attr("title") != "" && e(i).attr("title") != "undefined") {
                        var n = e(i).attr("title")
                    } else {
                        var n = ""
                    }
                    u.append("<div id='sti_bar_lightbox'><div id='close_btn_lightbox'></div>" + n + "</div>");
                    var s = parseInt(u.css("padding-left"));
                    e("#sti_bar_lightbox").css({width: t + s, top: -(s * 2) - 31, left: 0});
                    e("#sti_bar_lightbox").fadeIn(400);
                    e("#sti_bar_lightbox").fadeTo("normal", 1);
                    e("#close_btn_lightbox").click(function () {
                        c()
                    });
                    if (i.attr("data-type") == "video") {
                        e("video").mediaelementplayer({
                            videoWidth: "100%",
                            videoHeight: "100%",
                            startVolume: .6,
                            enableAutosize: true,
                            features: ["playpause", "current", "progress", "duration", "volume", "fullscreen"],
                            videoVolume: "horizontal"
                        })
                    } else if (i.attr("data-type") == "audio") {
                        e("audio").mediaelementplayer({
                            startVolume: .6,
                            loop: true,
                            audioWidth: "95%",
                            features: ["playpause", "current", "progress", "duration", "volume", "fullscreen"],
                            videoVolume: "horizontal"
                        })
                    }
                })
            }

            function c() {
                if (!D) {
                    e("video, audio").each(function () {
                        e(this)[0].player.pause()
                    })
                }
                dt = undefined;
                e("#mask_lightbox").hide();
                e("#mask_lightbox").remove();
                e("#popup_lightbox").remove();
                e(t).trigger("resize")
            }

            n.preventDefault();
            if (A)return false;
            e("body").append('<div id="mask_lightbox"></div>');
            e("body").append('<div id="popup_lightbox"></div>');
            e("#popup_lightbox").append("<div id='preload_lightbox'></div>");
            var r = e("#mask_lightbox");
            var i = e("#popup_lightbox");
            var s = e(window).width();
            var o = e(window).height();
            var a = e(document).height();
            r.css({width: s, height: a});
            r.fadeIn(400);
            r.fadeTo("normal", .7);
            i.css({top: o / 2 - i.height() / 2, left: s / 2 - i.width() / 2});
            f(e(this));
            e("#mask_lightbox").click(function () {
                c()
            });
            e(document).keydown(function (e) {
                if (e.keyCode == 27) {
                    c()
                }
            })
        });
        var mt = parseFloat(i);
        var gt = parseFloat(s);
        var yt = 0;
        var bt, wt;
        e(window).on("resize", function (n) {
            var r = e(window).height();
            var i = e(window).width();
            if (bt == undefined || bt != r || wt == undefined || wt != i) {
                if (m == "image_banner") {
                    var o = b.find("img");
                    e(t).width("100%");
                    if (e(t).width() > mt) {
                        e(t).css("width", mt)
                    }
                    if (e(t).width() < mt) {
                        o.css({width: e(t).width()});
                        b.css({width: e(t).width(), height: o.height()});
                        w.css({height: o.height()});
                        G();
                        ut()
                    }
                    if (e(window).width() > mt) {
                        e(t).width(mt);
                        b.width(mt);
                        o.css({width: mt});
                        if (y == "vertical" && s < gt) {
                            b.height(gt);
                            w.height(gt)
                        }
                    }
                    if (yt)clearTimeout(yt);
                    yt = setTimeout(vt, 300)
                }
                if (m == "image_shelf") {
                    e(t).width("100%");
                    if (e(t).width() > mt) {
                        e(t).width(mt)
                    }
                    if (e(t).width() < mt) {
                        b.width(e(t).width());
                        G();
                        ut()
                    }
                    if (e(window).width() > mt) {
                        e(t).width(mt);
                        b.width(mt);
                        if (y == "vertical" && s < gt) {
                            b.height(gt);
                            w.height(gt)
                        }
                    }
                    //if (yt)clearTimeout(yt);
                    //yt = setTimeout(vt, 300)
                }
                if (m == "image_text") {
                    var u = e(t + " .sti_content_inner");
                    var o = b.find("img");
                    e(t).width("100%");
                    if (e(t).width() > mt) {
                        e(t).css("width", mt)
                    }
                    if (e(t).width() < mt) {
                        b.css({width: e(t).width()});
                        o.css({width: e(t).width(), height: "auto"});
                        u.css({width: e(t).width(), height: "100%"});
                        G();
                        ut()
                    }
                    if (e(window).width() > mt) {
                        e(t).width(mt);
                        b.width(mt);
                        o.css({width: mt, height: "auto"});
                        if (y == "vertical" && s < gt) {
                            b.height(gt);
                            w.height(gt)
                        }
                    }
                    if (yt)clearTimeout(yt);
                    yt = setTimeout(vt, 300)
                }
                if (m == "image_gallery") {
                    e(t).width("100%");
                    if (e(t).width() > mt) {
                        e(t).width(mt)
                    }
                    if (e(t).width() < mt) {
                        b.width(e(t).width());
                        G();
                        ut()
                    }
                    if (e(window).width() > mt) {
                        e(t).width(mt);
                        b.width(mt);
                        if (y == "vertical" && s < gt) {
                            b.height(gt);
                            w.height(gt)
                        }
                    }
                    if (yt)clearTimeout(yt);
                    yt = setTimeout(vt, 300)
                }
                if (e("#popup_lightbox").length > 0) {
                    var a = e("#popup_lightbox");
                    a.css({top: e(window).height() / 2 - a.height() / 2, left: e(window).width() / 2 - a.width() / 2});
                    var f = e("#mask_lightbox");
                    f.css({width: e(window).width(), height: e(document).height()});
                    if (e(window).width() < a.width()) {
                        a.css({width: "100%", height: "auto"});
                        e(".video_player").css({width: "100%"});
                        e("#sti_bar_lightbox").css({width: "100%"});
                        a.find("img").css({width: "100%"});
                        a.find("object").css({width: "100%"})
                    }
                    if (e(window).width() > dt) {
                        a.css({width: dt});
                        var l = a.find("img");
                        if (l) {
                            l.css({width: dt})
                        }
                    }
                    if (yt)clearTimeout(yt);
                    yt = setTimeout(vt, 300)
                }
                bt = r;
                wt = i
            }
        });
        return this
    }
})(jQuery);

// ----------------------------------------------------
// if supports css3 transitions
// ----------------------------------------------------

function supportsTransitions() {
    var b = document.body || document.documentElement;
    var s = b.style;
    var p = 'transition';
    if (typeof s[p] == 'string') {
        return true;
    }

    // Tests for vendor specific prop
    v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
        p = p.charAt(0).toUpperCase() + p.substr(1);
    for (var i = 0; i < v.length; i++) {
        if (typeof s[v[i] + p] == 'string') {
            return true;
        }
    }
    return false;
}

//------------------------------------
// images loaded plugin
// MIT License. by Paul Irish et al.
//------------------------------------

;(function ($, undefined) {
    'use strict';

// blank image data-uri bypasses webkit log warning (thx doug jones)
    var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

    $.fn.imagesLoaded = function (callback) {
        var $this = this,
            deferred = $.isFunction($.Deferred) ? $.Deferred() : 0,
            hasNotify = $.isFunction(deferred.notify),
            $images = $this.find('img').add($this.filter('img')),
            loaded = [],
            proper = [],
            broken = [];

        // Register deferred callbacks
        if ($.isPlainObject(callback)) {
            $.each(callback, function (key, value) {
                if (key === 'callback') {
                    callback = value;
                } else if (deferred) {
                    deferred[key](value);
                }
            });
        }

        function doneLoading() {
            var $proper = $(proper),
                $broken = $(broken);

            if (deferred) {
                if (broken.length) {
                    deferred.reject($images, $proper, $broken);
                } else {
                    deferred.resolve($images);
                }
            }

            if ($.isFunction(callback)) {
                callback.call($this, $images, $proper, $broken);
            }
        }

        function imgLoaded(img, isBroken) {
            // don't proceed if BLANK image, or image is already loaded
            if (img.src === BLANK || $.inArray(img, loaded) !== -1) {
                return;
            }

            // store element in loaded images array
            loaded.push(img);

            // keep track of broken and properly loaded images
            if (isBroken) {
                broken.push(img);
            } else {
                proper.push(img);
            }

            // cache image and its state for future calls
            $.data(img, 'imagesLoaded', {isBroken: isBroken, src: img.src});

            // trigger deferred progress method if present
            if (hasNotify) {
                deferred.notifyWith($(img), [isBroken, $images, $(proper), $(broken)]);
            }

            // call doneLoading and clean listeners if all images are loaded
            if ($images.length === loaded.length) {
                setTimeout(doneLoading);
                $images.unbind('.imagesLoaded');
            }
        }

        // if no images, trigger immediately
        if (!$images.length) {
            doneLoading();
        } else {
            $images.bind('load.imagesLoaded error.imagesLoaded', function (event) {
                // trigger imgLoaded
                imgLoaded(event.target, event.type === 'error');
            }).each(function (i, el) {
                var src = el.src;

                // find out if this image has been already checked for status
                // if it was, and src has not changed, call imgLoaded on it
                var cached = $.data(el, 'imagesLoaded');
                if (cached && cached.src === src) {
                    imgLoaded(el, cached.isBroken);
                    return;
                }

                // if complete is true and browser supports natural sizes, try
                // to check for image status manually
                if (el.complete && el.naturalWidth !== undefined) {
                    imgLoaded(el, el.naturalWidth === 0 || el.naturalHeight === 0);
                    return;
                }

                // cached images don't fire load sometimes, so we reset src, but only when
                // dealing with IE, or image is complete (loaded) and failed manual check
                // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
                if (el.readyState || el.complete) {
                    el.src = BLANK;
                    el.src = src;
                }
            });
        }

        return deferred ? deferred.promise($this) : $this;
    };

})(jQuery);