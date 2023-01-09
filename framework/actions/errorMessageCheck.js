const HtmlWaiter = require('./htmlWaiter');
var waitTillHTMLRendered = new HtmlWaiter().waitTillHTMLRendered;

class ErrorMessageCheck {
    async checkForErrorMessages (selector, page) {
        let errorPresent = true;
        while (errorPresent) {
            try {
            await page.waitForSelector(selector, { timeout: 5000 })
            process.on('unhandledRejection', (reason, p) => {
                console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
            });
            } catch (error) {
            console.log("Error didn't appear on a page.");
            errorPresent = false;
            }
            if (errorPresent) {
                try {
                    await page.click(selector);
                    process.on('unhandledRejection', (reason, p) => {
                        console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
                    });
                    console.log("Error message has been closed. Proceed...");
                }
                catch (error) {
                console.log("Element was not clickable");
                }
                await waitTillHTMLRendered(page);
            }
        }
	}
}

module.exports = ErrorMessageCheck;
