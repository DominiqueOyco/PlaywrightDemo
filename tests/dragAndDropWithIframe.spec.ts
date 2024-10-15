import { test, expect } from '@playwright/test'

test('drag and drop with iframes', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')

    //go inside the iframe to perform actions in the target locator
    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
    await frame.locator('li', { hasText: "High Tatras 2" }).dragTo(frame.locator('#trash')) //drag High Tatras 2 image to trash box which has the id=trash

    //more precise control
    await frame.locator('li', { hasText: "High Tatras 4" }).hover()
    await page.mouse.down()
    await frame.locator('#trash').hover()
    await page.mouse.up()

    await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2", "High Tatras 4"])
})