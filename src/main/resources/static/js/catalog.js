(function () {
    cartWidget.create();

    $('.buy-control.minus').on('click', function (e) {
        var sender = $(e.target);
        var productName = sender.attr('product-name');

        cartWidget.removeProduct(productName);
        updateProductCount(sender, productName);
    });

    $('.buy-control.plus').on('click', function (e) {
        var sender = $(e.target);
        var productName = sender.attr('product-name');

        cartWidget.addProduct(productName);
        updateProductCount(sender, productName);
    });

    function updateProductCount(sender, productName) {
        var buyControlInput = sender.parent().find('.text');
        buyControlInput.val(cartWidget.getProductCount(productName));
    }
})();