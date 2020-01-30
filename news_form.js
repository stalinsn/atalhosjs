var IsEmail = function(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email.trim());
  }
$('#news .submit').on('click', function(){
    
	var txtName = $('#news_nome').val();
	var	txtEmail = $('#news_email').val().trim();
	var txtSurname = $('#news_sobrenome').val();
	var txtGender = $('#news_genero').val();
    if (txtEmail == ' ') {
		$('#news_email').addClass('empty').focus();			        

	} else if (!IsEmail(txtEmail)) {
		$('#news_email').addClass('empty').focus();        

	} else {
		var			   
		apiUrl = '/api/dataentities/FD/documents',
		fields = {			
			Nome: txtName,
            Sobrenome: txtSurname,
            Email: txtEmail,
			Sexo: txtGender
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
			$('.titulo').hide();		    	
			$('.fields').hide();
			$('.submit').hide();
			$('.success').show();

		}).fail(function(data) {
		});				    
	}
});

