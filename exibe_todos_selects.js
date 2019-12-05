setInterval(function(){
    if ($('.srp-delivery-select').attr('multiple') != 'multiple'){
        $('.srp-delivery-select').attr('multiple', 'multiple');
        $('.srp-delivery-select').removeClass('o-0 absolute');
    }
},1000);