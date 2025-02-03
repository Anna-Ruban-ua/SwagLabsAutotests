describe('Login tests', () => {
    it('Invalid login', async () => {
        await browser.url('https://www.saucedemo.com/v1/index.html');
        
        const usernameField = await $('#user-name');
        await usernameField.setValue('standarD_user');

        const loginValue = await usernameField.getValue();
        expect(loginValue).toBe('standarD_user');

        const passwordField = await $('#password');
        await passwordField.setValue('secret_sauce');

        const passwordType = await passwordField.getAttribute('type');
        expect(passwordType).toBe('password');

        const loginButton = await $('#login-button');
        await loginButton.click();

        const errorText = await $('[data-test="error"]').getText();
        expect(errorText).toBe('Epic sadface: Username and password do not match any user in this service');

        const errorButton = await $('.error-button');
        await errorButton.waitForDisplayed();
        
        const usernameErrorIcon = await $('input[name="user-name"].input_error');
        const passwordErrorIcon = await $('input[name="password"].input_error');
        
        expect(await usernameErrorIcon.isExisting()).toBe(true);
        expect(await passwordErrorIcon.isExisting()).toBe(true);

        const usernameBgColor = await usernameField.getCSSProperty('background-color');
        const passwordBgColor = await passwordField.getCSSProperty('background-color');

        expect(usernameBgColor.value).toBe('rgba(226,35,26,1)'); 
        expect(passwordBgColor.value).toBe('rgba(226,35,26,1)');    
    });
});