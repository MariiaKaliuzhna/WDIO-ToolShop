const { $ } = require('@wdio/globals')
const Page = require('./page');

class ProfilePage extends Page {
    get inputNumber () {
        return $('#phone');
    }

    get btnUpdate () {
        return $('[data-test = update-profile-submit]');
    }

    get msgConfirmation () {
        return $('.alert-success');
    }

    open () {
        return super.open('account/profile');
    }
}

module.exports = new ProfilePage();