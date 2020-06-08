import { t, Selector } from "testcafe";
import TableReportPage from "../table";

// This is an example of a better use of the page object model
// We create a new class which can be instantiated as part of the test
// Although it looks more complicated, it ends up making the tests more powerful and simpler to write

export default class BlockComponent {
  // Any variables defined in the constructor need to be declared here (if using typescript)
  block: Selector;
  tableRowSelector: Selector;
  pageObject: any;

  constructor(blockText, pageObject = TableReportPage) {
    // All we are doing here is defining objects that we want to use through the methods of the class
    this.block = Selector(".caseblock").withText(blockText);
    this.pageObject = pageObject;
  }

  // Functions and arguments should be named in a way that obviously describes what they are
  async click() {
    await t.click(this.block);
    return new this.pageObject();
  }

  async getAllText() {
    return await this.block.innerText;
  }
}
