@login
Feature: Login

  @negative
  Scenario: Display error when username is missing
    Given User is located on the main page of saucedemo website
    When User click "Login" button
    Then User should see "Epic sadface: Username is required" error message