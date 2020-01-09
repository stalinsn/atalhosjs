var buy_on_shelf = function()
{

        //fechar
        $('body').on('click', '.modal-product-overlay .btn-continue, .shelf-modal', function(){
            window.location.reload();
        });

        $('body').on('click', '.buy-on-shelf', function(e) {        

            e.preventDefault();         
            var
            esse = $(this),
            idSku = esse.parents('.shelf-item__extra').attr('rel'),
            qtySku = esse.parents('.shelf-item').find('.select-qty').val();

            console.log(qtySku);

            esse.addClass('load');

            setTimeout(function(){
                var
                url = '/checkout/cart/add?sc=3&sku='+idSku+'&qty='+qtySku+'&seller=1';                  
                util.buyOnPage(url);

                console.log(url);
                  
            }, 50);
           
        
        });
        $('body').on('click', '.buy-button', function(e) {        

            e.preventDefault();         
            var
            esse = $(this),
            idSku = esse.parents('.shelf-item__extra').attr('rel'),
            qtySku = esse.parents('.shelf-item').find('.select-qty').val();

            console.log(qtySku);

            esse.addClass('load');

            setTimeout(function(){
                var
                url = '/checkout/cart/add?sc=3&sku='+idSku+'&qty='+qtySku+'&seller=1';                  
                util.buyOnPage(url);

                console.log(url);
                  
            }, 50);
           
        
        });
}


$(".busca-page main").on("click", function(){
    timer();
});

var util = {

    isNumberKey:function(evt, obj)
    {
        var charCode = (evt.which) ? evt.which : event.keyCode
        var value = obj.value;
        var dotcontains = value.indexOf(".") != -1;
        if (dotcontains)
            if (charCode == 46) return false;
        if (charCode == 46) return true;
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    },

    maskZip:function(t, mask)
    {
        var i = t.value.length;
        var saida = mask.substring(1,0);
        var texto = mask.substring(i)
        if (texto.substring(0,1) != saida){
            t.value += texto.substring(0,1);
        }
    },

    formatCurrency:function (int)
    {
        var tmp = int+'';
        var neg = false;
        if(tmp.indexOf("-") == 0){
            neg = true;
            tmp = tmp.replace("-","");
        }
        if(tmp.length == 1) tmp = "0"+tmp
            tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
        if( tmp.length > 6)
            tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        if( tmp.length > 9)
            tmp = tmp.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,".$1.$2,$3");
        if( tmp.length > 12)
            tmp = tmp.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,".$1.$2.$3,$4");
        if(tmp.indexOf(".") == 0) tmp = tmp.replace(".","");
        if(tmp.indexOf(",") == 0) tmp = tmp.replace(",","0,");
        return (neg ? '-'+tmp : tmp);
    },

    event:function()
    {
        var slideObjectIn = function(side,elem) {
            var anim = {};
            anim[side] = '0';  
            $(elem).show().animate(anim, 300);
        }

        var slideObjectOut = function(side,elem) {
            var heightOut = '-100%';          
            var anim = {};
            anim[side] = heightOut;
            $(elem).animate(anim, 300, function(){
                $(elem).hide();
            });
        }

        $('body').on('click', '.slide-show', function(e){
            e.preventDefault();        
            var elem = $(this).attr('rel');
            var direction  = $(this).attr('rev');                       
            slideObjectIn(direction,'.'+elem);
            jQuery('body').addClass('noScroll');
            
        }); 

        $('body').on('click', '.slide-hide', function(e){
            e.preventDefault();            
            var elem = $(this).attr('rel');
            var direction  = $(this).attr('rev');
            slideObjectOut(direction,'.'+elem);
            jQuery('body').removeClass('noScroll');
            
        });

        $('body').on('click', '.update-qty.remove', function() {
            var
            elem = $(this).parents('.qty').find('.select-qty'),
            num = elem.val();

            if (num == '') {                
                num = 2;
            }
            
            if (num > 1) {
                elem.val(parseInt(num)-1).trigger('change');
            }

            
        });

        $('body').on('click', '.update-qty.add', function() {           
            var         
            elem = $(this).parents('.qty').find('.select-qty'),
            num = elem.val();
            if (num == '') {                
                num = 0;
            }
            elem.val(parseInt(num)+1).trigger('change');            
        });
    },

    buyOnPage:function(href)
    {   
        $.ajax({
            type: 'GET',
            url: window.location.origin + href,
            success: function () {
                vtexjs.checkout.getOrderForm().done(function(orderForm){
                    gtmCart.listCart(orderForm);
                });
                
                $('.menu__link--carrinho').click();
                $('.buy-on-shelf').removeClass('load');
            },
      
            error: function () {
                console.log('Não foi possível adicionar ao carrinho')
            },
      
            complete : function () {}
        });
    }, 
}



var gtmCart =
{

    init:function()
    {
        //Remover depois (ajustes de HTML)
        /*header*/
        $('#mini-cart-admake').remove();
        $('.tools .btn-mini-cart').addClass('slide-show').removeAttr('href').attr('rel','nav-cart').attr('rev', 'right');
        $('body').append(
            '<div class="g-hide nav-cart">'+
                '<div class="row wrap-minicart">'+
                    '<a class="slide-hide close-minicart" rev="right" rel="nav-cart"><i class="ico">×</i></a>'+
                    '<div class="resume-cart"></div>'+
                '</div>'+
            '</div>'
        );

        /*shelf*/
        setTimeout(function(){
            $('.wrapper-buy-button-asynchronous').each(function(){
                console.log('shelf');

                $(this).html(
                    '<div class="row btn">'+
                        '<span class="qty">'+
                            '<button class="update-qty remove">-</button>'+
                            '<input type="text" onkeypress="return util.isNumberKey(event,this)" class="select-qty" value="1">'+
                            '<button class="update-qty add">+</button>'+
                        '</span>'+
                        '<a class="buy-on-shelf"><span class="txt">Comprar</span></a>'+
                    '</div>'
                );
            });
        }, 200);
        /*até aqui*/


        util.event();
        this.cartConfig();
        this.updateCart();
        this.qtyAdd();
        this.qtyRemove();
        this.qtyUpdate();
        this.skuRemove();       
        this.shipping();
        this.coupon();
    },

    disableCart:function(){
        $('.cartSkuQuantity a, .cartSkuQuantity .select-qty').addClass('disable').removeClass('enable');
        $('.cartSkuQuantity .select-qty').attr('readonly','readonly');
        $('.resume-cart').addClass('load');
    },

    enableCart:function() {
        $('.cartSkuQuantity a, .cartSkuQuantity .select-qty').addClass('enable').removeClass('disable');
        $('.cartSkuQuantity .select-qty').removeAttr('readonly');
        $('.cart-qty').removeClass('read');
        $('.resume-cart').removeClass('load');
    },

    cartLayout:function()
    {
        var
        hScreen = $(window).height(),
        wScreen = $(window).width(),
        hDocument = $(document).height();

        $('.wrap-minicart, .resume-cart').css('height', hScreen+'px');
        $('.cart-itens').css('height', (hScreen-335)+'px');             
    },

    cartConfig:function()
    {
        $('.resume-cart').html(         
            '<div class="cart-wrap">'+
                '<div class="cart-header">'+
                    '<h4 class="title">Sua sacola</h4>'+
                '</div>'+
                '<div class="cart-content">'+
                    '<div class="cart-itens">'+
                        '<div class="cart-wrap-itens"></div>'+
                    '</div>'+
                '</div>'+
                '<div class="cart-footer">'+
                    '<div class="row cart-calc">'+
                        '<div class="row coupon">'+
                            '<a class="g-hide remove-coupon">Remover cupom</a>'+
                            '<label for="coupon">Cupom de<br> desconto</label>'+
                            '<input type="text" name="coupon" id="coupon" autocomplete="off">'+
                            '<button class="calc-coupon">Ok</button>'+
                        '</div>'+
                        '<div class="row shipping">'+
                            '<label for="zipcode">Calcule<br> o frete</label>'+
                            '<input type="text" name="zipcode" id="zipcode" maxlength="9" onkeypress="return util.isNumberKey(event,this)" autocomplete="off">'+
                            '<button class="calc-shipping">Ok</button>'+
                        '</div>'+
                    '</div>'+
                    '<div class="cart-summary">'+
                        '<div class="g-hide row coupon">'+
                            '<span class="txt">Desconto</span>'+
                            '<strong class="value"></strong>'+
                        '</div>'+
                        '<div class="g-hide row shipping">'+
                            '<span class="txt">Frete</span>'+
                            '<strong class="value"></strong>'+
                        '</div>'+                       
                        '<div class="row total">'+
                            '<span class="txt">Subtotal</span>'+
                            '<strong class="value"></strong>'+
                        '</div>'+
                    '</div>'+                   
                    '<div class="row cart-action">'+
                        '<a class="btn-cart" href="/checkout/#/cart"><span>Finalizar compra</span></a>'+
                    '</div>'+
                '</div>'+               
            '</div>'+
            '<div class="cart-modal"></div>'
        ).addClass('load');
        gtmCart.cartLayout();
    },

    updateCart:function()
    {
        vtexjs.checkout.getOrderForm().done(function(orderForm){
            gtmCart.listCart(orderForm);
        });
    },

    listCart:function(cartForm)
    {   
            
        //console.log(cartForm);        
        var totalItens = 0;
            
        if (cartForm.items.length > 0) {
                
            var
            cartItems = '',
            isShipping = cartForm.shippingData,
            isTotal = cartForm.totalizers,
            isDiscount = cartForm.ratesAndBenefitsData;         

            //itens
            $.each( cartForm.items, function( i, val ) {
                var
                key = i;
                cartName = val.name,
                cartId = val.id,
                cartQty = val.quantity,
                cartImage = val.imageUrl,
                cartPrice = val.price,
                cartUrl = val.detailUrl;                
                    
                cartItems +=
                '<ul class="row cart-group item-'+key+'" rel="'+key+'">'+
                    '<li class="cartSkuImage"><a href="'+cartUrl+'"><img src="'+cartImage+'" alt="'+cartName+'"></a></li>'+
                    '<li class="cartSkuDados">'+
                        '<div class="cartSkuName"><a href="'+cartUrl+'">'+cartName+'</a></div>'+                        
                        '<div class="cartSkuQuantity">'+
                            '<div class="row cart-qty">'+
                                '<label>Qtde.:</label>'+
                                '<span>'+
                                    '<a class="remove-cart-qty disable">-</a>'+
                                    '<input type="text" onkeypress="return util.isNumberKey(event,this)" class="select-qty disable" maxlength="4" readonly value="'+cartQty+'">'+
                                    '<a class="add-cart-qty disable">+</a>'+
                                '</span>'+
                            '</div>'+
                        '</div>'+
                        '<div class="cartSkuPrice"><span class="cartValue">'+'R$ '+util.formatCurrency(cartPrice)+'</span></div>'+
                    '</li>'+
                    '<li class="cartSkuRemove"><a class="removeItem" rel="'+key+'">×</a></li>'+
                '</ul>';

                totalItens += cartQty;
            });
            $('.resume-cart .cart-itens').html('<div class="cart-wrap-itens">'+cartItems+'</div>');

            //frete
            if (isShipping != null && isShipping != undefined){
                if (isShipping.selectedAddresses.length > 0) {                  
                    $('#zipcode').val(isShipping.address.postalCode);

                    $.each( isTotal, function( eq, elem ) {
                        if (elem.id == 'Shipping') {
                            if (elem.value == 0) {
                                $('.shipping').show().find('.value').html('Grátis');    
                            } else {
                                $('.shipping').show().find('.value').html('R$ '+util.formatCurrency(elem.value));   
                            }
                            
                        }
                    });
                }
            }

            //descontos
            if (isDiscount != null){
                if (isDiscount.rateAndBenefitsIdentifiers.length > 0) {
                    $('.remove-coupon').css('display', 'block');

                    $.each( isTotal, function( eq, elem ) {
                        if (elem.id == 'Discounts') {
                            $('.coupon').show().find('.value').html('R$ '+util.formatCurrency(elem.value));
                        }
                    });
                }
            }

            //total
            $('.resume-cart .cart-summary .total .value').html('R$ '+util.formatCurrency(cartForm.value));
            $('.cart-footer, .cart-header').show();                 
            gtmCart.enableCart();   

        } else {            
            $('.cart-itens').html('<div class="empty-mini-cart">A sua sacola de compras<br>está vazia.</div>');         
            $('.cart-footer, .cart-header').hide();
        }

        $('.header-middle__minicart .menu__link--carrinho').html(totalItens);
        $('.cart-wrap').show();
    },

    qtyAdd:function()
    {
        $('.resume-cart').on('click', '.add-cart-qty.enable', function(){
            var itemQty = parseInt($(this).parents('.cart-qty').find('.select-qty').val())+1;           
            $(this).parents('.cart-qty').find('.select-qty').val(itemQty).trigger('change');            
        });
    },

    qtyRemove:function()
    {
        $('.resume-cart').on('click', '.remove-cart-qty.enable', function(){
            var itemQty = parseInt($(this).parents('.cart-qty').find('.select-qty').val())-1;
            
            if (itemQty > 0) {
                $(this).parents('.cart-qty').find('.select-qty').val(itemQty).trigger('change');                    
            }

        });
    },

    qtyUpdate:function()
    {
        $('.resume-cart').on('change', '.select-qty.enable', function(){
            var
            skuQtyId = $(this).parents('.cart-group').attr('rel'),
            skuQtyVal = parseInt($(this).val());
            gtmCart.disableCart();
            gtmCart.qtyRefresh(skuQtyId, skuQtyVal);
            $(this).parents('.cart-qty').addClass('read');
        });
    },

    qtyRefresh:function(index, qty)
    {       
        
        vtexjs.checkout.getOrderForm().then(function(orderForm){

            var item = orderForm.items[0];
            var updItem = {
                index: parseInt(index),
                quantity: parseInt(qty)
            };          
            return vtexjs.checkout.updateItems([updItem], null, false);

        }).done(function(orderForm){            
            gtmCart.listCart(orderForm);
        });
    },

    skuRemove:function()
    {
        $('.resume-cart').on('click', '.removeItem', function(){
            var keyRemove = parseInt($(this).attr('rel'));
            gtmCart.disableCart();

            vtexjs.checkout.getOrderForm().then(function(orderForm) {
                var
                itemIndex = 0,
                item = orderForm.items[itemIndex],
                itemsToRemove = [
                  {
                    "index": keyRemove,
                    "quantity": 0,
                  }
                ]
                return vtexjs.checkout.removeItems(itemsToRemove);
            }).done(function(orderForm) {               
                gtmCart.listCart(orderForm);                
            });
        });
    },

    shipping:function()
    {
        
        $('body').on('keypress', '.cart-footer #zipcode', function(){
            util.maskZip(this, '#####-###');            
        });

        $('body').on('click', '.calc-shipping', function(){
            var zipCode = $('.cart-footer #zipcode').val();
            if (zipCode.length != 9) {              
                $('.cart-footer #postalCart').addClass('empty').focus();
                
            } else {
                gtmCart.disableCart();
                vtexjs.checkout.getOrderForm().then(function(orderForm) {
                    var address = {
                      "postalCode": zipCode,
                      "country": 'BRA'            
                    };
                    return vtexjs.checkout.calculateShipping(address);

                }).done(function(orderForm) {   
                    gtmCart.listCart(orderForm);
                });
            }               
        });
    },

    coupon:function()
    {
        //add
        $('body').on('click', '.calc-coupon', function(){
            var coupon = $('.cart-footer #coupon').val();
            if (coupon == '') {
                $('.cart-footer #coupon').addClass('empty').focus();

            } else {
                gtmCart.disableCart();
                vtexjs.checkout.getOrderForm().then(function(orderForm) {                   
                    return vtexjs.checkout.addDiscountCoupon(coupon);

                }).done(function(orderForm) {
                    $('.cart-footer #coupon').val('');
                    gtmCart.listCart(orderForm);
                });
            }
        });

        //remove
        $('body').on('click', '.remove-coupon', function(){
            $(this).hide();
            gtmCart.disableCart();
            vtexjs.checkout.getOrderForm().then(function(orderForm) {
                return vtexjs.checkout.removeDiscountCoupon();


            }).done(function(orderForm) {
                $('.cart-summary .coupon').hide();
                gtmCart.listCart(orderForm);
            });
        });

    }
}




    $(document).ready(function(){
        gtmCart.init();
        buy_on_shelf();
    });


window.onresize = function(event) {
    gtmCart.cartLayout();
 
};