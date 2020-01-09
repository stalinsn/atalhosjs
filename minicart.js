var gtmCart =
{

	init:function()
	{
		this.cartConfig();
		this.updateCart();				
		this.skuRemove();
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

	cartConfig:function()
	{
		$('#minicart').html(
			'<div class="portal-minicart-ref">'+
				'<div class="v2-vtexsc-cart vtexsc-cart mouseActivated preLoaded">'+
					'<div class="vtexsc-center">'+
						'<div class="vtexsc-wrap ">'+
							'<table class="vtexsc-productList">'+
							'</table>'+
						'</div>'+
					'</div>'+					
					'<div style="display:none" class="cart-footer">'+
						'<div class="row cart-calc">'+
							'<div class="row coupon">'+
								'<a style="display:none" class="remove-coupon">Remover cupom</a>'+
								'<label for="coupon">Cupom de<br> desconto</label>'+
								'<input type="text" name="coupon" id="coupon" autocomplete="off">'+
								'<button class="calc-coupon">Ok</button>'+
							'</div>'+						
						'</div>'+
						'<div class="cart-summary">'+
							'<div style="display:none" class="row coupon">'+
								'<span class="txt">Desconto</span>'+
								'<strong class="value"></strong>'+
							'</div>'+
						'</div>'+
						'<div class="cartFooter clearfix">'+
							'<div class="cartTotal">Total<span class="vtexsc-totalCart"><span class="vtexsc-text resumo-total-cart"></span></span></div>'+
							'<a href="/checkout/#/orderform" class="cartCheckout"></a>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'			
		).addClass('load');		
	},

	updateCart:function()
	{
		vtexjs.checkout.getOrderForm().done(function(orderForm){
			console.log(orderForm);
			gtmCart.listCart(orderForm);
		});
	},

	formatCurrency:function(int)
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
					'<tr>'+
						'<td class="cartSkuImage">'+
							'<a class="sku-imagem" href="'+cartUrl+'">'+
								'<img height="71" width="71" alt="'+cartName+'" src="'+cartImage+'">'+
							'</a>'+
						'</td>'+
						'<td class="cartSkuName">'+
							'<h4><a href="'+cartUrl+'">'+cartName+'</a></h4>'+
							'<p class="availability"></p>'+
						'</td>'+
						'<td class="cartSkuPrice">'+
							'<div class="cartSkuUnitPrice"><span class="bestPrice">'+'R$ '+gtmCart.formatCurrency(cartPrice)+'</span></div>'+
						'</td>'+
						'<td class="cartSkuQuantity">'+
							'<div class="cartSkuQtt"><span class="cartSkuQttTxt"><span class="vtexsc-skuQtt">'+cartQty+'</span></span></div>'+
						'</td>'+
						'<td class="cartSkuActions">'+
							'<span class="cartSkuRemove" data-index="'+key+'"></span>'+
						'</td>'+
					'</tr>';

				totalItens += cartQty;
			});

			$('.vtexsc-productList').html('<tbody>'+cartItems+'</tbody>');

			

			//descontos
			if (isDiscount != null){
				if (isDiscount.rateAndBenefitsIdentifiers.length > 0) {
					$('.remove-coupon').css('display', 'block');

					$.each( isTotal, function( eq, elem ) {
						if (elem.id == 'Discounts') {
							$('.coupon').show().find('.value').html('R$ '+gtmCart.formatCurrency(elem.value));
						}
					});
				}
			}

			//total
			$('.cart-calc').show();
			$('.resumo-total-cart').html('R$ '+gtmCart.formatCurrency(cartForm.value));
			gtmCart.enableCart();	

		} else {
			$('.cart-calc').hide();
			$('.vtexsc-productList').html('');
			$('.resumo-total-cart').html('R$ 0,00');
			
		}

		$('.cart-footer').show();

		//$('.mini-cart .total-qty').html(totalItens);
		$('.cart-wrap').show();
	},	

	skuRemove:function()
	{
		$('body').on('click', '.cartSkuRemove', function(){
			var keyRemove = parseInt($(this).attr('data-index'));
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
	console.log('teste');
	gtmCart.init();
})