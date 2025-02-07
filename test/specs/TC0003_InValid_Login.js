import LoginPage from '../pageobjects/login.page.js';

describe('Login tests', () => {
    it('Invalid password', async () => {
        await LoginPage.open();
        await LoginPage.login('standarD_user', 'secret_sauce');

        expect(await LoginPage.isLoginErrorCorrect()).toBeTruthy();

    });
});