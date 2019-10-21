$(document).ready(function(){
	setTimeout(function(){
		var url_atual = window.location.href.split('/')[3].slice(11,14);
		if(url_atual == '456'){
			$("p.flag.black-friday-2019").css( "display","block");
		}
	}, 300);
});