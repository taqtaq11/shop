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
                cartWidget.products = savedProducts
            }
        }

        redraw();
    }

    cartWidget.addProduct = function (productName) {
        var savedProduct = this.products[productName];

        if (savedProduct === null || savedProduct === undefined) {
            this.products[productName] = 1;
        }
        else {
            this.products[productName]++;
        }

        this.setToStorage(productName, this.products[productName]);
        redraw();
    }

    cartWidget.removeProduct = function (productName) {
        var savedProduct = this.products[productName];

        if (savedProduct === null || savedProduct === undefined || savedProduct === 0) {
            return;
        }

        this.products[productName]--;

        if (this.products[productName] === 0) {
            this.products[productName] = null;
            this.removeFromStorage(productName);
        }
        else {
            this.setToStorage(productName, this.products[productName]);
        }

        redraw();
    }

    cartWidget.getProductCount = function (productName) {
        return this.products[productName];
    }

    cartWidget.setToStorage = function (product, count) {
        localStorage.setItem(productsStorageKey + '_' + product, count);
    }

    cartWidget.loadFromStorage = function (product) {
        return localStorage.getItem(productsStorageKey + '_' + product);
    }

    cartWidget.removeFromStorage = function (product) {
        localStorage.removeItem(productsStorageKey + '_' + product);
    }

    var redraw = function() {
        var productsElem = cartWidget.elem.find('.products');
        productsElem.empty();

        for (var productName in cartWidget.products) {
            if (cartWidget.products.hasOwnProperty(productName) &&
                cartWidget.products[productName] !== null) {
                var productElemContent = productName;

                if (cartWidget.products[productName] > 1) {
                    productElemContent += ' x' + cartWidget.products[productName];
                }

                var productElem = $('<div class="product">' + productElemContent + '</div>');

                productsElem.append(productElem);
            }
        }
    }

    var getProductsFromLocalStorage = function () {
        var products = {};

        for (var key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                var value = localStorage[key];

                if (key.indexOf(productsStorageKey) !== -1) {
                    var productName = key.split('_')[1];
                    products[productName] = value;
                }
            }
        }

        return products;
    }
})(cartWidget);