$(window).load(function() {    
    setInterval(function(){
        if ($('.vtexIdUI-close').hasClass('ng-hide')){   
            $('.vtexIdUI-close').removeClass('ng-hide');
        }
    }, 1000);
});