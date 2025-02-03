describe('Sorting tests', () => {
    beforeEach(async () => {
        await browser.url('https://www.saucedemo.com/v1/index.html');

        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        await expect($('.inventory_list')).toBeDisplayed();
    });

    async function getSortedPrices() {
        const priceElements = await $$('.inventory_item_price');
        if (priceElements.length === 0) {
            throw new Error('No price elements found.');
        }

        let prices = [];
        for (let el of priceElements) {
            let priceText = await el.getText();
            prices.push(parseFloat(priceText.replace('$', '')));
        }
        return prices;
    }

    async function getSortedNames() {
        const nameElements = await $$('.inventory_item_name');
        if (nameElements.length === 0) {
            throw new Error('No name elements found.');
        }

        let names = [];
        for (let el of nameElements) {
            names.push(await el.getText());
        }
        return names;
    }

    it('Sort by Price (low to high)', async () => {
        await $('.product_sort_container').selectByVisibleText('Price (low to high)');
        await browser.pause(3000);

        const prices = await getSortedPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    });

    it('Sort by Price (high to low)', async () => {
        await $('.product_sort_container').selectByVisibleText('Price (high to low)');
        await browser.pause(3000);

        const prices = await getSortedPrices();
        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPrices);
    });

    it('Sort by Name (A to Z)', async () => {
        await $('.product_sort_container').selectByVisibleText('Name (A to Z)');
        await browser.pause(3000);

        const names = await getSortedNames();
        const sortedNames = [...names].sort();
        expect(names).toEqual(sortedNames);
    });

    it('Sort by Name (Z to A)', async () => {
        await $('.product_sort_container').selectByVisibleText('Name (Z to A)');
        await browser.pause(3000);

        const names = await getSortedNames();
        const sortedNames = [...names].sort().reverse();
        expect(names).toEqual(sortedNames);
    });
});
