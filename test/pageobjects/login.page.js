const { $ } = require('@wdio/globals')
const Page = require('./page');

class LoginPage extends Page {
    get inputEmail () {
        return $('#email');
    }

    get inputPassword () {
        return $('#password');
    }

    get Error () {
        return $('.help-block');
    }

    get btnSubmit () {
        return $('.btnSubmit');
    }

    async login (username, password) {
        await this.inputEmail.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    open () {
        return super.open('auth/login');
    }
}

module.exports = new LoginPage();
