var cartWidget = {};

(function (cartWidget) {
    const productsStorageKey = 'products';

    cartWidget.elem = {};
    cartWidget.products = {};

    cartWidget.create = function () {
        this.elem = $('.cart-widget');

        if (localStorage !== null && localStorage !== undefined) {
            var savedProducts = getProductsFromLocalStorage();

            if (savedProducts !== null) {
                cartWidget.products = savedProducts;
            }
            else {
                localStorage.setItem(productsStorageKey, JSON.stringify({}));
            }
        }

        redraw();
    }

    cartWidget.addProduct = function (product) {
        var savedProduct = this.products[product.id];

        if (savedProduct === null || savedProduct === undefined) {
            product.count = 1;
            this.products[product.id] = product;
        }
        else {
            this.products[product.id].count++;
        }

        this.setToStorage(this.products[product.id]);
        redraw();
    }

    cartWidget.removeProduct = function (productId) {
        var savedProduct = this.products[productId];

        if (savedProduct === null || savedProduct === undefined) {
            return;
        }

        savedProduct.count--;

        if (savedProduct.count === 0) {
            delete this.products[productId];
            this.removeFromStorage(productId);
        }
        else {
            this.setToStorage(savedProduct);
        }

        redraw();
    }

    cartWidget.getProductCount = function (productId) {
        var savedProduct = this.products[productId];

        if (savedProduct === null || savedProduct === undefined) {
            return 0;
        }

        return savedProduct.count;
    }

    cartWidget.setToStorage = function (product) {
        var products = $.parseJSON(localStorage.getItem(productsStorageKey));
        products[product.id] = product;
        localStorage.setItem(productsStorageKey, JSON.stringify(products));
    }

    cartWidget.loadFromStorage = function (productName) {
        var products = $.parseJSON(localStorage.getItem(productsStorageKey));
        return products[productName];
    }

    cartWidget.removeFromStorage = function (productId) {
        var products = $.parseJSON(localStorage.getItem(productsStorageKey));
        delete products[productId];
        localStorage.setItem(productsStorageKey, JSON.stringify(products));
    }

    var redraw = function() {
        var productsElem = cartWidget.elem.find('.products');
        productsElem.empty();

        var totalPriceElem = cartWidget.elem.find('.total-price');
        totalPriceElem.empty();

        var totalPrice = 0;

        for (var productId in cartWidget.products) {
            if (cartWidget.products.hasOwnProperty(productId) && product !== null) {
                var product = cartWidget.products[productId];
                var currentPrice = product.price * product.count;

                var productElem = $(
                    '<tr>' +
                        '<td><a href="/product/' + productId + '">' + product.name + '</a></td>' +
                        '<td>' + product.count + '</td>' +
                        '<td>' + currentPrice + '</td>' +
                    '</tr>'
                );

                productsElem.append(productElem);

                totalPrice += currentPrice;
            }
        }

        totalPriceElem.append($('<span>Общая стоимость: ' + totalPrice + '</span>'));
    }

    var getProductsFromLocalStorage = function () {
        return $.parseJSON(localStorage.getItem(productsStorageKey));
    }
})(cartWidget);