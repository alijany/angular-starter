import { $, browser, by, element, ExpectedConditions } from 'protractor'

export class TestPage {
  navigateTo () {
    return browser.get('/')
  }

  getTitle () {
    return element(by.css('body > app-root > div > h1')).getText()
  }

  isListLoaded () {
    const until = ExpectedConditions
    return new Promise<boolean>((resolve) => {
      browser.wait(until.presenceOf(
        $('app-operations > div > mat-list')), 5000, 'List taking too long to appear in the DOM'
      )
        .then(() => resolve(true))
        .catch(() => resolve(false))
    })
  }
}
