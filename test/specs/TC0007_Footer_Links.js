import loginPage from '../pageobjects/login.page.js';
import { openSocialMediaLink } from '../helpers/socialMediaHelper.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe('Footer', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce'); 
        await inventoryPage.scrollToFooter();
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