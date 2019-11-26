$('.box-links a').click(function(){
    let divModalBack = $('<div class="div-modal-home"><div class="div-modal-box">'+$(this).prev().text()+'</div></div>');	    
    $('.listas').prepend(divModalBack);
    $('.div-modal-home').fadeIn();             
    $('.div-modal-box').prepend($('.fechar-modal'));
    $('body').css('overflow','hidden');
    $('.fechar-modal').toggle();

    // $('.div-modal-box').prepend($('.calendar-hidden'));
    // $('.calendar-hidden').toggle();

});

$('.fechar-modal').click(function(){
    $('.icones-svg-modal').prepend($('.fechar-modal'));
    // $('.icones-svg-modal').prepend($('.calendar-hidden'));
    $('.fechar-modal').toggle();
    $('.div-modal-home').remove();
    $('body').css('overflow','unset');
});