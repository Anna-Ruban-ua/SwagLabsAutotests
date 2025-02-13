import { Given, When, Then } from '@wdio/cucumber-framework';
import loginPage from '../pageobjects/login.page.js';

Given('User is located on the main page of saucedemo website', async function () {
    await loginPage.open();
});

When('User click {string} button', async function (buttonName) {
    await loginPage.clickButton(buttonName);
});

Then('User should see {string} error message', async function (expectedErrorMessage) {
    await loginPage.verifyErrorMessage(expectedErrorMessage);
});