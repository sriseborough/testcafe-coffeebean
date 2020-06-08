import { Selector, t } from "testcafe";
import { testURL } from "../config";

// This file is an example of a really basic page object model
// Everything here is defined as a separate const / function
// The advantages of this are that it is simple, and a more "javascripty" way of working
// The disadvantages of it are that we lose any contextual state, and the tests end up being messier

export const loginUrl = testURL + "/login";
export const expectedLoginErrorText = "ACCESS DENIED!";
export const expectedLoginSuccessText = "WELCOME :)";
export const loginErrorElement = Selector(".error");
export const loginSuccessElement = Selector(".success");

export const login = async (username, password) => {
  await t.navigateTo(loginUrl);
  const usernameField = Selector("#usr");
  const passwordField = Selector("#pwd");
  await t.typeText(usernameField, username);
  await t.typeText(passwordField, password);
  await clickLoginButton();
};

export const getPasswordError = async () => {
  return await Selector("#passwordError").innerText;
};

export const clickLoginButton = async () => {
  const loginButton = Selector("input").withAttribute("type", "submit");
  await t.click(loginButton);
};
