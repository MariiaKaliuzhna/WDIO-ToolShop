const pages = require("../pageobjects");
const { expect, assert, should } = require('chai')
should();

describe('Positive testing', () => {
    it('should login with valid credentials', async () => {
        await pages.LoginPage.open()
        await pages.LoginPage.login('customer@practicesoftwaretesting.com', 'welcome01')

        const text = await pages.SecurePage.Title.getText()

        expect(text).to.include('My account');
    })
});

describe('Negative testing', () => {
    it('should display error while login with wrong email', async () => {
        await pages.LoginPage.open();
        await pages.LoginPage.login('test@test.com', 'welcome01')

        const error = await pages.LoginPage.Error.getText()
        error.should.eql('Invalid email or password');
    })
});
