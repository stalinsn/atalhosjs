//Verifica_metodo_pagamento_checkout caso seja via CardPromissory (id: 601)
  
$(document).ready(function(){
  function verificaPgto(tipo){ 
      return vtexjs.checkout.orderForm.paymentData.paymentSystems.filter(function(item){
              return item.id == tipo;        
          }
      )
  }
  function carregaBox(){    
      if((verificaPgto(601).length > 0) && ($(".box-mensagem").length != 1)){
          var boxMsg = `
              <div class="box-mensagem" style="padding: 25px; background-color: #f9f9f9;">
                  <div class="box-mensagem--inner" style="background-color:#f6f6f6; padding: 5px;">
                      <button class="mensagem-personalizada" style="height: 40px; line-height: 0; padding: 15px; margin: 0px 5%; border-radius: 5px; border: 0; color: #fff; font-weight: bold; background-color: #9f6949;"> Mensagem Personalizada </button>
                      <form class="form-carta" style="display:none;">
                          <label style="color: #000000; font-size: 16px; font-family: 'Gotham', serif; font-weight: 800; margin: 10px 5%;">Mensagem na Carta</label>
                          <textarea name="mensagem-carta" id="mensagem-carta" cols="50" rows="5" style="width: 90%; margin: 10px 5%;"></textarea>
                          <button style="height: 40px; line-height: 0; padding: 15px; margin: 0px 5%; border-radius: 5px; border: 0; color: #fff; font-weight: bold; background-color: #9f6949;"> Confirmar Mensagem </button>
                      </form>                         
                  </div>
                  <div class="form-carta--success" style="display: none;">A mensagem foi registrada com sucesso</div>
              </div>
          `;        
          var boxPgtos = $("#payment-data");

          setTimeout(() => {
              $(boxPgtos).append(boxMsg);
              $(".mensagem-personalizada").on('click',function(){
                  $(".form-carta").toggle(250);
                  $(this).toggle(250);
              });
  
              var formCarta = $('.form-carta');
              var formCartaSuccess = $('.form-carta--success');
              var msgCarta = $('#mensagem-carta');
  
              formCarta.on('submit', function(e){
                  e.preventDefault();
                  if((msgCarta.val() == "") || (msgCarta.val() == "Preencha por favor")){
                      msgCarta.val('Preencha por favor');
                      msgCarta.focus();
                  }else{            
                      vtexjs.checkout.getOrderForm().then(function (orderForm){
                          var msg = msgCarta.val();
                          return vtexjs.checkout.sendAttachment('openTextField', { value: 'Mensagem de carta à mão: ' + msg });
                          }).done(function (orderForm) {
                          console.log(orderForm.openTextField);
                          formCarta.hide();
                          formCartaSuccess.show();
                          })
                                      
                  }
              }); 
          }, 500);
      }else{
          clearInterval(boxCarregada);
      }
  
  }
  var boxCarregada = setInterval(() => {
          carregaBox();
          if($(".box-mensagem").length > 0){
              clearInterval(boxCarregada);    
          }
      }, 2000);
  
$("#cart-to-orderform").on('click', function(){
    carregaBox();
  })
})
