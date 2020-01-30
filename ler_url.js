$(document).ready(function(){
	setTimeout(function(){
		url_atual = window.location.href.split('busca/')[1].slice(6,9);
		if(url_atual == '456'){
			$("p.flag.black-friday-2019").css( "display","block");
		}
	}, 300);
});

$(document).ready(function(){
	var url_atual = window.location.href.split('/')[3].slice(0,25); //verificar qual a extensao da pagina ate 25 caracteres
	if(url_atual == 'lentes-para-oculos-de-sol'){ //se a url atual atender a essa condicao
		$('.navigation-tabs').addClass('mod_nav-tabs'); //adiciona a classe sem modificar a original
		$('.shelf-content').addClass('mod_shelf-content'); 
		$('.prateleira.vitrine ul').addClass('mod_vit-ul');
	}
});

@media (min-width: 1150px){
    .mod_nav-tabs{
        display: none;
    }
    .mod_shelf-content {
        width: 100%;
    }
    .mod_vit-ul {
        width: 20%;
    }
}