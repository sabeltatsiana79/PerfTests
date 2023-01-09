// Selectors
const Selectors = require('../selectors/selectors');
const logInSelectors = new Selectors.LogInSelectors();

// Actions
const FindAndClick = require('../actions/findAndClick');
const FindAndType = require('../actions/findAndType');
const HtmlWaiter = require('../actions/htmlWaiter');
const Find = require('../actions/find');
const findAndClickCSS = new FindAndClick().CSS;
const findAndTypeCSS = new FindAndType().CSS;
const waitTillHTMLRendered = new HtmlWaiter().waitTillHTMLRendered;
var findXpath = new Find().XPATH;
var findCSS = new Find().CSS;

// Links
const Links = require('../links/links');
const directLinks = new Links.DirectLinks();

// Pages
const Pages = require('../pages/goto');
const goto = new Pages();

class LogInPage {
    async logInFlow(page, testuser, testpassword) {
      console.log('Started: Login');
      await findAndClickCSS(logInSelectors.userNameField, page);
      await waitTillHTMLRendered(page);
      await findAndTypeCSS(logInSelectors.userNameField, testuser, page);
      await findAndClickCSS(logInSelectors.nextButton, page, "jsClick");

      await findAndClickCSS(logInSelectors.passwordField, page);
      await waitTillHTMLRendered(page);
      await findAndTypeCSS(logInSelectors.passwordField, testpassword, page);
      await findAndClickCSS(logInSelectors.signInButton, page);

      await findAndClickCSS(logInSelectors.staySignedButton, page);
      await page.waitForTimeout(10000);
      await waitTillHTMLRendered(page);
      console.log('Ended: Login');
    }

    async liferayLogin(page, testuser, testpassword) {
      console.log('Started: LifeRay Login');
      await page.authenticate({'username':testuser, 'password': testpassword});
      await goto.link(directLinks.liferayAuth, page)
      console.log('Ended: LifeRay Login');
    }
}

module.exports = LogInPage;
