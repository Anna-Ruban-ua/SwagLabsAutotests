describe('Footer', () => {
    before(async () => {
        await browser.url('https://www.saucedemo.com/v1/index.html');

        const usernameField = await $('#user-name');
        await usernameField.setValue('standard_user');

        const passwordField = await $('#password');
        await passwordField.setValue('secret_sauce');

        const loginButton = await $('#login-button');
        await loginButton.click();

        const inventoryPage = await $('.inventory_list');
        await expect(inventoryPage).toBeDisplayed();

        await browser.execute('window.scrollTo(0, document.body.scrollHeight)');
    });

    it('should open Twitter in a new tab', async () => {
        const twitterIcon = await $('a[href*="twitter.com"]');
        await expect(twitterIcon).toBeDisplayed();
        await twitterIcon.click();

        const handles = await browser.getWindowHandles();
        expect(handles.length).toBeGreaterThan(1);

        await browser.switchToWindow(handles[1]);
        const url = await browser.getUrl();
        expect(url).toContain('twitter.com');

        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
    });

    it('should open Facebook in a new tab', async () => {
        const facebookIcon = await $('a[href*="facebook.com"]');
        await expect(facebookIcon).toBeDisplayed();
        await facebookIcon.click();

        const handles = await browser.getWindowHandles();
        expect(handles.length).toBeGreaterThan(1);

        await browser.switchToWindow(handles[1]);
        const url = await browser.getUrl();
        expect(url).toContain('facebook.com');

        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
    });

    it('should open LinkedIn in a new tab', async () => {
        const linkedinIcon = await $('a[href*="linkedin.com"]');
        await expect(linkedinIcon).toBeDisplayed();
        await linkedinIcon.click();

        const handles = await browser.getWindowHandles();
        expect(handles.length).toBeGreaterThan(1);

        await browser.switchToWindow(handles[1]);
        const url = await browser.getUrl();
        expect(url).toContain('linkedin.com');

        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
    });
});