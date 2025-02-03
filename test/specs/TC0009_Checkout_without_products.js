describe('Checkout', () => {
    it('Checkout without products', async () => {
        await browser.url('https://www.saucedemo.com/v1/index.html');

        const usernameField = await $('#user-name');
        await usernameField.setValue('standard_user');

        const passwordField = await $('#password');
        await passwordField.setValue('secret_sauce');

        const loginButton = await $('#login-button');
        await loginButton.click();

        const inventoryPage = await $('.inventory_list');
        await expect(inventoryPage).toBeDisplayed();

        const cartButton = await $('[data-icon="shopping-cart"]');
        await cartButton.click();

        const cartPage = await $('.cart_list');
        await expect(cartPage).toBeDisplayed();
        const cartItems = await $$('.cart_item');
        await expect(cartItems.length).toBe(0);

        const checkoutButton = await $('.checkout_button');
        await checkoutButton.click();

        const cartPageTitle = await $('.subheader');
        await expect(cartPageTitle).toHaveText('Your Cart');

        const errorMessage = await $('.error-message-container');
        await expect(errorMessage).toBeDisplayed();
        await expect(errorMessage).toHaveTextContaining('Cart is empty');        
    });
});