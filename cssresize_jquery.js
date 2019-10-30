$(window).resize(function(){
    if (window.matchMedia('(max-width: 768px)').matches){
        $('.home .btn.w-qty a:nth-child(2)').css('color','redr')
    }else{
		 $('.home .btn.w-qty a:nth-child(2)').css('color','blue')
	}
});