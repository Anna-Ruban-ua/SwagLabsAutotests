import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe('Sorting tests', () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');  
    });

    it('Sort by Price (low to high)', async () => {
        const prices = await inventoryPage.sortByOption('Price (low to high)');
        await inventoryPage.verifySortedPrices(prices, (a, b) => a - b);
    });

    it('Sort by Price (high to low)', async () => {
        const prices = await inventoryPage.sortByOption('Price (high to low)');
        await inventoryPage.verifySortedPrices(prices, (a, b) => b - a);
    });

    it('Sort by Name (A to Z)', async () => {
        const names = await inventoryPage.sortByOption('Name (A to Z)');
        await inventoryPage.verifySortedNames(names, (a, b) => a.localeCompare(b));
    });

    it('Sort by Name (Z to A)', async () => {
        const names = await inventoryPage.sortByOption('Name (Z to A)');
        await inventoryPage.verifySortedNames(names, (a, b) => b.localeCompare(a));
    });
});