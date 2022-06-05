swal({
    title: 'UPOZORNĚNÍ',
    text: 'Stránka je ve vývoji, makám na ní, dejte mi čas. Díky',
    icon: 'info',
});


(function ($) {



    /*  NA KLIKNUTÍ SE OBJEVÍ PŘÍSLUŠNÁ SEKCE */

    var odstavec = $('.odstavec'),
        menuLinks = $('.mainMenu a');

    odstavec.not(':first').hide();

    menuLinks.on('click', function (event) {
        var id = $(this).attr('href');

        odstavec.hide();

        $(id).fadeIn(2000);

        event.preventDefault();
    });

    /*  SLIDER IMG AUTOMATIC */

    var cover = $('#cover'),
        covers = $('.fadecovers');

    covers.children(':not(:last)').hide();

    setInterval(function () {
        covers
            .children(':last')
            .fadeOut(2500, function () {
                $(this).prependTo(covers);
            })
            .prev()
            .fadeIn(1500);
    }, 3500);

    /*  SCROLL DONWN NA KLIKNUTÍ */

    var menu = $('.mainMenu'),
        menuLinks = menu.find('a');

    menuLinks.on('click', function (event) {
        event.preventDefault();

        var id = this.hash;
        $('html,body').animate({ scrollTop: $(id).offset().top }, 2000, function () {
            window.location.hash = id;
        });
    });

    /*  BACK TO TOP ŠIPKA*/

    var backToTop = $('<a>', {
        href: '#home',
        class: 'back-to-top',
        html: '<i class="fa fa-arrow-up fa-5x"></i>',
    });

    backToTop
        .hide()
        .appendTo('body')
        .on('click', function () {
            $('body,html').animate({ scrollTop: 0 });
        });

    var win = $(window);
    win.on('scroll', function () {
        if (win.scrollTop() >= 900) backToTop.fadeIn();
        else backToTop.hide();
    });

    /*  IMG SLIDER  MANUAL*/

    var Slider = {
        images: null,
        current: null,
        selector: null,

        init: function (data) {
            this.images = $(data.selector);
            this.selector = data.selector;
            this.images.not(':last').hide();
        },

        prev: function () {
            this.current = this.images.filter(':visible');

            var prev = this.current.prev(this.selector);

            if (!prev.length) {
                prev = this.images.filter(':last');
            }
            this.change(this.current, prev);
        },

        next: function () {
            this.current = this.images.filter(':visible');

            var next = this.current.next(this.selector);

            if (!next.length) {
                next = this.images.filter(':first');
            }
            this.change(this.current, next);
        },

        change: function (currentElement, newElement) {
            if (this.images.filter(':animated').length > 0) {
                return;
            }
            newElement.fadeIn();
            currentElement.fadeOut();
        },
    };

    Slider.init({
        selector: '.cover',
    });

    $('.prev').on('click', function () {
        Slider.prev();
    });

    $('.next').on('click', function () {
        Slider.next();
    });

    $(document).on('keydown', function (event) {
        var keyCode = event.keyCode || event.which,
            arrow = { left: 37, up: 38, right: 39, down: 40 };

        switch (event.which) {
            case arrow.left:
                Slider.prev();
                break;
            case arrow.right:
                Slider.next();
                break;
        }
    });

    /*  ANIMACE */


    var colors = ['#3b9ae1', '#f6be00', '#e64131', 'eb70b1', '0f1a5f'];

    $('mainMenu').find('a').on('mouseenter', function () {
        var newColor = colors[Math.floor(Math.random() * colors.length)];
        $(this).animate({ backgroundColor: red })

    });

    /*  GALERRY */

 /*    var gallery = $('.shows'),
        startingOpacity = gallery.find('img').css({ 'opacity' })
;

    gallery.find('img').on('mouseenter mouseleave', function (event) {
        var opacity = event.type === 'mouseenter' ? 1 : startingOpacity;
        $(this).stop().fadeTo(200, opacity);

    }); */



})(jQuery);
