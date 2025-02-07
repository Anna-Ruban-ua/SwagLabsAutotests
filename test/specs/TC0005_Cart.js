import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';

describe('Cart', () => {
    it('Saving the card after logout', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        expect(await InventoryPage.isPageLoaded()).toBeTruthy();

        await InventoryPage.addItemToCart(1);

        const productNameInCatalog = await InventoryPage.getProductName(1);
        
        await InventoryPage.cartClick();
        expect(await CartPage.getProductName(0)).toBe(productNameInCatalog);
        
        await InventoryPage.logout();
        await LoginPage.login('standard_user', 'secret_sauce'); 
        await InventoryPage.cartClick();

        expect(await CartPage.getProductName(0)).toBe(productNameInCatalog);
    });
});