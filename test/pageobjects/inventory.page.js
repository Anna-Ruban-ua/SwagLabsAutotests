class InventoryPage {
    get inventoryPage() { return $('#inventory_container'); }
    get cartIcon() { return $('#shopping_cart_container'); }
    get burgerButton() { return $('[class="bm-burger-button"]'); }
    get inventorySidebar() { return $('#inventory_sidebar_link'); }
    get aboutSidebar() { return $('#about_sidebar_link'); }
    get logoutSidebar() { return $('#logout_sidebar_link'); }
    get resetSidebar() { return $('#reset_sidebar_link'); }
    get productNames() { return $$('.inventory_item_name'); }
    get productPrices() { return $$('.inventory_item_price'); }
    get sortDropdown() { return $('.product_sort_container'); }
    get addToCartButtons() { return $$('[class*="btn_inventory"]'); }
    get removeFromCartButtons() { return $$('[class="btn_secondary btn_inventory"]'); }

    async scrollToFooter() {
        await browser.execute('window.scrollTo(0, document.body.scrollHeight)');
    }

    async isPageLoaded() {
        return await this.inventoryPage.isDisplayed() && await this.cartIcon.isDisplayed();
    }

    async cartClick() {
        await this.cartIcon.click();
    }

    async logout() {
        await this.burgerButton.click();
        await expect(this.inventorySidebar).toBeDisplayed();
        await expect(this.aboutSidebar).toBeDisplayed();
        await expect(this.logoutSidebar).toBeDisplayed();
        await expect(this.resetSidebar).toBeDisplayed();
        await this.logoutSidebar.click();
    }

    async backHome() {
        await this.burgerButton.click();
        await expect(this.inventorySidebar).toBeDisplayed();
        await expect(this.aboutSidebar).toBeDisplayed();
        await expect(this.logoutSidebar).toBeDisplayed();
        await expect(this.resetSidebar).toBeDisplayed();
        await this.inventorySidebar.click();
    }

    async getProductName(index) {
        return await this.productNames[index].getText();
    }

    async addToCart(index) {
        await this.addToCartButtons[index].click();
    }

    async sortBy(option) {
        await this.sortDropdown.selectByVisibleText(option);
    }

    async getSortedPrices() {
        const priceElements = await this.productPrices;
        if (priceElements.length === 0) {
            throw new Error('No price elements found.');
        }
    
        let prices = [];
        for (let el of priceElements) {
            const priceText = await el.getText();
            prices.push(parseFloat(priceText.replace('$', '')));
        }
        return prices;
    }

    async getSortedNames() {
        const nameElements = await this.productNames;
        if (nameElements.length === 0) {
            throw new Error('No name elements found.');
        }
    
        let names = [];
        for (let el of nameElements) {
            const nameText = await el.getText();
            names.push(nameText);
        }
        return names;
    }

    async getTotalSelectedItemPrice() {
        let totalPrice = 0;
        const cartButtons = await this.removeFromCartButtons;
        for (let i = 0; i < cartButtons.length; i++) {
            const priceText = await this.productPrices[i].getText();
            totalPrice += parseFloat(priceText.replace('$', ''));
        }
        return totalPrice;
    }

    async addItemToCart(productIndex) {
        await this.addToCart(productIndex);
        expect(parseInt(await this.cartIcon.getText())).toBeGreaterThan(0);
    }

    async sortByOption(option) {
        await this.sortBy(option);
        const sortedData = option.includes('Price') 
            ? await this.getSortedPrices() 
            : await this.getSortedNames();
        return sortedData;
    }

    async verifySortedPrices(prices, comparator) {
        const sortedPrices = [...prices].sort(comparator);
        expect(prices).toEqual(sortedPrices);
    }
    
    async verifySortedNames(names, comparator) {
        const sortedNames = [...names].sort(comparator);
        expect(names).toEqual(sortedNames);
    }

}

export default new InventoryPage();