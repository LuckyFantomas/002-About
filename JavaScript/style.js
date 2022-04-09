(function ($) {
  
     /*    NA KLIKNUTÍ SE OBJEVÍ PŘÍSLUŠNÁ SEKCE */
    
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
        covers =$('.fadecovers');

            covers.children(':not(:last)').hide();

    setInterval(function () {
        
        covers.children(':last')
            .fadeOut(2500, function () { $(this).prependTo(covers); })
            .prev().fadeIn(1500);
}, 3500);

  /* SCROLL DONWN NA KLIKNUTÍ */

       var menu = $('.mainMenu'),
        menuLinks = menu.find('a');



    menuLinks.on('click', function (event) {
        
        event.preventDefault();
        
        var id = this.hash;
        $('html,body').animate({ scrollTop: $(id).offset().top }, 2000, function () {
    
        window.location.hash = id
        });
    });
    
    /*  BACK TO TOP ŠIPKA*/
    
    var backToTop = $('<a>', {
        href: '#home',
        class: 'back-to-top',
        html: '<i class="fa fa-arrow-up fa-5x"></i>'
    });
    
    backToTop
        .hide()
        .appendTo('body')
        .on('click', function () {
            $('body,html').animate({ scrollTop: 0 });
        });
    
     var win = $(window);
    win.on('scroll', function () {
    
        if ( win.scrollTop() >= 900 ) backToTop.fadeIn();
       
          else backToTop.hide();

    }); 
    
    /*      IMG SLIDER  MANUAL*/

    var Slider = {

        images: null,   // sem si ulozime vsetky obrazky
        current: null,  // sem si ulozime aktualne zobrazeny obrazok
        selector: null, // ulozime si selektor, keby ho bolo treba v dalsich funkciach
    
        init: function(data) {
            
            // najdeme si vsetky obrazky
            this.images = $(data.selector);
    
            // nech mame ten selektor pristupny pre dalsie funkcie Slidera
            this.selector = data.selector;
    
            // skryjeme vsetky, okrem posledneho
            this.images.not(':last').hide();
    
        },
    
        prev: function() {
            
            // pomocou :visible najdeme aktualne zobrazeny element 
            // filter je nieco podobne ako find, akurat ze to nevybera elementy, ale hlada v uz vybranych
            this.current = this.images.filter(':visible');
    
            // najdeme od neho predosly [.cover] element
            var prev = this.current.prev( this.selector );
    
            // ak sme na prvom obrazku, predosly neexistuje
            // takze vyberieme posledny. po prvom obrazku zobrazime posledny.
            if ( ! prev.length ) {
                prev = this.images.filter(':last');
            }
            
            // vymenime obrazky
            this.change( this.current, prev );
    
        },
    
        next: function() {
            
            // najdeme zobrazeny 
            this.current = this.images.filter(':visible');
    
            // najdeme nasledovny [.cover] element 
            var next = this.current.next( this.selector );
    
            // ak sme na poslednom, ziaden nasledovny neexistuje
            // tak vyberieme prvy, aby sme chodili stale dokola
            if ( ! next.length ) {
                next = this.images.filter(':first');
            }
            
            // vymenime
            this.change( this.current, next );
    
        },
    
        change: function( currentElement, newElement ) {
            
            // toto je kontrola, ze ci medzi obrazkami existuju take, ktore su prave animovane
            // ak existuju, tak spravime return, cize funkcia sa nedstane dalej 
            // to znamena, ze budeme animovat iba vtedy, ked ziadna animacia neprebieha
            // pretoze inac be sme mohli 50x rychlo stlacit sipku a cakat, kym sa skonci 50 animacii
            if ( this.images.filter(':animated').length > 0 ) {
                return;
            }
    
            // zobrazime novy element
            newElement.fadeIn();
            
            // nechame zmiznut aktualny element
            currentElement.fadeOut();
            
        }
    
    }


    // spustime slider, bude spraveny tak, ze tam mozeme poslat selektor
	// aby keby v html mame covery v inom elemente alebo v elemente s inym classom, stale to fungovalo
	Slider.init({
		selector: '.cover'
	});


	// ikona vlavo zobrazi predosly
	$('.prev').on('click', function() {
		Slider.prev();
	});

	// ikona vpravo zobrazi nasledovny
	$('.next').on('click', function() {
		Slider.next();
	});

 	
	// mozeme spravit aj ovladanie sipkami na klavesnici
	$(document).on('keydown', function(event) {
		
		// to || znamena "alebo", cize pouzije sa keyCode alebo which, podla toho, co existuje
		var keyCode = event.keyCode || event.which, 
      		arrow = {left: 37, up: 38, right: 39, down: 40 };

		switch(event.which) {
			case arrow.left: 
				Slider.prev();
				break;
			case arrow.right:
				Slider.next();
				break;
		}

	});

    /*    ANIMACE */

    var colors = ['#3b9ae1', '#f6be00', '#e64131', 'eb70b1', '0f1a5f'];
    
    $('mainMenu').find('a').on('mouseenter', function () {
       /*  var newColor = colors[Math.floor(Math.random() * colors.length)]; */
        $(this).animate({ backgroundColor: red  })
                
    });


    
    
    })(jQuery);
