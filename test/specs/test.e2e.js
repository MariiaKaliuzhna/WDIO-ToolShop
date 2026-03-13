const pages = require("../pageobjects");
const chai = require('chai');
const expectChai = chai.expect;
const { assert, should } = chai;
should();

describe('Profile tests', () => {
    beforeEach(async () => {
        await pages.LoginPage.open();
        await pages.LoginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
    });

    it('TC1 - should login with valid credentials', async () => {
        const text = await pages.SecurePage.title.getText();
        expectChai(text).to.include('My account');
    })

    it('TC2 - should successfully add number to profile', async () => {
        await pages.SecurePage.linkToProfile.click();
        await browser.pause(2000);
        await pages.ProfilePage.inputNumber.setValue('0101111111');
        await pages.ProfilePage.btnUpdate.click();

        const confirmation = pages.ProfilePage.msgConfirmation;
        expect(confirmation).toBeDisplayed();
        assert.equal(await confirmation.getText(), 'Your profile is successfully updated!');
    });

    it('TC4 - should add product to favourites', async () => {
        await pages.HomePage.open();
        await pages.HomePage.lookForProduct('cross-head screws');

        await pages.HomePage.cardProduct.click();
        await pages.ProductPage.btnAddToFavourites.click();
    
        const text = await pages.ProductPage.msgAdding.getText();
        expectChai(text).to.include('Product added to your favorites list.');
    });

    it('TC5 - should add product to cart', async () => {
        await pages.HomePage.open();
        await pages.HomePage.lookForProduct('cross-head screws');

        await pages.HomePage.cardProduct.click();
        await pages.ProductPage.btnAddToCart.click();

        const text = await pages.ProductPage.msgAdding.getText();
        expectChai(text).to.include('Product added to shopping cart.');

        const indicator = await pages.ProductPage.cartIndicator.getText();
        assert.equal(indicator, '1');

        await pages.CheckoutPage.open();
        const title = await pages.CheckoutPage.productTitle.getText();
        assert.equal(title, 'Cross-head screws ');
    });

    it('TC6 - should checkout successfully', async () => {
        await pages.HomePage.open();
        await pages.HomePage.lookForProduct('thor hammer');

        await pages.HomePage.cardProduct.click();
        await pages.ProductPage.btnAddToCart.click();

        await pages.CheckoutPage.open();
        await pages.CheckoutPage.btnContinue('1').click();
        await pages.CheckoutPage.btnContinue('2').click();

        await pages.CheckoutPage.fillingAddress('Test', '1');
        await pages.CheckoutPage.btnContinue('3').waitForClickable({ timeout: 2000 });
        await pages.CheckoutPage.btnContinue('3').click();

        await pages.CheckoutPage.listPayment.click();
        await pages.CheckoutPage.optionPayment.click();
        await pages.CheckoutPage.btnComplete.click();

        const message = await pages.CheckoutPage.msgCheckout.getText();
        expectChai(message).to.include('Payment was successful');

    });
    
    it('TC7 - should check invoices', async () => {
        await pages.SecurePage.linkToInvoices.click();
    
        await pages.InvoicePage.invoice.click();
        await expect(pages.InvoicePage.infInvoiceNumber).toExist();

        await expect(pages.InvoicePage.btnDownload).toBeClickable();
    })

});

describe('Guest test', () => {
    it('TC3 - should find exact product', async () => {
        await pages.HomePage.open();
        await pages.HomePage.lookForProduct('cross-head screws');

        const result = await pages.HomePage.cardProduct.getText();
        result.should.eql('Cross-head screws');
    });
});

describe('Negative testing', () => {
    it('TC1.1 - should display error while login with wrong email', async () => {
        await pages.LoginPage.open();
        await pages.LoginPage.login('test@test.com', 'welcome01');

        const error = await pages.LoginPage.error.getText();
        error.should.eql('Invalid email or password');
    });

    it('TC8 - should not display products when using zero price filter', async () => {
        await pages.HomePage.open();
        await pages.HomePage.filtering[0].click();
        await browser.keys(['Home']);
        await pages.HomePage.filtering[1].click();
        await browser.keys(['Home']);
        await browser.keys('Enter');

        await pages.HomePage.noResults.waitForDisplayed({ timeout: 1500 });
        const text = await pages.HomePage.noResults.getText();
        assert.equal(text, 'There are no products found.');
    });
});
