import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('Sorting tests', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');  
    });

    it('Sort by Price (low to high)', async () => {
        const prices = await InventoryPage.sortByOption('Price (low to high)');
        await InventoryPage.verifySortedPrices(prices, (a, b) => a - b);
    });

    it('Sort by Price (high to low)', async () => {
        const prices = await InventoryPage.sortByOption('Price (high to low)');
        await InventoryPage.verifySortedPrices(prices, (a, b) => b - a);
    });

    it('Sort by Name (A to Z)', async () => {
        const names = await InventoryPage.sortByOption('Name (A to Z)');
        await InventoryPage.verifySortedNames(names, (a, b) => a.localeCompare(b));
    });

    it('Sort by Name (Z to A)', async () => {
        const names = await InventoryPage.sortByOption('Name (Z to A)');
        await InventoryPage.verifySortedNames(names, (a, b) => b.localeCompare(a));
    });
});