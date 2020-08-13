
// Configurações

//seller para desconsiderar (Regra para validar o Seller que traz as categorias dos cadastros dos produtos na VTEX)
var affiliationSeller = 'vivo-marketplace'

// Categorias de busca (colocar a categoria conforme cadastrado no painel da VTEX, incluindo acentos)

//Banner Prioridade Categoria 1
var cat1 = 'Smartphones'
var bannerCat1 = 'vivo-fibra-loja-vivo-d.jpg'
var bannerCat1m = 'vivo-fibra-loja-vivo-m.jpg'
var linkBanner1 = 'http://www.vivo.com.br/para-voce/produtos-e-servicos/para-casa/internet#.html'
//Banner Prioridade Categoria 2
var cat2 = 'Áudio'
var bannerCat2 = 'vivo-fibra-loja-vivo-d.jpg'
var bannerCat2m = 'vivo-fibra-loja-vivo-m.jpg'
var linkBanner2 = 'http://www.vivo.com.br/para-voce/produtos-e-servicos/para-casa/internet#.html'
//Banner Genérico
var bannerGen = 'vivo-fibra-loja-vivo-d.jpg'
var bannerGenm = 'vivo-fibra-loja-vivo-m.jpg'
var linkGen = 'http://www.vivo.com.br/para-voce/produtos-e-servicos/para-casa/internet#.html'



//lib minificada
setTimeout(() => {
for(var tipos=[],categArr=[],i=0;i<dataLayer.length;i++)dataLayer[i].ecommerce&&tipos.push(dataLayer[i].ecommerce);for(var vendas in tipos){var qual=tipos[vendas];if(qual.purchase.actionField.affiliation!=affiliationSeller)for(var produtos=qual.purchase.products,j=0;j<produtos.length;j++){var detectada=produtos[j].category;categArr.push(detectada)}}var categs=categArr.join("/").split("/");function loadBanner(e,a,r){var n="/arquivos/"+e,t='<div class="order_placed-banner">    <a href="'+r+'" target="_blank" rel=”noreferrer noopener”>    <picture>    <source media="(min-width:768px)" srcset="'+n+'">    <source media="(max-width:767px)" srcset="'+("/arquivos/"+a)+'">    <img src="'+n+'" style="width:auto;">    </picture>    </a>    </div>';document.querySelector("#checkout-confirmation-footer").insertAdjacentHTML("beforebegin",t)}categs.indexOf(cat1)>-1?loadBanner(bannerCat1,bannerCat1m,linkBanner1):categs.indexOf(cat2)>-1?loadBanner(bannerCat2,bannerCat1m,linkBanner1):loadBanner(bannerGen,bannerGenm,linkGen);
}, 3000);

//Lib Aberta
setTimeout(() => {
    var tipos = []
    var categArr = []
    for(var i = 0; i < dataLayer.length; i++){
        if(dataLayer[i].ecommerce){
            tipos.push(dataLayer[i].ecommerce)
        }
    }
    for(var vendas in tipos){
        var qual = tipos[vendas];
        if(qual.purchase.actionField.affiliation != affiliationSeller){
            var produtos = qual.purchase.products
            for(var j = 0; j < produtos.length; j++){
                var detectada = produtos[j].category
                categArr.push(detectada)
            }
        }
        
    }
    var categs = categArr.join('/').split('/')

    if(categs.indexOf(cat1) > -1){
        loadBanner(bannerCat1, bannerCat1m, linkBanner1)
    }else if(categs.indexOf(cat2) > -1){
        loadBanner(bannerCat2, bannerCat1m, linkBanner1)
    }else{
        loadBanner(bannerGen, bannerGenm, linkGen)    
    }

    function loadBanner(bannerLoaded, bannerLoadedm, linkBanner){
        var linkAbbr = '/arquivos/'
        var footerPage = document.querySelector('#checkout-confirmation-footer');
        var urlImageDesktop = linkAbbr+bannerLoaded; //URL da imagem desktop
        var urlImageMobile = linkAbbr+bannerLoadedm; //URL da imagem Mobile
        var hrefBanner = linkBanner; //Link de redirecionamento
        var htmlBanner =
        '<div class="order_placed-banner">\
        <a href="'+ hrefBanner +'" target="_blank" rel=”noreferrer noopener”>\
        <picture>\
        <source media="(min-width:768px)" srcset="' + urlImageDesktop + '">\
        <source media="(max-width:767px)" srcset="' + urlImageMobile + '">\
        <img src="' + urlImageDesktop + '" style="width:auto;">\
        </picture>\
        </a>\
        </div>';
        
        footerPage.insertAdjacentHTML('beforebegin', htmlBanner);
    }
}, 3000);