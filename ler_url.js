$(document).ready(function(){
	setTimeout(function(){
		url_atual = window.location.href.split('busca/')[1].slice(6,9);
		if(url_atual == '456'){
			$("p.flag.black-friday-2019").css( "display","block");
		}
	}, 300);
});