import { test, expect } from "@playwright/test";

test("customer can apply SAVE20 and complete checkout", async ({ page }) => {
  await page.waitForTimeout(1000);
  await page.goto("/");

  // Sign in
  await page.getByLabel("Email").fill("customer@example.com");
  await page.waitForTimeout(1000);
  await page.getByLabel("Password").fill("Quality123");
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByText("Signed in as customer@example.com")).toBeVisible();

  // Add item to cart
  await page.getByRole("button", { name: "Add QA Field Notebook to cart" }).click();
  await expect(page.locator("#subtotal")).toHaveText("$25.00");

  // Apply promo code
  await page.getByLabel("Promotional code").fill("SAVE20");
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Apply promotional code" }).click();
  await expect(page.locator("#discount")).toHaveText("$5.00");
  await expect(page.locator("#total")).toHaveText("$20.00");

  // Complete checkout
  await page.getByRole("button", { name: "Complete checkout" }).click();
  // TODO: assert order confirmation
});