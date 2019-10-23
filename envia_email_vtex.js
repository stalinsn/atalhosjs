var IsEmail = function(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email.trim());
  }
$('body').on('submit', '#bn-newsletter', function(e){
	e.preventDefault();

	var	txtEmail = $('#FormValue_EmailAddress2').val().trim();
	//txtName = $('.newsletter #txtname').val();

	// if (txtName == '') {
	// 	$('.newsletter #txtname').addClass('empty').focus();			        

    // } else
    if (txtEmail == ' ') {
		$('#FormValue_EmailAddress2').addClass('empty').focus();			        

	} else if (!IsEmail(txtEmail)) {
		$('#FormValue_EmailAddress2').addClass('empty').focus();        

	} else {
		$('#bn-newsletter').addClass('load').find('.send').val('Aguarde');

		var			   
		apiUrl = '/api/dataentities/SN/documents',
		fields = {
			Email: txtEmail,
			//name: txtName,
			// isNewsletterOptIn: true
		};

		$.ajax({
			'headers': {
				'Accept': 'application/json',
				'Content-Type': 'application/json'						
			},
			'url': apiUrl,
			'async' : false,
			'crossDomain': true,
			'type': 'PUT',
			'data': JSON.stringify(fields)

		}).success(function(data) {				    	
			$('.elem-2').hide();		    	
			$('.elem-3').hide();
			$('.cadastre-msg-confirmado').show();
			// $('.newsletter').removeClass('load');

		}).fail(function(data) {				    	
            //$('.newsletter #send-news').hide();
            // alert('Algo deu errado.');
			// $('.newsletter .alert .error').show();
			// $('.newsletter .send').removeClass('load');
		});				    
	}
});


$('body').on('submit', '#bn-newsletter-mb', function(e){
	e.preventDefault();

	var	txtEmail = $('#FormValue_EmailAddress2-mb').val().trim();
	//txtName = $('.newsletter #txtname').val();

	// if (txtName == '') {
	// 	$('.newsletter #txtname').addClass('empty').focus();			        

    // } else
    if (txtEmail == ' ') {
		$('#FormValue_EmailAddress2-mb').addClass('empty').focus();			        

	} else if (!IsEmail(txtEmail)) {
		$('#FormValue_EmailAddress2-mb').addClass('empty').focus();        

	} else {
		$('#bn-newsletter-mb').addClass('load').find('.send').val('Aguarde');

		var			   
		apiUrl = '/api/dataentities/SN/documents',
		fields = {
			Email: txtEmail,
			//name: txtName,
			// isNewsletterOptIn: true
		};

		$.ajax({
			'headers': {
				'Accept': 'application/json',
				'Content-Type': 'application/json'						
			},
			'url': apiUrl,
			'async' : false,
			'crossDomain': true,
			'type': 'PUT',
			'data': JSON.stringify(fields)

		}).success(function(data) {				    	
			$('.banner-mb .elem-2').hide();		    	
			$('.banner-mb .elem-3').hide();
			$('.banner-mb .cadastre-msg-confirmado').show();
			// $('.newsletter').removeClass('load');

		}).fail(function(data) {				    	
            //$('.newsletter #send-news').hide();
            // alert('Algo deu errado.');
			// $('.newsletter .alert .error').show();
			// $('.newsletter .send').removeClass('load');
		});				    
	}
});