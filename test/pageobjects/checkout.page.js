class CheckoutPage {
    get checkoutContainer() { return $('.checkout_info_container'); }
    get firstName() { return $('[id="first-name"]'); }
    get lastName() { return $('[id="last-name"]'); }
    get postalCode() { return $('[id="postal-code"]'); }
    get continueButton() { return $('[class*="btn_primary"]'); }
    get checkoutSummary() { return $('.checkout_summary_container'); }
    get finishButton() { return $('[class*="btn_action"]'); }
    get totalLabel() { return $('.summary_subtotal_label'); }
    get completeHeader() { return $('.complete-header'); }

    
    async clikContinue() {
        await this.continueButton.click();
    }

    async clickFinish() {
        await this.finishButton.click();
    }

    async checkoutInput(firstName, lastName, postalCode) {
        await this.firstName.setValue(firstName);
        await this.lastName.setValue(lastName);
        await this.postalCode.setValue(postalCode);
    }

    async getDisplayedTotalPrice() {
        const totalText = await this.totalLabel.getText();
        return parseFloat(totalText.replace('Item total: $', ''));
    }

}

export default new CheckoutPage();