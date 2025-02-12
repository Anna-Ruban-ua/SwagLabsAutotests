import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import checkoutPage from '../pageobjects/checkout.page.js';

describe('Checkout', () => {
    it('Valid Checkout', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce'); 

        await inventoryPage.addItemToCart(2);

        const productNameInCatalog = await inventoryPage.getProductName(2);
        await inventoryPage.cartClick();
        expect(await cartPage.getProductName(0)).toHaveValue(productNameInCatalog);
        
        const totalPriceFromCart = await cartPage.getTotalCartPrice();
        
        await cartPage.checkout();
        await expect(checkoutPage.checkoutContainer).toBeDisplayed();

        await checkoutPage.checkoutInput('Anna', 'Ruban', '04107');

        await checkoutPage.clickContinue();
        await expect(checkoutPage.checkoutSummary).toBeDisplayed();

        const displayedTotal = await checkoutPage.getDisplayedTotalPrice();
        
        expect(displayedTotal).toBeCloseTo(totalPriceFromCart, 2);
        
        await checkoutPage.clickFinish();
        expect(await checkoutPage.isCheckoutCorrect()).toBeTruthy();

        await inventoryPage.backHome();
        expect (await inventoryPage.cartIcon).not.toBeDisplayed();
    });
});