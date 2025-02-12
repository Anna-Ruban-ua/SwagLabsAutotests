import loginPage from '../pageobjects/login.page.js';

describe('Login tests', () => {
    it('Invalid password', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_dish');

        expect(await loginPage.isLoginErrorCorrect()).toBeTruthy();

    });
});