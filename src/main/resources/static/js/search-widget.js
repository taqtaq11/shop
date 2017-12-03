(function () {
    $('.search .searchButton').on('click', function () {
        var searchPhrase = $('.search .searchPhrase').val();
        var sortDirection = $('.search .sortDirection').val();
        var minPrice = $('.search .minPrice').val();
        var maxPrice = $('.search .maxPrice').val();

        var url = window.location.pathname + '?';
        url += addParam('searchPhrase', searchPhrase, url);
        url += addParam('sortDirection', sortDirection, url);
        url += addParam('minPrice', minPrice, url);
        url += addParam('maxPrice', maxPrice, url);

        window.location.href =  url;
    });

    function addParam(paramName, paramValue) {
        if (paramValue !== undefined && paramValue !== null && paramValue.length > 0) {
            return '&' + paramName + '=' + paramValue;
        }

        return '';
    }

    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    function fillParams() {
        fillParam('searchPhrase');
        fillParam('sortDirection');
        fillParam('minPrice');
        fillParam('maxPrice');
    }
    
    function fillParam(paramName) {
        var paramValue = getUrlParameter(paramName);

        if (paramValue !== undefined && paramValue !== null && paramValue.length > 0) {
            $('.search .' + paramName).val(paramValue);
        }
    }

    fillParams();
})();