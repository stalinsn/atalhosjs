//usando_local_storage.js

function armazenaInfo(){
    //Armazena os dados do formulário em variáveis
    var infoDesc = document.getElementById('descProd'); //Seleciona os campos que serão armazenados no Local Storage
    var infoQtd = document.getElementById('descQtd'); 

    //Os dados inseridos no local Storage precisam ser transformados em String
    var dados = JSON.parse(localStorage.getItem('infoDados'));//Captura os dados do Local Storage caso existam

    //Caso não exista a estrutura infoDados, vamos criar um campo no localstorage chamado infoDados que receberá um array
    if(dados == null){ 
        localStorage.setItem("infoDados", "[]"); //Criamos a estrutura para o localStorage
        dados = []; //Aguardamos as informações
    }

    //Criamos um array para receber os valores dos campos selecionados
    var popArr = {
        descricao: infoDesc.value,
        quantidade: infoQtd.value
    }

    //Populando o Array que será inserido no Local Storage
    dados.push(popArr);

    //Agora populamos o Local Storage com as novas informações vindas do array dados
    localStorage.setItem("infoDados", JSON.stringify(dados));
    console.log("Registro inserido");// notifica a execução da função

    //Reseta os campos após a execução
    infoDesc.value = "";
    infoQtd.value = "";
}
