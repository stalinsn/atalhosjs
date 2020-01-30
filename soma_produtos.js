$(document).ready(function(){
    setInterval(function(){
        var qtdFinal = 0;
        $('.vtexsc-productList tr .cartSkuQttTxt .vtexsc-skuQtt').each(function(){
            qtdFinal += parseInt($(this).text(), 10);         
        })
        // console.log('data:', qtdFinal);
        $('#carrinho a').first().html('Meu Carrinho (' + qtdFinal + ') ');
        console.log('rodei');
    }, 5000);
    $('.btn-comprar-pd a').on('click', function(){
        setTimeout(function(){
            $('.vtexsc-productList tr .cartSkuQttTxt .vtexsc-skuQtt').each(function(){                
            var qtdFinal = 0;
                qtdFinal += parseInt($(this).text(), 10);         
            })
            // console.log('data:', qtdFinal);
            $('#carrinho a').first().html('Meu Carrinho (' + qtdFinal + ') ');
            console.log('rodei');
        }, 1000)        
    });
})
