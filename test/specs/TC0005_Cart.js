describe('Cart', () => {
    it('Saving the card after logout', async () => {
        await browser.url('https://www.saucedemo.com/v1/index.html');

        const usernameField = await $('#user-name');
        await usernameField.setValue('standard_user');

        const passwordField = await $('#password');
        await passwordField.setValue('secret_sauce');

        const loginButton = await $('#login-button');
        await loginButton.click();

        const inventoryPage = await $('.inventory_list');
        await expect(inventoryPage).toBeDisplayed();

        const productNames = await $$('[class="inventory_item_name"]');
        const productNameInCatalog = await productNames[1].getText();

        const addtocartButton = await $$('[class="btn_primary btn_inventory"]');
        await addtocartButton[1].click(); 

        const cartIcon = await $('.shopping_cart_badge');
        const cartCount = await cartIcon.getText();
        expect(cartCount).toBe('1');

        const cartButton = await $('[data-icon="shopping-cart"]');
        await cartButton.click();

        const cartProductNames = await $$('[class="inventory_item_name"]');
        const productInCart = await cartProductNames[0].getText();

        expect(productNameInCatalog).toBe(productInCart);

        const burgerButton = await $('[class="bm-burger-button"]');
        await burgerButton.click();
        await browser.pause(2000);

        const menuItems = await $$('#inventory_sidebar_link, #about_sidebar_link, #logout_sidebar_link, #reset_sidebar_link');
        expect(menuItems.length).toBe(4);

        const logoutButton = await $('#logout_sidebar_link');
        await logoutButton.click();

        await usernameField.setValue('standard_user');
        await passwordField.setValue('secret_sauce');
        await loginButton.click();
        await cartButton.click();

        expect(productNameInCatalog).toBe(productInCart);
        await browser.pause(2000);
    });
});