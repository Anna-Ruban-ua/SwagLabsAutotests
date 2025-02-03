describe('Login tests', () => {
    it('Valid Login', async () => {
        await browser.url('https://www.saucedemo.com/v1/index.html');

        const usernameField = await $('#user-name');
        await usernameField.setValue('standard_user');

        const usernameValue = await usernameField.getValue();
        expect(usernameValue).toBe('standard_user');

        const passwordField = await $('#password');
        await passwordField.setValue('secret_sauce');

        const passwordType = await passwordField.getAttribute('type');
        expect(passwordType).toBe('password');

        const loginButton = await $('#login-button');
        await loginButton.click();

        const inventoryPage = await $('.inventory_list');
        const cartIcon = await $('.shopping_cart_link');

        await expect(inventoryPage).toBeDisplayed();
        await expect(cartIcon).toBeDisplayed();

    });
});