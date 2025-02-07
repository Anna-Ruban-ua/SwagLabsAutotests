import LoginPage from '../pageobjects/login.page.js';

describe('Login tests', () => {
    it('Invalid password', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_dish');

        expect(await LoginPage.isLoginErrorCorrect()).toBeTruthy();

    });
});