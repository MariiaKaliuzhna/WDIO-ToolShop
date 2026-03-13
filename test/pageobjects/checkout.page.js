const { $ } = require('@wdio/globals')
const Page = require('./page');

class CheckouttPage extends Page {
    get productTitle () {
        return $('.product-title');
    }

    btnContinue (num) {
        return $(`[data-test="proceed-${num}"]`);
    }

    get btnComplete () {
        return $('[data-test=finish]');
    }

    get listPayment () {
        return $('[data-test=payment-method]');
    }

    get optionPayment () {
        return $('[value=cash-on-delivery]');
    }

    get msgCheckout () {
        return $('.help-block');
    }

    get inputState () {
        return $('#state');
    }

    get inputPostalCode () {
        return $('#postal_code');
    }

    async fillingAddress (state, postalCode) {
        await this.inputState.setValue(state);
        await this.inputPostalCode.setValue(postalCode);
    }

    open () {
        return super.open('checkout');
    }
}

module.exports = new CheckouttPage();
