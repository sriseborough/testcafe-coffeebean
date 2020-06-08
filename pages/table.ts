import { t, Selector } from "testcafe";
import { testURL } from "../config";

// This is an example of a better use of the page object model
// We create a new class which can be instantiated as part of the test
// Although it looks more complicated, it ends up making the tests more powerful and simpler to write

export default class TableReportPage {
  
  // Any variables defined in the constructor need to be declared here (if using typescript)
  url: string;
  tableContainer: Selector;
  tableBody: Selector;
  tableRowSelector: Selector;

  constructor() {
    // All we are doing here is defining objects that we want to use through the methods of the class
    this.url = testURL + "/table";

    // TestCafe uses the CSS selector style similar to selenium (ie. '.' = class name, '#' = id, '// = Xpath' etc.)
    // Ideally we should use class names / id's before having to resort to Xpaths as they will make the tests more robust
    this.tableContainer = Selector("#case_table");

    // This is a very powerful pattern, by using the '.find' method, we are able to search for an object with the parent element specified
    // Here we are looking for a table body WITHIN the tableContainer selector. This would be very useful if there was more than 1 table present
    this.tableBody = this.tableContainer.find("tbody");
    this.tableRowSelector = Selector("tr");
  }

  // Functions and arguments should be named in a way that obviously describes what they are
  async getNthRowElement(rowIndex) {
    // '.nth' finds the N'th instance of that object, it will throw an error if there aren't enough of the elements present in the DOM
    return this.tableRowSelector.nth(rowIndex);
  }

  async getNthCellElementInRow(cellIndex, rowIndex) {
    const rowElement = await this.getNthRowElement(rowIndex);
    const cellElement = rowElement.find("td").nth(cellIndex);
    return cellElement;
  }

  async getTotalAmountOnNthRow(rowIndex) {
    // Total is always the last cell on the right, so we can use "-1" as the nth number
    const cellElement = await this.getNthCellElementInRow(-1, rowIndex);
    const priceString = await cellElement.innerText;
    return await this.convertPriceStringToNumber(priceString);
  }

  async convertPriceStringToNumber(priceString: string, currencySymbol = "$") {
    const totalValue = Number(
      priceString.replace(currencySymbol, "").replace(",", "")
    );
    return totalValue;
  }
}
