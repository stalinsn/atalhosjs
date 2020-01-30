$(document).ready(function(){
    $('#giftlistv2save').on('click', function(){

	var TipoLista = $('#giftlisttype option:selected').text();
	var NomeLista = $('#giftlistname').val();
	var UrlLista = $('#giftlisturl').val();
	var DataEvento = $('#giftlisteventdate').val();
	var LocalEvento = $('#giftlisteventlocation').val();
	var CidadeEvento = $('#giftlisteventcity').val();
	var EstadoEvento = $('#giftlisteventstate').val();
	var NoivaTitulo = $('#membertitle1').val();
    var NoivaNome = $('#membername1').val();
    var NoivaSobrenome = $('#membersurname1').val();
	var NoivaCPF = $('#cpf_noiva').val();
    var NoivaWhatsapp = $('#wpp_noiva').val();
    var NoivoNome = $('#membername2').val();
    var NoivoSobrenome = $('#membersurname2').val();
    var EntregaCEP = $('#ship-postal-code').val();
    var EntregaRua = $('#ship-street').val();
    var EntregaNumero = $('#ship-number').val();
    var EntregaComplemento = $('#ship-more-info').val();
    var EntregaReferencia = $('#ship-reference').val();
    var EntregaBairro = $('#ship-neighborhood').val();
    var EntregaCidade = $('#ship-city').val();
    var EntregaEstado = $('#ship-state').val();
    var EntregaEstado2 = $('#ship-state-alternate').val();
    var TipoEnderecoComercial  = $('#ship-commercial').is(":checked");
    var QuemRecebera = $('#ship-name').val();
    var Mensagem = $('#giftlistmessage').val();

    if (NomeLista == "") {
		$("#giftlistname").css('border', '1px dotted red').attr('placeholder', 'Nome da Lista!').focus();
	} else if (DataEvento == "") {
		$("#giftlisteventdate").css('border', '1px dotted red').focus();
	}else if (NoivaNome == "Participante") {
		$("#membername1").css('border', '1px dotted red').attr('placeholder', 'Preencha seu Nome').focus();  
	}else if (NoivaCPF == "") {
		$("#cpf_noiva").css('border', '1px dotted red').focus();  
	}else if (NoivaWhatsapp == "") {
		$("#wpp_noiva").css('border', '1px dotted red').focus();  
	} else {
		var			   
		apiUrl = '/api/dataentities/LC/documents',
		fields = {			
			tipoLista: TipoLista,
            nomeLista: NomeLista,
            urlLista: UrlLista,
            dataEvento: DataEvento,
            localEvento: LocalEvento,
            cidadeEvento: CidadeEvento,
            estadoEvento: EstadoEvento,
            noivaTitulo: NoivaTitulo,
            noivaNome: NoivaNome,
            noivaSobrenome: NoivaSobrenome,
            noivaCpf: NoivaCPF,
            noivaWhatsapp: NoivaWhatsapp,
            noivoNome: NoivoNome,
            noivoSobrenome: NoivoSobrenome,
            entregaCep: EntregaCEP,
            entregaRua: EntregaRua,
            entregaNumero: EntregaNumero,
            entregaComplemento: EntregaComplemento,
            entregaReferencia: EntregaReferencia,
            entregaBairro: EntregaBairro,
            entregaCidade: EntregaCidade,
            entregaEstado: EntregaEstado,
            entregaEstado2: EntregaEstado2,
            entregaTipoEndereco: TipoEnderecoComercial,
            entregaDestinatario: QuemRecebera,
            mensagem: Mensagem
		};

		$.ajax({
			'headers': {
				'Accept': 'application/json',
				'Content-Type': 'application/json'						
			},
			'url': apiUrl,
			'async' : false,
			'crossDomain': true,
			'type': 'PATCH',
			'data': JSON.stringify(fields)
		}).success(function(data) {
//             console.log('resultado: ', fields)
		}).fail(function(data) {
//             console.log('falha: ', fields)
		});
	}
});

    var fieldCpf = '<li class="membersurname1 fieldcpf">'+
    '<label for="membercpf">'+
    'CPF Noiva'+
    '</label>'+
    '<input type="text"  maxlength="100" id="cpf_noiva" name="cpf_noiva" placeholder="CPF">'+
        '<span name="membercpfobr" id="membercpfobr" class="obr" style="display: inline-block;">'+
        '*</span>'+
    '</li>';
    var fieldWpp = '<li class="membername1 fieldwpp">'+
    '<label for="memberwpp">'+
    'WhatsApp Noiva'+
    '</label>'+
    '<input type="text" maxlength="100" id="wpp_noiva" name="wpp_noiva" placeholder="WhatsApp">'+
        '<span name="memberwppobr" id="memberwppobr" class="obr" style="display: inline-block;">'+
        '*</span>'+
    '</li>';
    setTimeout(function(){
        $(fieldCpf).insertAfter('li.membersurname1');
        $(fieldWpp).insertAfter('.fieldcpf');
    },500)
})