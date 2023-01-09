const Find = require('./find');
const findCSS = new Find().CSS;
const findXpath = new Find().XPATH;

class FindAndClick {
	/**
     * Find and click into selector of given type
	 * @type 	'Xpath' or 'CSS'
     * @selector XPATH or CSS selector
     * @page     current page in browser
     * @options  rightClick or undefined :)
    */
	    async Click(type, selector, page, options) {
        switch (type) {
                  case 'CSS':
                      return new FindAndClick().CSS(selector, page, options);   
                      break;
                  case 'Xpath':
					  return new FindAndClick().XPATH(selector, page, options);  
					  break;
                  default:
                      await page.click(selector);
		}
	}
	
    /**
     * Find and click into XPATH selector
     * @selector XPATH selector
     * @page     current page in browser
     * @options  rightClick or undefined :)
    */
    async XPATH(selector, page, options) {
        let successMessage = "[SUCCESS] Clicked (XPATH): " + selector;
        let failedMessage  = "[FAIL] Selector was not clickable (XPATH): " + selector +
                             "\nYou need to pass both selector and page to this method";

        let linkHandlers = await findXpath(selector, page);
        if (page.isSuccess) {
          try {
              //more options to add here
              switch (options) {
                  case 'rightClick':
                      await linkHandlers[0].click({button: 'right',});
                      successMessage = "[SUCCESS] Right click (XPATH): " + selector;
                      break;
                  default:
                      await linkHandlers[0].click();
              }
          } catch (error) {
              page.isSuccess = false;
          }
        }
        page.isSuccess? console.log(successMessage) : console.log(failedMessage);
    }
    /**
     * Find and click into CSS selector
     * @selector CSS selector
     * @page     current page in browser
     * @options  rightClick, jsClick, doubleClick or undefined :)
    */
    async CSS(selector, page, options) {
        let successMessage = "[SUCCESS] Clicked (CSS): " + selector;
        let failedMessage  = "[FAIL] Selector was not clickable (CSS): " + selector +
                             "\nYou need to pass both selector and page to this method"

        await findCSS(selector, page);
        if (page.isSuccess){
          try {
              //more options to add here
              switch (options) {
                  case 'rightClick':
                      await page.click(selector, {button: 'right',});
                      successMessage = "[SUCCESS] Right click (CSS): " + selector;
                      break;
                  case 'jsClick':
                      await page.$eval(selector, element => element.click());
                      successMessage = "[SUCCESS] JS click (CSS): " + selector;
                      break;
                  case 'iframe':
                      let link = await findCSS(selector, page, "returnValue");
                      await link.click();
                      successMessage = "[SUCCESS] iframe click (CSS): " + selector;
                      break;
                  case 'doubleClick':
                      await page.click(selector, {clickCount: 2});
                      successMessage = "[SUCCESS] Double click (CSS): " + selector;
                      break;
                  case 'tripleClick':
                      await page.click(selector, {clickCount: 3});
                      successMessage = "[SUCCESS] Triple click (CSS): " + selector;
                      break;
                  case 'random':
                      let totalCount = await page.evaluate((selector) => { return document.querySelectorAll(selector).length; }, selector);
                      console.log("[RANDOM] totalCount of possible clicks: " + totalCount);
                      let num = Math.floor(Math.random() * totalCount);
                      console.log("[RANDOM] chosen num to click: " + num);
                      let selectAll = await page.$$(selector);
                      await selectAll[num].click();
                      successMessage = "[SUCCESS] Random click (CSS): " + selector;
                      break;
                  default:
                      await page.click(selector);
              }
          } catch (error) {
              page.isSuccess = false;
          }
        }
        page.isSuccess? console.log(successMessage) : console.log(failedMessage);
    }
	
}

/**
     * Find and click into any selector
     * @selector XPATH or CSS selector (should contains 'XPATH' or 'CSS' substring)
     * @page     current page in browser
     * @options  rightClick or undefined :)
    */
	
	FindAndClick.prototype.ClickAny = async function(selector, page, options) {
		var type = 'CSS';
		if (selector.contains('XPATH'))
			type = 'XPath';
        switch (type) {
                  case 'CSS':
                      return new FindAndClick().CSS(selector, page, options);   
                      break;
                  case 'Xpath':
					  return new FindAndClick().XPATH(selector, page, options);  
					  break;
                  default:
                      await page.click(selector);
		}
	}

module.exports = FindAndClick;
