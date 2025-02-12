import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe('Login tests', () => {
    it('Logout', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        expect(await inventoryPage.isPageLoaded()).toBeTruthy();

        await inventoryPage.logout();

        expect(await loginPage.isLoggedOutCorrectly()).toBeTruthy();

    });
});