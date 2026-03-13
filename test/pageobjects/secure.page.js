const { $ } = require('@wdio/globals')
const Page = require('./page');

class SecurePage extends Page {

    get title () {
        return $('[data-test="page-title"]');
    }

    get linkToProfile () {
        return $('[routerlink = profile]');
    }

    get linkToInvoices () {
        return $('[routerlink=invoices]');
    }

    open () {
        return super.open('account');
    }
}

module.exports = new SecurePage();
