import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';

describe('Checkout', () => {
    it('Checkout without products', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce'); 

        await InventoryPage.cartClick();
        expect (await CartPage.cartContents.getValue()).toBe(null)
        await CartPage.checkout();

        expect(await CartPage.isEmptyCartCheckoutCorrect()).toBeTruthy();

    });
});