class LoginPage {
    get usernameField() { return $('#user-name'); }
    get passwordField() { return $('#password'); }
    get loginButton() { return $('#login-button'); }
    get loginButtonContainer () { return $('#login_button_container'); }
    get errorText() { return $('[data-test="error"]'); } 
    get errorButton() { return $('[class="error-button"]'); }

    async open() {
        await browser.url('https://www.saucedemo.com/');
    }

    async login(username, password) {
        await this.usernameField.setValue(username);
        const passwordType = await this.passwordField.getAttribute('type');
        if (passwordType !== 'password') {
            throw new Error('Password field is not secure!');
        }
        await this.passwordField.setValue(password);
        await this.loginButton.click();
    }

    async isLoginErrorCorrect() {
        const expectedMessage = 'Epic sadface: Username and password do not match any user in this service';
        const actualMessage = await this.errorText.getText();
        const isErrorButtonVisible = await this.errorButton.isDisplayed();

        return actualMessage === expectedMessage && isErrorButtonVisible;
    }

    async isLoggedOutCorrectly() {
        const isLoginVisible = await this.loginButtonContainer.isDisplayed();
        const isUsernameEmpty = (await this.usernameField.getValue()) === '';
        const isPasswordEmpty = (await this.passwordField.getValue()) === '';

        return isLoginVisible && isUsernameEmpty && isPasswordEmpty;
    }

}

const loginPage = new LoginPage();
export default loginPage;