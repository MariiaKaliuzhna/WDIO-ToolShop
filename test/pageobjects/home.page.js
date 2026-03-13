const { $ } = require('@wdio/globals')
const Page = require('./page');

class HomePage extends Page {
    get inputSearch () {
        return $('#search-query');
    }

    get filtering () {
        return $$('[role=slider]');
    }

    get noResults () {
        return $('[data-test="no-results"]');
    }

    get btnSearch () {
        return $('[data-test="search-submit"]');
    }

    get cardProduct () {
        return $('.card-title');
    }

    async lookForProduct (product) {
        await this.inputSearch.setValue(product);
        await this.btnSearch.click();
        await browser.pause(1200);
    }

    open () {
        return super.open('');
    }
}

module.exports = new HomePage();