let configString = 'desktop';
let browserType = 'headless';

// helpers
const BrowserActions = require('./framework/helpers/browserActions');
const startBrowserWithLighthouse = new BrowserActions().startBrowserWithLighthouse;
const restartBrowser = new BrowserActions().restartBrowser;
const closeBrowser = new BrowserActions().closeBrowser;

const PageStatus = require('./framework/helpers/pageStatus');
const withPageStatusCheck = new PageStatus().withPageStatusCheck;

// pages
const Pages = require('./framework/pages/goto');
const goto = new Pages();

// Links
var Links = require('./testdata/links/links');
var directLinks = new Links.DirectLinks();

// flows
const TryLogin = require('./testdata/flows/tryLogin');
var checkLogin = new TryLogin().wrongLogin;


// reports
const CreateReport = require('./framework/reporting/createReport');
var createReports = new CreateReport().createReports;


async function main() {
    let browser = ''; let page = ''; let flow = '';
    [browser, page, flow] = await startBrowserWithLighthouse(configString, browserType);
    
	directLinks.link = "https://platform.getcarrier.io/";
  	await goto.link(directLinks.hostPage, page);
	await withPageStatusCheck(page, () => goto.link(directLinks.hostPage, page));
	//await acceptDismiss(page);
	
	await withPageStatusCheck(page, () => checkLogin(page, flow));
           
	await browser.close();	
	
  	//REPORTING
  	await createReports(flow);
}

main();
