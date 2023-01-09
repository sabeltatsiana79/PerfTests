// Selectors
var Selectors = require('../selectors/selectors');
var popUps = new Selectors.PopUps();

// Actions
const FindAndClick = require('../actions/findAndClick');
const Find = require('../actions/find');
const HtmlWaiter = require('../actions/htmlWaiter');
var findAndClickXpath = new FindAndClick().XPATH;
var findAndClickCSS = new FindAndClick().CSS;
var findXpath = new Find().XPATH;
var findCSS = new Find().CSS;
var waitTillHTMLRendered = new HtmlWaiter().waitTillHTMLRendered;

class ClosePopUp {
    async ClosePopUpNotification(page) {
      console.log('Close: PopUp notification in list view');
      await findAndClickCSS(popUps.notificationCloseButton, page);
    }
}

module.exports = ClosePopUp;
