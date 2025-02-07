export async function openSocialMediaLink(platform) {
    const socialIcon = await $(`a[href*="${platform}"]`);
    
    await expect(socialIcon).toBeDisplayed();
    await socialIcon.waitForClickable({ timeout: 5000 });

    await socialIcon.click();

    const handles = await browser.getWindowHandles();
    expect(handles.length).toBeGreaterThan(1);

    await browser.switchToWindow(handles[1]);

    await browser.waitUntil(
        async () => (await browser.getUrl()).includes(platform),
        { timeout: 10000, timeoutMsg: `URL didn't contain ${platform}` }
    );

    const url = await browser.getUrl();
    expect(url).toContain(platform);

    console.log(`Opened URL: ${url}`);

    await browser.closeWindow();
    await browser.switchToWindow(handles[0]);
}