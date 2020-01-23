setInterval(function(){
    if ($('.srp-delivery-select').attr('multiple') != 'multiple'){
        $('.srp-delivery-select').attr('multiple', 'multiple');
        $('.srp-delivery-select').removeClass('o-0 absolute');
    }
},1000);

var addressShow = setInterval(function(){ //métodos de entrega checkout 5
    if (!$('.shipping-sla-selector').hasClass('open')){
        $('.shipping-sla-selector').addClass('open');
    }
},1000);
$('body').ready(function(){
    setTimeout(function(){addressShow}, 1000);
    $('.shipping-sla-button').click(function(){clearInterval(addressShow)});

});