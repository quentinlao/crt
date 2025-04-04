import { test, expect } from "@playwright/test";

test("navigate from home to specific post", async ({ page }) => {
  // Start from the home page
  await page.goto("/");

  // Wait for the posts section to load
  await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();

  const firstPost = page.getByRole("button", { name: "sunt aut facere repellat" });

  await expect(firstPost).toBeVisible();

  // Get the title using heading role
  const titleHeading = firstPost.getByRole("heading", { level: 3 });
  const postTitle = await titleHeading.textContent();

  // Get the body text - since it's in a paragraph
  const postBody = await firstPost.locator("p").textContent();

  // Click navigation postDetail
  await firstPost.click();

  // Verify we're on the detail page description
  await expect(page.getByText(postTitle || "")).toBeVisible();
  await expect(page.getByText(postBody || "")).toBeVisible();
});
