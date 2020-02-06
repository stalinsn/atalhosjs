
var pScroll = 0,
    itensPage = 12;
"function" != typeof String.prototype.replaceSpecialChars && (String.prototype.replaceSpecialChars = function () {
    var e = {
        "ç": "c",
        "æ": "ae",
        "œ": "oe",
        "á": "a",
        "é": "e",
        "í": "i",
        "ó": "o",
        "ú": "u",
        "à": "a",
        "è": "e",
        "ì": "i",
        "ò": "o",
        "ù": "u",
        "ä": "a",
        "ë": "e",
        "ï": "i",
        "ö": "o",
        "ü": "u",
        "ÿ": "y",
        "â": "a",
        "ê": "e",
        "î": "i",
        "ô": "o",
        "û": "u",
        "å": "a",
        "ã": "a",
        "ø": "o",
        "õ": "o",
        u: "u",
        "Á": "A",
        "É": "E",
        "Í": "I",
        "Ó": "O",
        "Ú": "U",
        "Ê": "E",
        "Ô": "O",
        "Ü": "U",
        "Ã": "A",
        "Õ": "O",
        "À": "A",
        "Ç": "C"
    };
    return this.replace(/[\u00e0-\u00fa]/g, function (t) {
        return void 0 !== e[t] ? e[t] : t
    })
}), "function" != typeof String.prototype.trim && (String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "")
}), jQuery.fn.vtexSmartResearch = function (e) { 
    $this = jQuery(this);
    var t = function (e, t) {
            "object" == typeof console && console.log("[Smart Research - " + (t || "Erro") + "] " + e)
        },
        r = {
            pageLimit: null,
            loadContent: ".AOD-Shelf-Main[id^=ResultItems]",
            shelfClass: ".AOD-Shelf-Main",
            filtersMenu: ".search-multiple-navigator",
            linksMenu: ".search-single-navigator",
            menuDepartament: ".navigation .menu-departamento",
            mergeMenu: !0,
            insertMenuAfter: ".search-multiple-navigator h3:first",
            emptySearchElem: jQuery('<div class="vtexsr-emptySearch"></div>'),
            elemLoading: '<div id="scrollLoading">Carregando ... </div>',
            returnTopText: '<span class="text">voltar ao</span><span class="text2">TOPO</span>',
            emptySearchMsg: "<h3>Esta combinação de filtros não retornou nenhum resultado!</h3>",
            filterErrorMsg: "Houve um erro ao tentar filtrar a página!",
            searchUrl: null,
            usePopup: !1,
            showLinks: !0,
            popupAutoCloseSeconds: 3,
            filterScrollTop: function (e) {},
            callback: function () {},
            getShelfHeight: function (e) {
                return e.scrollTop() + e.height()
            },
            shelfCallback: function () {},
            ajaxCallback: function () {},
            emptySearchCallback: function () {},
            authorizeScroll: function () {
                return !0
            },
            authorizeUpdate: function () {
                return $(window).scrollTop(0), !0
            },
            labelCallback: function (e) {}
        },
        a = jQuery.extend(r, e),
        n = jQuery(""),
        o = jQuery(a.elemLoading),
        i = 2,
        l = !0,
        s = jQuery(window),
        u = (jQuery(document), jQuery("html,body")),
        c = jQuery("body"),
        f = "",
        p = "",
        d = "",
        h = !1,
        m = jQuery(a.loadContent),
        g = jQuery(a.filtersMenu),
        v = {
            requests: 0,
            filters: 0,
            isEmpty: !1
        },
        y = {},
        b = {
            getUrl: function (e) {
                return e || !1 ? f.replace(/PageNumber=[0-9]*/, "PageNumber=" + i) : (d + p).replace(/PageNumber=[0-9]*/, "PageNumber=" + T)
            },
            getSearchUrl: function () {

                var e, r, a;
                return jQuery("script:not([src])").each(function () {
                    if (r = jQuery(this)[0].innerHTML, a = /\/buscapagina\?.+&PageNumber=/i, r.search(/\/buscapagina\?/i) > -1) return e = a.exec(r), !1
                }), void 0 !== e && void 0 !== e[0] ? e[0] : (t("Não foi possível localizar a url de busca da página.\n Tente adicionar o .js ao final da página. \n[Método: getSearchUrl]"), "")
            },
            scrollToTop: function () {
                var e = c.find("#returnToTop");
                e.length < 1 && (e = jQuery('<div id="returnToTop"><a href="#">' + a.returnTopText + '<span class="arrowToTop"></span></a></div>'), c.append(e));
                var t = s.height();
                s.bind("resize", function () {
                    t = s.height()
                }), s.bind("scroll", function () {
                    s.scrollTop() > t ? e.stop(!0).fadeTo(300, 1, function () {
                        e.show()
                    }) : e.stop(!0).fadeTo(300, 0, function () {
                        e.hide()
                    })
                }), e.bind("click", function () {
                    return u.animate({
                        scrollTop: 0
                    }, "slow"), !1
                })
            },
            infinitScroll: function () {
                
                var e, r, n;
                n = (c.find(".pager:first").attr("id") || "").split("_").pop(), e = null !== a.pageLimit ? a.pageLimit : window["pagecount_" + n], r = !0, void 0 === e && (e = 99999999), m.append("<div class='btn-load-more confira-todos-produtos'><a>+ mostrar mais</a></div>"), $(".main .shelf li .ct").length >= itensPage ? $(".btn-load-more").show() : $(".btn-load-more").hide();
                var s = 1;
                m.live("click", ".btn-load-more", function () {
                    jQuery(this);
                    if (!h && i <= e && l && a.authorizeScroll(v)) {
                        if (r) {
                            var n = m.find(a.shelfClass).filter(":last");
                            n.after(o), r = !1, w = jQuery.ajax({
                                url: b.getUrl(!0),
                                success: function (u) {
                                    if (u.trim().length < 1) l = !1, t("Não existem mais resultados a partir da página: " + (i - 1), "Aviso"), m.find(".btn-load-more").fadeOut("fast");
                                    else {
                                        s++, n.after(u);
                                        document.body.scrollHeight;
                                        $("html, body").animate({
                                            scrollTop: pScroll
                                        }, 0), $(".list-prod.shelf").fadeIn(300), s == e && $(".btn-load-more").hide()
                                    }
                                    r = !0, o.remove(), v.requests++, a.ajaxCallback(v)
                                }
                            }), i++
                        }
                    } else m.find(".btn-load-more").fadeOut("fast")
                })
            }
        };
    if (f = d = null !== a.searchUrl ? a.searchUrl : b.getSearchUrl(), $this.length < 1) return t("Nenhuma opção de filtro encontrada", "Aviso"), a.showLinks && jQuery(a.linksMenu).css("visibility", "visible").show(), b.infinitScroll(), b.scrollToTop(), $this;
    if (m.length < 1) return t("Elemento para destino da requisição não foi encontrado \n (" + m.selector + ")"), !1;
    g.length < 1 && t("O menu de filtros não foi encontrado \n (" + g.selector + ")");
    document.location.href;
    var j = jQuery(a.linksMenu),
        S = jQuery('<div class="vtexSr-overlay"></div>'),
        C = jQuery(a.menuDepartament),
        x = m.offset(),
        T = 1,
        Q = null,
        w = null;
    a.emptySearchElem.append(a.emptySearchMsg), m.before(S);
    var M = {
        exec: function () {
            M.setFilterMenu(), M.fieldsetFormat(), $this.each(function () {
                var e = jQuery(this),
                    t = e.parent();
                e.is(":checked") && (p += "&" + (e.attr("rel") || ""), t.addClass("sr_selected")), M.adjustText(e), t.append('<span class="sr_box"></span><span class="sr_box2"></span>'), e.bind("change", function () {
                    M.inputAction(), e.is(":checked") ? M.addFilter(e) : M.removeFilter(e), v.filters = $this.filter(":checked").length
                })
            }), "" !== p && M.addFilter(n)
        },
        mergeMenu: function () {
            if (!a.mergeMenu) return !1;
            var e = C;
            e.insertAfter(a.insertMenuAfter), M.departamentMenuFormat(e)
        },
        mergeMenuList: function () {
            var e = 0;
            g.find("h3,h4").each(function () {
                var t = j.find("h3,h4").eq(e).next("ul");
                t.insertAfter(jQuery(this)), M.departamentMenuFormat(t), e++
            })
        },
        departamentMenuFormat: function (e) {
            e.find("a").each(function () {
                var e = jQuery(this);
                e.text(M.removeCounter(e.text()))
            })
        },
        fieldsetFormat: function () {
            y.fieldsetCount = 0, y.tmpCurrentLabel = {}, g.find("fieldset").each(function () {
                var e = jQuery(this),
                    t = e.find("label"),
                    r = "filtro_" + (e.find("h5:first").text() || "").toLowerCase().replaceSpecialChars().replace(/\s/g, "-");
                y[r] = {}, t.length < 1 ? e.hide() : (e.addClass(r), t.each(function (t) {
                    var n = jQuery(this),
                        o = n.find("input").val() || "",
                        i = "sr_" + o.toLowerCase().replaceSpecialChars().replace(/\s/g, "-");
                    y.tmpCurrentLabel = {
                        fieldsetParent: [e, r],
                        elem: n
                    }, y[r][t.toString()] = {
                        className: i,
                        title: o
                    }, n.addClass(i).attr({
                        title: o,
                        index: t
                    }), a.labelCallback(y)
                }), y.fieldsetCount++)
            })
        },
        inputAction: function () {
            null !== w && w.abort(), null !== Q && Q.abort(), i = 2, l = !0
        },
        addFilter: function (e) {
            p += "&" + (e.attr("rel") || ""), S.fadeTo(300, .6), f = b.getUrl(), Q = jQuery.ajax({
                url: f,
                success: M.filterAjaxSuccess,
                error: M.filterAjaxError
            }), e.parent().addClass("sr_selected")
        },
        removeFilter: function (e) {
            var t = e.attr("rel") || "";
            S.fadeTo(300, .6), "" !== t && (p = p.replace("&" + t, "")), f = b.getUrl(), Q = jQuery.ajax({
                url: f,
                success: M.filterAjaxSuccess,
                error: M.filterAjaxError
            }), e.parent().removeClass("sr_selected")
        },
        filterAjaxSuccess: function (e) {
            var t = jQuery(e);
            S.fadeTo(300, 0, function () {
                jQuery(this).hide()
            }), M.updateContent(t), v.requests++, a.ajaxCallback(v), u.animate({
                scrollTop: a.filterScrollTop(x || {
                    top: 0,
                    left: 0
                })
            }, 600)
        },
        filterAjaxError: function () {
            S.fadeTo(300, 0, function () {
                jQuery(this).hide()
            }), console.log(a.filterErrorMsg), t("Houve um erro ao tentar fazer a requisição da página com filtros.")
        },
        updateContent: function (e) {
            if (h = !0, !a.authorizeUpdate(v)) return !1;
            var t = e.filter(a.shelfClass),
                r = m.find(a.shelfClass);
            (r.length > 0 ? r : a.emptySearchElem).slideUp(600, function () {
                jQuery(this).remove(), a.usePopup ? c.find(".boxPopUp2").vtexPopUp2() : a.emptySearchElem.remove(), t.length > 0 ? (t.hide(), $(".btn-load-more").length > 0 ? m.find(".btn-load-more").fadeIn("fast").before(t) : m.append(t), a.shelfCallback(), t.slideDown(600, function () {
                    h = !1
                }), v.isEmpty = !1, $(".main .shelf li .ct").length >= itensPage ? $(".btn-load-more").show() : $(".btn-load-more").hide()) : (v.isEmpty = !0, a.usePopup ? a.emptySearchElem.addClass("freeContent autoClose ac_" + a.popupAutoCloseSeconds).vtexPopUp2().stop(!0).show() : (m.append(a.emptySearchElem), a.emptySearchElem.show().css("height", "auto").fadeTo(300, .2, function () {
                    a.emptySearchElem.fadeTo(300, 1)
                })), a.emptySearchCallback(v))
            })
        },
        adjustText: function (e) {
            var t = e.parent(),
                r = t.text();
            qtt = "", r = M.removeCounter(r), t.text(r).prepend(e)
        },
        removeCounter: function (e) {
            return e.replace(/\([0-9]+\)/gi, function (e) {
                return qtt = e.replace(/\(|\)/, ""), ""
            })
        },
        setFilterMenu: function () {
            g.length > 0 && (j.hide(), g.show())
        }
    };
    M.exec(), b.infinitScroll(), b.scrollToTop(), a.callback(), g.css("visibility", "visible")
}, $(window).scroll(function (e) {  
    pScroll = $(this).scrollTop();

});
