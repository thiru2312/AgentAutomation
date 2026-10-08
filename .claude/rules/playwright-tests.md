
---  
paths:   
 - "tests/**/*.ts"   a
 - "playwright.config.ts"

---

# Playwright Rules  
Use Playwright test


## Locators
- Priority: `getByRole` > `getByLabel` > `getByPlaceholder` > `getByTestId` > `getByText`.
- Use CSS/XPath only when no user-facing locator exists, and add a comment explaining why.
- Define locators in page objects, not in spec files


## Synchronization
- Never use `page.waitForTimeout()` or other fixed delays. Rely on auto-waiting locators and web-first assertions; wait for a specific condition (`waitForResponse`, `waitForURL`) when needed.


## Assertions
- Use web-first assertions: `await expect(locator).toBeVisible()`, not `expect(await locator.isVisible()).toBe(true)`.
- Never weaken, remove, or loosen an assertion because the application currently fails it. Instead, mark the test `test.fail()` with an annotation referencing the defect ID, and report the failure.

## Identifiers
- Once a requirement or test-case ID (e.g. `@REQ-0123`, `@TC-0456`) appears in a test title or annotation, never rename, remove, or reuse it.

