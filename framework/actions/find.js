class Find {
    /**
     * Find XPATH selector and return it to further flows
	 * or return true or false for 'exist' option
     * @selector XPATH selector
     * @page     current page in browser
     * @options  exist or hidden or undefined :)
     * @return   linkHandlers
    */
    async XPATH(selector, page, options) {
        if (page.isSuccess) {
            //more options to add here
            switch (options) {
				case 'exist':
					return new Find().isExistedXPATH(selector, page);
					break;
                case 'hidden':
                    return new Find().findHiddenXPATH(selector, page);
                default:
                    return new Find().findVisibleXPATH(selector, page);
            }
        }
    }

    /**
     * Wait for XPATH selector to disappear
     * @selector XPATH selector
     * @page     current page in browser
     * @return   linkHandlers
    */
    async findHiddenXPATH(selector, page) {
        const pollingTime = 1000;
        const waitingTime = 1200000;
        const finishTime = new Date().getTime() + waitingTime;
        //let successMessage = "[SUCCESS] Selector found (XPATH): " + selector;
        let failedMessage  = "[FAIL] Selector not found (XPATH): " + selector +
                             "\nYou need to pass both selector and page to this method";

        while (new Date().getTime() < finishTime) {
          try {
              let linkHandlers = await page.$x(selector);
              if (linkHandlers.length === 0) {
                  console.log("[SUCCESS] Selector disappeared (XPATH): " + selector);
                  return linkHandlers;
              }
              else {
                  console.log(new Date().getTime() + " Selector still present (XPATH): " + selector);
                  await page.waitForTimeout(pollingTime);
              }
          }
          catch (error) {
              console.log(failedMessage);
              page.isSuccess = false;
          }
        }
        console.log("[FAIL] Selector still present (XPATH): " + selector);
        page.isSuccess = false;
    }

    /**
     * Wait for XPATH selector to become visible
     * @selector XPATH selector
     * @page     current page in browser
     * @return   linkHandlers
    */
    async findVisibleXPATH(selector, page) {
        const pollingTime = 1000;
        const waitingTime = 1200000;
        const finishTime = new Date().getTime() + waitingTime;
        let failedMessage  = "[FAIL] Selector not found (XPATH): " + selector +
                             "\nYou need to pass both selector and page to this method";

        while (new Date().getTime() < finishTime) {
          try {
              let linkHandlers = await page.$x(selector);
              if (linkHandlers.length > 0) {
                  console.log("[SUCCESS] Selector found (XPATH): " + selector);
                  return linkHandlers;
              } else {
                  console.log(new Date().getTime() + " Selector still not visible (XPATH): " + selector);
                  await page.waitForTimeout(pollingTime);
              }
          }
          catch (error) {
              console.log(failedMessage);
              page.isSuccess = false;
          }
        }
        console.log("[FAIL] Selector still not visible (XPATH): " + selector);
        page.isSuccess = false;
    }

    /**
     * Find CSS selector and return it to further flows
     * @selector CSS selector
     * @page     current page in browser
     * @options  hidden, returnValue or undefined :)
     * @return   await page.$(selector)  -- if options===returnValue
    */
    async CSS(selector, page, options) {
        const waitingTime = 120000;
        let successMessage = "[SUCCESS] Selector found (CSS): " + selector;
        let failedMessage  = "[FAIL] Selector not found (CSS): " + selector +
                             "\nYou need to pass both selector and page to this method";
        if (page.isSuccess) {
          try {
              //more options to add here
              switch (options) {
                  case 'hidden':
                      await page.waitForSelector(selector, {hidden: true, timeout: waitingTime});
                      successMessage = "[SUCCESS] Selector disappeared (CSS): " + selector;
                      break;
                  case 'returnValue':
                      await page.waitForSelector(selector, {timeout: waitingTime});
                      return await page.$(selector);
                  default:
                      await page.waitForSelector(selector, {timeout: waitingTime});
              }
          } catch (error) {
              page.isSuccess = false;
          }
        }
        page.isSuccess? console.log(successMessage) : console.log(failedMessage);
    }

    /**
     * Find CSS selector in iframe(s) and return it to further flows
     * @selector CSS selector
     * @page     current page in browser
     * @options  hidden, returnValue or undefined :)
     * @return   await page.$(selector)  -- if options===returnValue
    */
    async CSSIframe(selector, page, options) {
        const waitingTime = 1200000;
        let successMessage = "[SUCCESS] Selector found (CSS): " + selector;
        let failedMessage  = "[FAIL] Selector not found (CSS): " + selector +
                             "\nYou need to pass both selector and page to this method";

        if (page.isSuccess) {
          try {
              //more options to add here
              switch (options) {
                  case 'hidden':
                      await page.waitForSelector(selector, {hidden: true, timeout: waitingTime});
                      successMessage = "[SUCCESS] Selector disappeared (CSS): " + selector;
                      break;
                  case 'returnValue':
                      await page.waitForSelector(selector, {timeout: waitingTime});
                      return await page.$(selector);
                  default:
                      await page.waitForSelector(selector, {timeout: waitingTime});
              }
          } catch (error) {
              page.isSuccess = false;
          }
        }
        page.isSuccess? console.log(successMessage) : console.log(failedMessage);
    }
    /**
     * Check existense of CSS selector in iframe(s) and return true or false.
     * @selector CSS selector
     * @page     current page in browser
     * @waitingTime  time in millis ( default 5000 ms)
     * @return  true or false
    */
    async isElementExists(selector, page, waitingTime = 5000) {
    
        if (page.isSuccess) {
          try {
              await page.waitForSelector(selector, {timeout: waitingTime});
          } catch (error) {
             return false;
          }
          return true;
        }
        return false;
    }
	
	    /**
     * Wait for XPATH selector to be found or not
     * @selector XPATH selector
     * @page     current page in browser
     * @return   true or false
    */
    async isExistedXPATH(selector, page) {
        const pollingTime = 1000;
        const waitingTime = 1200000;
        const finishTime = new Date().getTime() + waitingTime;
        let failedMessage  = "[FAIL] Selector not found (XPATH): " + selector +
                             "\nYou need to pass both selector and page to this method";

        while (new Date().getTime() < finishTime) {
          try {
              let linkHandlers = await page.$x(selector);
              if (linkHandlers.length > 0) {
                  console.log("[SUCCESS] Selector found (XPATH): " + selector);
                  return true;
              } else {
                  console.log(new Date().getTime() + " Selector still not visible (XPATH): " + selector);
                  await page.waitForTimeout(pollingTime);
              }
          }
          catch (error) {
              return false;
          }
        }
        return false;
    }

}


module.exports = Find;
