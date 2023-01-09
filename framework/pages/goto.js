// Actions
const HtmlWaiter = require('../actions/htmlWaiter');
var waitTillHTMLRendered = new HtmlWaiter().waitTillHTMLRendered;

class GoToPage {
    async link(link, page) {
        console.log('Opening Link: ' + link);
        try {
            await page.goto(link, {
                waitUntil: "networkidle2",
                timeout: 300000
            });
        }
        catch (error) {
            console.log(error);
            page.isSuccess = false;
        }
        await page.waitForTimeout(10000);
        await waitTillHTMLRendered(page); // loosing page context on multiple redirects, so wait 10sec before that...
    }
}

module.exports = GoToPage;
