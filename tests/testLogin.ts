import { testURL } from "../config";
import {
  login,
  loginSuccessElement,
  expectedLoginSuccessText,
  loginErrorElement,
  expectedLoginErrorText
} from "../pages/loginPage";
import { testTypes, featureArea, getLocation } from "../helpers";
import { defaultUserUsername, defaultUserPassword } from "../config";
import HomePage from "../pages/homePage";

fixture("Login")
  .page(testURL)
  .beforeEach(async t => {
    const homepage = await new HomePage();
    await homepage.loginBlock.click();
  });

// the .meta tags can be used to label tests
// which in turn can be used to run selections of test by feature area or test type
// they are defined in helpers.ts, or they can be removed if not helpful
test.meta({ testType: testTypes.Integration, component: featureArea.Login })(
  "Test logging in with valid credentials takes a user to the homepage",
  async t => {
    await login(defaultUserUsername, defaultUserPassword);
    await t.expect(getLocation()).eql(testURL + "/login?mode=welcome");
    await t.expect(loginSuccessElement.innerText).eql(expectedLoginSuccessText);
  }
);

test.meta({ testType: testTypes.Integration, component: featureArea.Login })(
  "Test logging in with invalid credentials shows user some error text",
  async t => {
    await login(defaultUserUsername, "wrong password");
    
    await t
      .expect(loginErrorElement.visible)
      .ok("Access Denied text not showing as expected");

    await t.expect(loginErrorElement.innerText).eql(expectedLoginErrorText);
  }
);
