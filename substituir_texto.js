
        $('.price-discount').each(function() {
            var text = $(this).html();
            $(this).html(text.replace('ou', '')); 
        });
        $('.price-discount .value').each(function() {
            var text = $(this).html();
            $(this).html(text.replace('ou', '')); 
        });