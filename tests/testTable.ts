import { testURL } from "../config";
import { testTypes, featureArea, defaultUser } from "../helpers";
import TableReportPage from "../pages/table";

fixture("Table")
  .page(testURL)
  .beforeEach(async t => {
    // the "beforeEach" method will run the below code before every test in this fixture

    // The test will use the built-in "Roles" functionality to log in as our default user
    // See the helpers.ts file for more info on how this works
    await t.useRole(defaultUser);

    // use "t.ctx" to share objects between the tests
    t.ctx.table = new TableReportPage();
    await t.navigateTo(t.ctx.table.url);
  });

test.meta({ testType: testTypes.Integration, component: featureArea.Table })(
  "Test that the totals in the table are as expected",
  async t => {
    let calculatedTotal = 0;
    // sum the totals from row 4 to row 7 of the table
    for (let n = 3; n < 7; n++) {
      let nthRowAmount = await t.ctx.table.getTotalAmountOnNthRow(n);
      calculatedTotal += nthRowAmount;
      console.log(nthRowAmount, calculatedTotal);
    }
    await t.expect(calculatedTotal).eql(125903.7);
  }
);
