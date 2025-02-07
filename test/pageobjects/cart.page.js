class CartPage {
    get productNames() { return $$('[class="inventory_item_name"]'); }
    get checkoutButton() { return $('.checkout_button'); }
    get cartPrices() { return $$('.inventory_item_price'); }
    get cartContents() { return $('.cart_contents_container'); }
    get cartSubheader() { return $('[class*="title"]'); }
    get errorText() { return $('[data-test="error"]'); } 

    async getProductName(index) {
        return await this.productNames[index].getText();
    }

    async checkout() {
        await this.checkoutButton.click();
    }

    async getTotalCartPrice() {
        let total = 0;
        const prices = await this.cartPrices;

        for (let priceElement of prices) {
            const priceText = await priceElement.getText();
            total += parseFloat(priceText.replace('$', ''));
        }

        return total;
    }
}

export default new CartPage();