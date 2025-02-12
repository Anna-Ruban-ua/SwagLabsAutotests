import loginPage from '../pageobjects/login.page.js';

describe('Login tests', () => {
    it('Invalid password', async () => {
        await loginPage.open();
        await loginPage.login('standarD_user', 'secret_sauce');

        expect(await loginPage.isLoginErrorCorrect()).toBeTruthy();

    });
});