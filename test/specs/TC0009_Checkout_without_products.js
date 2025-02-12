import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';

describe('Checkout', () => {
    it('Checkout without products', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce'); 

        await inventoryPage.cartClick();
        expect (await cartPage.cartContents.getValue()).toHaveValue(null)
        await cartPage.checkout();

        expect(await cartPage.isEmptyCartCheckoutCorrect()).toBeTruthy();

    });
});