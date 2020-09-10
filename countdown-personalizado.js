// inserir dentro de um html placeholder com o seu banner junto
<div class="result-counter"></div> //o valor será carregado aqui
<div class="timer-counter" >
    <div class="ano-mes-dia">
        2020-09-09        
    </div>
    <div class="hora-minuto-segundo">
        15-35-00
    </div>
</div>//inserir os dados conforme o exemplo, as classes servem apenas como referencia da ordem

function countdown(obj){    
        let dataT = $(obj).find('.ano-mes-dia').text().trim();//verifica a data prazo
        let tempoT = $(obj).find('.hora-minuto-segundo').text().trim().replaceAll('-',':'); // verifica o horário prazo
        let prazo = dataT + ' ' + tempoT; // constrói a string do prazo
        let validade = Math.abs((new Date(prazo).getTime() / 1000).toFixed(0)) // formata o prazo definido para cálculo
        let horaLocal = Math.abs((new Date().getTime() / 1000).toFixed(0)) // formata o horário local para cálculo
        let diferenca = validade - horaLocal; // realiza a diferença entre as duas definições anteriores e gera um número que representa esse horário
        let dias = Math.floor(diferenca/ 86400); // conversao da diferenca para dias
        let horas = Math.floor(diferenca / 3600) % 24; // conversao da diferenca para horas
        let minutos = Math.floor(diferenca / 60) % 60; // conversao da diferenca para minutos
        let segundos = diferenca % 60; // conversao da diferenca para segundos
        let resultado = 'Termina em: '+ dias + ' ' + (dias < 2 ? 'dia' : 'dias')+ ' ' + horas + ':' + minutos + ':'+ segundos; //variável com o retorno completo
        if(dataT && diferenca > 0 ){
           $(obj).parent().find('.result-counter').html(resultado) //imprime o resultado dentro do counter
        }else if(diferenca <= 0){
          $(obj).parent().find('.result-counter').html('Oferta Encerrada')
        }
    }
    $(document).ready(function(){
        $('.banner-list__item').each(function(){ //faz isso para todos os cards definido
            let timerSetter = $(this).find(".timer-counter"); //seleciona a div com o parâmetro para aquele card
            setInterval(function(){    
                countdown(timerSetter);
            }, 1000)    
        })
    })
