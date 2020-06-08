import BlockComponent from "./components/block";
import TableReportPage from "./table";

// This is another example of a use of the page object model (see table.ts first)
// Here we are instantiating a reusable component the "block"
// The homepage is just a series of clickable blocks, so we can make our homepage object really simple,
// and cut down on DRY errors by using this format

export default class HomePage {
  // Any variables defined in the constructor need to be declared here (if using typescript)
  tableReportBlock: BlockComponent;
  otherTablePageBlock: BlockComponent;
  loginBlock: BlockComponent;

  constructor() {
    this.tableReportBlock = new BlockComponent("TABLE REPORT", TableReportPage);
    this.otherTablePageBlock = new BlockComponent("BLOCKS", TableReportPage);
    this.loginBlock = new BlockComponent("LOGIN");
  }
}
