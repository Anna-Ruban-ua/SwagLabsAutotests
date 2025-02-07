import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('Login tests', () => {
    it('Logout', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        expect(await InventoryPage.isPageLoaded()).toBeTruthy();

        await InventoryPage.logout();

        expect(await LoginPage.isLoggedOutCorrectly()).toBeTruthy();

    });
});