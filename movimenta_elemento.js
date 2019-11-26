$(window).load(function() {    
    if (window.location.href.indexOf("/diretorio") == -1 || window.location.href.indexOf("/diretorio_2") == -1) { //verifica se o link pertence a esse diretorio ou extensao
        $(".classe-pai-1.classe-pai-2 .classe-filho-1").append($(".classe-div-receptora")); //primeiro para onde vai, depois o que irá receber   
    }
})