jQuery(document).ready(function($){
  

    //fix for stupid ie object cover
    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
      jQuery('.featured-box-img-cover').each(function(){
          var t = jQuery(this),
              s = 'url(' + t.attr('src') + ')',
              p = t.parent(),
              d = jQuery('<div></div>');
  
          p.append(d);
          d.css({
              'height'                : '290',
              'background-size'       : 'cover',
              'background-repeat'     : 'no-repeat',
              'background-position'   : '50% 20%',
              'background-image'      : s
          });
          t.hide();
      });
    }

    // alertbar later
    /*$(document).scroll(function () {
        var y = $(this).scrollTop();
        if (y > 280) {
            $('.alertbar').fadeIn();
        } else {
            $('.alertbar').fadeOut();
        }
    });*/


    // Smooth on external page
    $(function() {
      setTimeout(function() {
        if (location.hash) {
          /* we need to scroll to the top of the window first, because the browser will always jump to the anchor first before JavaScript is ready, thanks Stack Overflow: http://stackoverflow.com/a/3659116 */
          window.scrollTo(0, 0);
          target = location.hash.split('#');
          smoothScrollTo($('#'+target[1]));
        }
      }, 1);

      // taken from: https://css-tricks.com/snippets/jquery/smooth-scrolling/
      $('a[href*=\\#]:not([href=\\#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          smoothScrollTo($(this.hash));
          return false;
        }
      });

      function smoothScrollTo(target) {
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
        }
      }
    });
  /* MAKE POP UP */ 
  $('#show').on('click', function () {
      $('.center').show();
      $(this).hide();
  })
  
  $('#close').on('click', function () {
      $('.center').hide();
      $('#show').show();
  })


    
    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('nav').outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();
        
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down            
            $('nav').removeClass('nav-down').addClass('nav-up'); 
            $('.nav-up').css('top', - $('nav').outerHeight() + 'px');
           
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {               
                $('nav').removeClass('nav-up').addClass('nav-down');
                $('.nav-up, .nav-down').css('top', '0px');             
            }
        }

        lastScrollTop = st;
    }
        
    $('.site-content').css('margin-top', $('header').outerHeight() + 'px');  
    
    // spoilers
     $(document).on('click', '.spoiler', function() {
        $(this).removeClass('spoiler');
     });
    
 });   

// deferred style loading
var loadDeferredStyles = function () {
	var addStylesNode = document.getElementById("deferred-styles");
	var replacement = document.createElement("div");
	replacement.innerHTML = addStylesNode.textContent;
	document.body.appendChild(replacement);
	addStylesNode.parentElement.removeChild(addStylesNode);
};
var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
if (raf) raf(function () {
	window.setTimeout(loadDeferredStyles, 0);
});
else window.addEventListener('load', loadDeferredStyles);

$('.carousel .carousel-item').each(function(){
    var minPerSlide = 2; 
    var next = $(this).next();
    /*if (!next.length) {
    next = $(this).siblings(':first');
    } */
    next.children(':first-child').clone().appendTo($(this)); 
    
    for (var i=0;i<minPerSlide;i++) {
        next=next.next();
        /*if (!next.length) {
        	next = $(this).siblings(':first');
      	} */
        
        next.children(':first-child').clone().appendTo($(this));
      } 
});



//var currentIndex = ($('div.active').index()) + 1; 
//var totalItems = $('.carousel-item').length;

//function currentIndex(name1) {
  //($('div.active').index()) + 1;
//}; 



function nextIndexFunc(carouselName){
  var $this = $(carouselName);
  var currentIndex = $this.find('div.active').index() + 1;
  //var currentIndex = $('div.active').index() + 1; 
  var totalItems = $('.carousel-item').length;

  $(carouselName).bind('slid', function() {
    currentIndex = $('div.active').index() + 1;
   $('.num').html(''+currentIndex+'/'+totalItems+''); 
  });   

  //$('.num').html(''+currentIndex+'/'+totalItems+''); //this is the problem :( 
  if($(window).width() < 770){
    return $(carouselName).carousel(currentIndex);
  } 
  else {
    return $(carouselName).carousel(currentIndex + 1);
  }
  
};

function prevIndexFunc(carouselName) {
  //var currentIndex = $('div.active').index() + 1; 
  var totalItems = $( '.carousel-item').length;
  var $this = $(carouselName);
  var currentIndex = $this.find('div.active').index() + 1;
  $(carouselName).bind('slid', function() {
    currentIndex = $('div.active').index() -1;
   $('.num').html(''+currentIndex+'/'+totalItems+''); 
  });

  if($(window).width() < 770){
    return $(carouselName).carousel(currentIndex -2);
  } 
  else {
    return $(carouselName).carousel(currentIndex -3);
  }
  
};

/* PROBLEM: if someone moves one to the right when screen is small
and then they make the screen bigger and try to go back, it wont work.
And if someone goes to second last page when screen is small and then make screen big
there will be problems with arrow - wont disappear
*/



$('.carouselUnderstanding').on('slid.bs.carousel', function() {
  checkControls('.carouselUnderstanding');
}); 
$('.carouselMeta').on('slid.bs.carousel', function() {
  checkControls('.carouselMeta');
}); 
$('.carouselProductivity').on('slid.bs.carousel', function() {
  checkControls('.carouselProductivity');
}); 
$('.carouselRelationships').on('slid.bs.carousel', function() {
  checkControls('.carouselRelationships');
}); 





// Hide left / right control if carousel is at first / last position.
function checkControls(carouselName) {
    var $this = $(carouselName);
    $this.children('.carousel-control-prev').toggle(
        !$this.find('.carousel-inner .carousel-item:first-child').hasClass('active')     
    );
    if($(window).width() < 770){
      $this.children('.carousel-control-next').toggle(
        !$this.find('.carousel-inner .carousel-item:last-child' ).hasClass('active')
      ); }
      else { 
        $this.children('.carousel-control-next').toggle(
          ($this.find('.carousel-inner .carousel-item:nth-last-child(2)' ).hasClass('active') || $this.find('.carousel-inner .carousel-item:last-child' ).hasClass('active') ) == false
    );
        }
}

/* want OR in my boolean, so it'll work when I have even number of sildes, and odd number 
also want to figure out how to make run time FASTER.. */ 