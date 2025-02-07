import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('Login tests', () => {
    it('Valid Login', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        expect(await InventoryPage.isPageLoaded()).toBeTruthy();

    });
});