import LoginPage from '../pageobjects/login.page.js';
import { openSocialMediaLink } from '../helpers/socialMediaHelper.js';

describe('Footer', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce'); 
        await browser.execute('window.scrollTo(0, document.body.scrollHeight)');
    });

    it('should open Twitter in a new tab', async () => {
        await openSocialMediaLink('twitter.com');
    });

    it('should open Facebook in a new tab', async () => {
        await openSocialMediaLink('facebook.com');
    });

    it('should open LinkedIn in a new tab', async () => {
        await openSocialMediaLink('linkedin.com');
    });
});