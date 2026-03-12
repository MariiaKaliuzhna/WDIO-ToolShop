const { $ } = require('@wdio/globals')
const Page = require('./page');

class SecurePage extends Page {

    get Title () {
        return $('[data-test="page-title"]');
    }

    open () {
        return super.open('account');
    }
}

module.exports = new SecurePage();
