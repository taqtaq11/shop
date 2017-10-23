var cartWidget = {};

(function (cartWidget) {
    const productsStorageKey = 'products';

    cartWidget.elem = {};
    cartWidget.products = {};

    cartWidget.create = function () {
        this.elem = $('.cart-widget');

        if (localStorage !== null && localStorage !== undefined) {
            var savedProducts = localStorage.getItem(productsStorageKey);

            if (savedProducts === null) {
                savedProducts = {};
                localStorage.setItem(productsStorageKey, savedProducts);
            }
            else {
                cartWidget.products = savedProducts;
            }
        }
    }

    cartWidget.addProduct = function (product) {
        var savedProduct = this.products[product];

        if (savedProduct === null || savedProduct === undefined) {
            this.products[product] = 1;
        }
        else {
            this.products[product]++;
        }
    }

    cartWidget.removeProduct = function (product) {
        var savedProduct = this.products[product];

        if (savedProduct !== null && savedProduct !== undefined) {
            if (savedProduct > 1) {
                this.products[product]--;
            }
            else {
                this.products[product] = null;
            }
        }
    }

    cartWidget.getProductCount = function (product) {
        return this.products[product];
    }

    cartWidget.saveToStorage = function (product, count) {
        localStorage.setItem(product, count);
    }

    cartWidget.loadFromStorage = function (product) {

    }

    function redraw() {
        this.elem
    }

})(cartWidget);