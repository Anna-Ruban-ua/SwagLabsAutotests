describe('Login tests', () => {
    it('Logout', async () => {
        await browser.url('https://www.saucedemo.com/v1/index.html');

        const usernameField = await $('#user-name');
        await usernameField.setValue('standard_user');

        const passwordField = await $('#password');
        await passwordField.setValue('secret_sauce');

        const loginButton = await $('#login-button');
        await loginButton.click();

        const inventoryPage = await $('.inventory_list');
        await expect(inventoryPage).toBeDisplayed();

        const burgerButton = await $('[class="bm-burger-button"]');
        await burgerButton.click();
        await browser.pause(2000);

        const menuItems = await $$('#inventory_sidebar_link, #about_sidebar_link, #logout_sidebar_link, #reset_sidebar_link');
        expect(menuItems.length).toBe(4);

        const logoutButton = await $('#logout_sidebar_link');
        await logoutButton.click();

        const loginPage = await $('#login_button_container');
        await expect(loginPage).toBeDisplayed();
        
        const usernameValue = await usernameField.getValue();
        const passwordValue = await passwordField.getValue();
        
        expect(usernameValue).toBe('');
        expect(passwordValue).toBe('');
        await browser.pause(2000);
    });
});