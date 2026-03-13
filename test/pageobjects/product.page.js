const { $ } = require('@wdio/globals')
const Page = require('./page');

class ProductPage extends Page {
    get btnAddToFavourites () {
        return $('[data-test=add-to-favorites]');
    }

    get btnAddToCart () {
        return $('[data-test=add-to-cart]');
    }

    get msgAdding () {
        return $('[role=alert]');
    }

    get cartIndicator () {
        return $('#lblCartCount');
    }
}

module.exports = new ProductPage();
