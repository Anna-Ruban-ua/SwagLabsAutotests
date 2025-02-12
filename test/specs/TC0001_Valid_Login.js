import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe('Login tests', () => {
    it('Valid Login', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        expect(await inventoryPage.isPageLoaded()).toBeTruthy();

    });
});