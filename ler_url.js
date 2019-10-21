var url_atual = window.location.href;
url_atual.split('/')[3].slice(11,14);
if(url_atual == '456'){
    $("p.flag.black-friday-2019").css( "display","block");
}