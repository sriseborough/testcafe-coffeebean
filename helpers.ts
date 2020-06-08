import { ClientFunction, t, Role } from "testcafe";
import { fileDownloadPath } from "./config";
import { axeCheck, createReport } from "axe-testcafe";
import { testURL, defaultUserUsername, defaultUserPassword } from "./config";
import { login } from "./pages/loginPage";

// Very useful library for checking if a downloaded file exists
const fileExists = require("file-exists");

// ClientFunction is a way of TestCafe being able to execute all the commands that are usually available in the browser console
export const getLocation = ClientFunction(() => document.location.href);

export const getCurrentWindowSize = ClientFunction(() => ({
  height: window.innerHeight,
  width: window.innerWidth
}));

// "Roles" in TestCafe store authentication details for the entire test session
// meaning that login for this user only happens once
// Tests should have ' await t.useRole(defaultUser);' to utilise this role
export const defaultUser = Role(testURL, async t => {
  await login(defaultUserUsername, defaultUserPassword);
});

// Utilises the "file-exists" library initialised above
export async function checkFileExists(filename, timeout = 5) {
  var i = 0;
  do {
    const filePath = `${fileDownloadPath}${filename}`;
    var downloadedFile = await fileExists(filePath);

    if (downloadedFile == true) {
      break;
    } else {
      await t.wait(1000);
      i++;
    }
  } while (i <= timeout);
  return downloadedFile;
}

// A useful method if you want to verify the accessibility standards of a page against the WCAG 2.0 standards
export async function verifyAccessibilityStandards(t) {
  const { error, violations } = await axeCheck(t);
  await t.expect(violations.length === 0).ok(createReport(violations));
}

export async function clearSessionAndLocalStorage() {
  await t.eval(() => sessionStorage.clear());
  await t.eval(() => localStorage.clear());
}

export enum testTypes {
  // Testing integration between two or more components using TestCafe in CI
  // This can be done by having real components connected together or using stubbed endpoints. Developer and/or QA responsibility.
  Integration = "Component Integration Test",

  // End-to-end system-level tests run in a production-like environment using TestCafe. QA responsibility.
  System = "System / System Integration Test",

  // These are tests that are run in CI giving a report against accessibility standards. QA responsibility.
  Accessibility = "Accessibility Test"
}

// These will tie into "component" fields in Jira for traceability of testing / regressions
export enum featureArea {
  Login = "Login Page",
  Table = "Table Page",
  HomePage = "Home Page"
}
