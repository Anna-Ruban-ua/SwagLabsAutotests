class CartPage {
    get productNames() { return $$('[class="inventory_item_name"]'); }
    get checkoutButton() { return $('.checkout_button'); }
    get cartPrices() { return $$('.inventory_item_price'); }
    get cartContents() { return $('.cart_contents_container'); }
    get cartSubheader() { return $('[class*="title"]'); }
    get errorText() { return $('[data-test="error"]'); } 

    async isEmptyCartCheckoutCorrect() {
        const expectedHeader = 'Your Cart';
        const actualHeader = await this.cartSubheader.getText();

       //const expectedMessage = 'Cart is empty';
       // const actualMessage = await this.errorText.getText();

        return actualHeader === expectedHeader; //&& actualMessage === expectedMessage;
    }

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

const cartPage = new CartPage();
export default cartPage;