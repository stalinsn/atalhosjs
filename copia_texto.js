<div class="text-copy">
    <button onclick="copiaUrl()" onmouseout="outFunc()">
        <span class="tooltiptext" id="myTooltip">Copiar Link</span>Copiar URL do Carrinho
    </button>
</div>

function copiaUrl() {
    var copyText = document.getElementById("url-carrinho");
    copyText.select();
    document.execCommand("copy");
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copiado!";
}
function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copiar Link";
  }
  $(window).load(function(){
          vtexjs.checkout.getOrderForm().then(function(orderForm) {
              var checkoutID = orderForm.orderFormId;
            $("<div style='display:none;' id='monta-url'><input id='url-carrinho' type='text' value='https://www.sitedavtex.com.br/checkout/?orderFormId="+checkoutID+"#/cart' /><div class='text-copy'><button onclick='copiaUrl()' onmouseout='outFunc()'><span class='tooltiptext' id='myTooltip'>Copiar Link</span>Copiar URL do Carrinho</button></div></div>").appendTo("header .int");
          });
          
  })