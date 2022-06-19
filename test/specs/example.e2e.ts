
import { TestPage } from '../pageobjects/app.po'

describe('test App', () => {
  let page: TestPage

  beforeEach(() => {
    page = new TestPage()
  })

  it('Should display title', async () => {
    await page.navigateTo()
    expect(await page.getTitle()).toEqual('Angular Starter')
  })

  it('Should load operations list', async () => {
    await page.navigateTo()
    expect(await page.isListLoaded()).toBeTrue()
  })
})
