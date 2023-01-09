const FindAndClick = require('../actions/findAndClick');
const findAndClickCSS = new FindAndClick().CSS;
const findAndClickXpath = new FindAndClick().XPATH;

class PopupPages {
    /**
     * Get new page popup
     * @browser current browser instance
     */
    async getNewPageWhenLoaded(browser) {
        return new Promise(x =>
            browser.on('targetcreated', async target => {
                if (target.type() === 'page') {
                    const newPage = await target.page();
                    const newPagePromise = new Promise(y =>
                        newPage.once('domcontentloaded', () => y(newPage))
                    );
                    const isPageLoaded = await newPage.evaluate(
                        () => document.readyState
                    );
                    newPage.isSuccess = true;
                    newPagePromise.isSuccess = true;
                    return isPageLoaded.match('complete|interactive') ?
                        x(newPage) :
                        x(newPagePromise);
                }
            })
        );
    };

    /**
     * Get new tab after clicking into CSS
     * @selector CSS selector
     * @browser current browser instance
     * @page    current page in browser
     */
    async clickAndGetNewPageCSS(selector, page, browser) {
        //save target of original page to know that this was the opener
        const pageTarget = page.target();
        await findAndClickCSS(selector, page);
        //check that the first page opened this new page
        const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget);
        const newPage = await newTarget.page();
        if (page.isSuccess) {
          newPage.isSuccess = true;
        }

        return newPage;
    };

    /**
     * Get new tab after clicking into XPATH
     * @selector XPATH selector
     * @browser current browser instance
     * @page    current page in browser
     */
    async clickAndGetNewPageXpath(selector, page, browser) {
        //save target of original page to know that this was the opener:
        const pageTarget = page.target();
        await findAndClickXpath(selector, page);
        //check that the first page opened this new page:
        let newTarget = await browser.waitForTarget(target => target.opener() === pageTarget);
        const newPage = await newTarget.page();
        if (page.isSuccess) {
          newPage.isSuccess = true;
        }
        
        return newPage;
    };

}


module.exports = PopupPages;
