const { $ } = require('@wdio/globals')
const Page = require('./page');

class InvoicePage extends Page {
    get invoice () {
        return $('a.btn.btn-sm.mr-1')
    }

    get infInvoiceNumber () {
        return $('[data-test="invoice-number"]');
    }

    get btnDownload () {
        return $('[data-test="download-invoice"]');
    }
    
    open () {
        return super.open('account/invoices');
    }
}

module.exports = new InvoicePage();
