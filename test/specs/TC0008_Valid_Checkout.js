import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';

describe('Checkout', () => {
    it('Valid Checkout', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce'); 

        await InventoryPage.addItemToCart(2);

        const productNameInCatalog = await InventoryPage.getProductName(2);
        await InventoryPage.cartClick();
        expect(await CartPage.getProductName(0)).toHaveValue(productNameInCatalog);
        
        const totalPriceFromCart = await CartPage.getTotalCartPrice();
        
        await CartPage.checkout();
        await expect(CheckoutPage.checkoutContainer).toBeDisplayed();

        await CheckoutPage.checkoutInput('Anna', 'Ruban', '04107');

        await CheckoutPage.clickContinue();
        await expect(CheckoutPage.checkoutSummary).toBeDisplayed();

        const displayedTotal = await CheckoutPage.getDisplayedTotalPrice();
        
        expect(displayedTotal).toBeCloseTo(totalPriceFromCart, 2);
        
        await CheckoutPage.clickFinish();
        expect(await CheckoutPage.isCheckoutCorrect()).toBeTruthy();

        await InventoryPage.backHome();
        expect (await InventoryPage.cartIcon).not.toBeDisplayed();
    });
});