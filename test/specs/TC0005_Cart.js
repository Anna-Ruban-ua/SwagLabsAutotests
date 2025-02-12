import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';

describe('Cart', () => {
    it('Saving the card after logout', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        expect(await inventoryPage.isPageLoaded()).toBeTruthy();

        await inventoryPage.addItemToCart(1);

        const productNameInCatalog = await inventoryPage.getProductName(1);
        
        await inventoryPage.cartClick();
        expect(await cartPage.getProductName(0)).toHaveValue(productNameInCatalog);
        
        await inventoryPage.logout();
        await loginPage.login('standard_user', 'secret_sauce'); 
        await inventoryPage.cartClick();

        expect(await cartPage.getProductName(0)).toHaveValue(productNameInCatalog);
    });
});