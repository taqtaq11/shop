(function () {
    cartWidget.create();

    $('.buy-control.minus').on('click', function (e) {
        var sender = $(e.target).parent();
        var productId = sender.attr('product-id');

        cartWidget.removeProduct(productId);
        updateProductCount(sender, productId);
    });

    $('.buy-control.plus').on('click', function (e) {
        var sender = $(e.target).parent();

        var product = {};
        product.id = sender.attr('product-id');
        product.name = sender.attr('product-name');
        product.price = sender.attr('product-price');

        cartWidget.addProduct(product);
        updateProductCount(sender, product.id);
    });

    function updateProductCount(sender, productName) {
        var buyControlInput = sender.find('.text');
        buyControlInput.val(cartWidget.getProductCount(productName));
    }

    var buyControls = $('.buy-control.text');
    buyControls.each(function () {
        var sender = $(this).parent();
        var productId = sender.attr('product-id');
        updateProductCount(sender, productId);
    })
})();