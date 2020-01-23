$(document).ready(function(){
    var compre_naloja = 
    '<div class="venda-na-loja">'+
        '<div style="font-size:17px;">COMPRE PELO TELEVENDAS: (61) 3204 0000</div>'+
    '</div>';
    setTimeout(function(){        
        if ($('.cont_flag .flag.venda-proibida').length > 1){
            $('.cont_flag .flag.venda-proibida').parent().siblings('.wrapper-buy-button-asynchronous').find('.row.btn').css('display', 'none');
            $('.cont_flag .flag.venda-proibida').parent().siblings('.wrapper-buy-button-asynchronous').append(compre_naloja)
        };
    },200);
});