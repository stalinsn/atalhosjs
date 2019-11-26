$(window).load(function() {    
    setInterval(function(){
        if ($('p').hasClass('entrega-express')){   
            $('.product-info').addClass('entrega-expresso');
        }
    }, 1000);
});