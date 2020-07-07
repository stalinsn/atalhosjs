 var itemsArr = vtexjs.checkout.orderForm.items; // verifica todos os items do carrinho
    var totArr = [0]; // cria um array vazio para somar o total dos produtos
    for(var i = 0; i < itemsArr.length; i++){ // percorrer todos os items
        var itemQtty = vtexjs.checkout.orderForm.items[i].quantity; 
        var itemGift = vtexjs.checkout.orderForm.items[i].isGift; // verifica se é brinde ou não
        var itemVal = vtexjs.checkout.orderForm.items[i].price;
        var itemTot = itemQtty*itemVal;
        if(itemGift == false){//se não for brinde, ele considera e grava os valores no array
            totArr.push(itemTot);
        }
    }
    var orderPrice = totArr.reduce((total, currentElement) => total + currentElement); //Total do valor do carrinho
