var big_image;
$(document).ready(function() {
    BrowserDetect.init(), $('body').bootstrapMaterialDesign(), window_width = $(window).width(), $navbar = $('.navbar[color-on-scroll]'), scroll_distance = $navbar.attr('color-on-scroll') || 500, $navbar_collapse = $('.navbar').find('.navbar-collapse'), $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip(), $('.form-file-simple .inputFileVisible').click(function() {
        $(this).siblings('.inputFileHidden').trigger('click')
    }), $('.form-file-simple .inputFileHidden').change(function() {
        var a = $(this).val().replace(/C:\\fakepath\\/i, '');
        $(this).siblings('.inputFileVisible').val(a)
    }), $('.form-file-multiple .inputFileVisible, .form-file-multiple .input-group-btn').click(function() {
        $(this).parent().parent().find('.inputFileHidden').trigger('click'), $(this).parent().parent().addClass('is-focused')
    }), $('.form-file-multiple .inputFileHidden').change(function() {
        for (var a = '', b = 0; b < $(this).get(0).files.length; ++b) a += b < $(this).get(0).files.length - 1 ? $(this).get(0).files.item(b).name + ',' : $(this).get(0).files.item(b).name;
        $(this).siblings('.input-group').find('.inputFileVisible').val(a)
    }), $('.form-file-multiple .btn').on('focus', function() {
        $(this).parent().siblings().trigger('focus')
    }), $('.form-file-multiple .btn').on('focusout', function() {
        $(this).parent().siblings().trigger('focusout')
    }), 0 != $('.selectpicker').length && $('.selectpicker').selectpicker(), $('[data-toggle="popover"]').popover(), $('.carousel').carousel({
        interval: 3e3
    });
    var a = $('.tagsinput').data('color');
    0 != $('.tagsinput').length && $('.tagsinput').tagsinput(), $('.bootstrap-tagsinput').addClass('' + a + '-badge'), 0 != $('.navbar-color-on-scroll').length && $(window).on('scroll', materialKit.checkScrollForTransparentNavbar), materialKit.checkScrollForTransparentNavbar(), 768 <= window_width && (big_image = $('.page-header[data-parallax="true"]'), 0 != big_image.length && $(window).on('scroll', materialKitDemo.checkScrollForParallax))
}), $(window).on('load', function() {
    materialKit.initRotateCard(), materialKit.initColoredShadows()
}), $(document).on('click', '.card-rotate .btn-rotate', function() {
    var a = $(this).closest('.rotating-card-container');
    a.hasClass('hover') ? a.removeClass('hover') : a.addClass('hover')
}), $(document).on('click', '.navbar-toggler', function() {
    $toggle = $(this), 1 == materialKit.misc.navbar_menu_visible ? ($('html').removeClass('nav-open'), materialKit.misc.navbar_menu_visible = 0, $('#bodyClick').remove(), setTimeout(function() {
        $toggle.removeClass('toggled')
    }, 550), $('html').removeClass('nav-open-absolute')) : (setTimeout(function() {
        $toggle.addClass('toggled')
    }, 580), div = '<div id="bodyClick"></div>', $(div).appendTo('body').click(function() {
        $('html').removeClass('nav-open'), $('nav').hasClass('navbar-absolute') && $('html').removeClass('nav-open-absolute'), materialKit.misc.navbar_menu_visible = 0, $('#bodyClick').remove(), setTimeout(function() {
            $toggle.removeClass('toggled')
        }, 550)
    }), $('nav').hasClass('navbar-absolute') && $('html').addClass('nav-open-absolute'), $('html').addClass('nav-open'), materialKit.misc.navbar_menu_visible = 1)
}), $(window).on('resize', function() {
    materialKit.initRotateCard()
}), materialKit = {
    misc: {
        navbar_menu_visible: 0,
        window_width: 0,
        transparent: !0,
        colored_shadows: !0,
        fixedTop: !1,
        navbar_initialized: !1,
        isWindow: document.documentMode || /Edge/.test(navigator.userAgent)
    },
    initColoredShadows: function() {
        !0 != materialKit.misc.colored_shadows || 'Explorer' == BrowserDetect.browser && 12 >= BrowserDetect.version || $('.card:not([data-colored-shadow="false"]) .card-header-image').each(function() {
            if ($card_img = $(this), is_on_dark_screen = $(this).closest('.section-dark, .section-image').length, 0 == is_on_dark_screen) {
                var a = $card_img.find('img').attr('src'),
                    b = 1 == $card_img.closest('.card-rotate').length,
                    c = $card_img,
                    d = $('<div class="colored-shadow"/>');
                if (b) {
                    var e = $card_img.height(),
                        f = $card_img.width();
                    $(this).find('.back').css({
                        height: e + 'px',
                        width: f + 'px'
                    }), c = $card_img.find('.front')
                }
                d.css({
                    "background-image": 'url(' + a + ')'
                }).appendTo(c), 700 < $card_img.width() && d.addClass('colored-shadow-big'), setTimeout(function() {
                    d.css('opacity', 1)
                }, 200)
            }
        })
    },
    initRotateCard: debounce(function() {
        $('.rotating-card-container .card-rotate').each(function() {
            var a = $(this),
                b = $(this).parent().width(),
                c = $(this).find('.front .card-body').outerHeight();
            a.parent().css({
                height: c + 'px',
                "margin-bottom": '30px'
            }), a.find('.front').css({
                height: c + 35 + 'px',
                width: b + 'px'
            }), a.find('.back').css({
                height: c + 35 + 'px',
                width: b + 'px'
            })
        })
    }, 50),
    checkScrollForTransparentNavbar: debounce(function() {
        $(document).scrollTop() > scroll_distance ? materialKit.misc.transparent && (materialKit.misc.transparent = !1, $('.navbar-color-on-scroll').removeClass('navbar-transparent')) : !materialKit.misc.transparent && (materialKit.misc.transparent = !0, $('.navbar-color-on-scroll').addClass('navbar-transparent'))
    }, 17)
};

function debounce(a, b, c) {
    var d;
    return function() {
        var e = this,
            f = arguments;
        clearTimeout(d), d = setTimeout(function() {
            d = null, c || a.apply(e, f)
        }, b), c && !d && a.apply(e, f)
    }
}
var BrowserDetect = {
        init: function() {
            this.browser = this.searchString(this.dataBrowser) || 'Other', this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || 'Unknown'
        },
        searchString: function(a) {
            for (var b, c = 0; c < a.length; c++)
                if (b = a[c].string, this.versionSearchString = a[c].subString, -1 !== b.indexOf(a[c].subString)) return a[c].identity
        },
        searchVersion: function(a) {
            var b = a.indexOf(this.versionSearchString);
            if (-1 !== b) {
                var c = a.indexOf('rv:');
                return 'Trident' === this.versionSearchString && -1 !== c ? parseFloat(a.substring(c + 3)) : parseFloat(a.substring(b + this.versionSearchString.length + 1))
            }
        },
        dataBrowser: [{
            string: navigator.userAgent,
            subString: 'Chrome',
            identity: 'Chrome'
        }, {
            string: navigator.userAgent,
            subString: 'MSIE',
            identity: 'Explorer'
        }, {
            string: navigator.userAgent,
            subString: 'Trident',
            identity: 'Explorer'
        }, {
            string: navigator.userAgent,
            subString: 'Firefox',
            identity: 'Firefox'
        }, {
            string: navigator.userAgent,
            subString: 'Safari',
            identity: 'Safari'
        }, {
            string: navigator.userAgent,
            subString: 'Opera',
            identity: 'Opera'
        }]
    },
    better_browser = '<div class="container"><div class="better-browser row"><div class="col-md-2"></div><div class="col-md-8"><h3>We are sorry but it looks like your Browser doesn\'t support our website Features. In order to get the full experience please download a new version of your favourite browser.</h3></div><div class="col-md-2"></div><br><div class="col-md-4"><a href="https://www.mozilla.org/ro/firefox/new/" class="btn btn-warning">Mozilla</a><br></div><div class="col-md-4"><a href="https://www.google.com/chrome/browser/desktop/index.html" class="btn ">Chrome</a><br></div><div class="col-md-4"><a href="http://windows.microsoft.com/en-us/internet-explorer/ie-11-worldwide-languages" class="btn">Internet Explorer</a><br></div><br><br><h4>Thank you!</h4></div></div>';