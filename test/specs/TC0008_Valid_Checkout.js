describe('Checkout', () => {
    it('Valid Checkout', async () => {
        await browser.url('https://www.saucedemo.com/v1/index.html');

        const usernameField = await $('#user-name');
        await usernameField.setValue('standard_user');

        const passwordField = await $('#password');
        await passwordField.setValue('secret_sauce');

        const loginButton = await $('#login-button');
        await loginButton.click();

        const inventoryPage = await $('.inventory_list');
        await expect(inventoryPage).toBeDisplayed();

        const productNames = await $$('[class="inventory_item_name"]');
        const productNameInCatalog = await productNames[2].getText();

        const addtocartButton = await $$('[class="btn_primary btn_inventory"]');
        await addtocartButton[2].click();
        await browser.pause(2000); 

        const cartIcon = await $('.shopping_cart_badge');
        const cartCount = await cartIcon.getText();
        expect(cartCount).toBe('1');

        const cartButton = await $('[data-icon="shopping-cart"]');
        await cartButton.click();

        const cartProductNames = await $$('[class="inventory_item_name"]');
        const productInCart = await cartProductNames[0].getText();
        expect(productNameInCatalog).toBe(productInCart);
        await browser.pause(2000);

        const checkoutButton = await $('.checkout_button');
        await checkoutButton.click();

        const checkoutPage = await $('.checkout_info');
        await expect(checkoutPage).toBeDisplayed();

        const firstNameField = await $('#first-name');
        await firstNameField.setValue('Anna');

        const firstNameValue = await firstNameField.getValue();
        expect(firstNameValue).toBe('Anna');

        const lastNameField = await $('#last-name');
        await lastNameField.setValue('Ruban');

        const lastNameValue = await lastNameField.getValue();
        expect(lastNameValue).toBe('Ruban');

        const postalCodeField = await $('#postal-code');
        await postalCodeField.setValue('04107');

        const postalCodeValue = await postalCodeField.getValue();
        expect(postalCodeValue).toBe('04107');

        const continueButton = await $('.cart_button');
        await continueButton.click();

        const overviewPage = await $('.summary_info');
        await expect(overviewPage).toBeDisplayed();
        await browser.pause(2000);

        // Validate total price
        const itemPrices = await $$('[class="inventory_item_price"]');
        let totalPrice = 0;
        for (const priceElement of itemPrices) {
            const priceText = await priceElement.getText();
            totalPrice += parseFloat(priceText.replace('$', ''));
        }
                
        const totalLabel = await $('.summary_total_label');
        const displayedTotal = parseFloat((await totalLabel.getText()).replace('Total: $', ''));
        expect(displayedTotal).toBeCloseTo(totalPrice, 2);

        const finishButton = await $('.btn_action');
        await finishButton.click();

        const completeHeader = await $('.complete-header');
        await expect(completeHeader).toHaveText('THANK YOU FOR YOUR ORDER');

        const backHomeButton = await $('.btn_primary');
        await backHomeButton.click();

        await expect(inventoryPage).toBeDisplayed();
        const cartBadge = await $('.shopping_cart_badge');
        await expect(cartBadge).not.toBeDisplayed();
    });
});