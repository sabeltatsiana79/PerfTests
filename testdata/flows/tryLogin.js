// Selectors
var Selectors = require('../selectors/selectors');
var loginSelectors = new Selectors.Login();

// Actions
const FindAndClick = require('../../framework/actions/findAndClick');
const Find = require('../../framework/actions/find');
const HtmlWaiter = require('../../framework/actions/htmlWaiter');
var findAndClickXpath = new FindAndClick().XPATH;
var findAndClickCSS = new FindAndClick().CSS;
var findXpath = new Find().XPATH;
var findCSS = new Find().CSS;
const FindAndType = require('../../framework/actions/findAndType');
const findAndTypeCSS = new FindAndType().CSS;
var waitTillHTMLRendered = new HtmlWaiter().waitTillHTMLRendered;

class CarrierLogin {
    async wrongLogin(page, flow) {
		await findAndTypeCSS(loginSelectors.username,"user", page);
    	await findAndTypeCSS(loginSelectors.password,"pass", page);
	  await flow.startTimespan({ stepName: 'Try to Log In' });
        await findAndClickCSS(loginSelectors.btnLogIn, page);
        await findCSS(loginSelectors.errorField, page);
        await waitTillHTMLRendered(page);
      await flow.endTimespan();
      console.log('Ended: Try flow');
    }
}

module.exports = CarrierLogin;
