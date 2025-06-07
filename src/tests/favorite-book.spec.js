import { test, expect } from '@playwright/test'

// Group: Mina Böcker (Favorites) functionality
test.describe('Mina Böcker Functionality in Läslistan App', () => {

  // Run before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');
  });

  // User Story 1
  // As a user, I want to mark books as favorites using the heart icon in the Katalog view,
  // so that I can save them to the "Mina Böcker" section and easily find them later.
  test('User can favorite books and see them in Mina Böcker view', async ({ page }) => {
    await page.getByTestId('star-Kaffekokaren som visste för mycket').click();
    await page.getByTestId('star-Hur man tappar bort sin TV-fjärr 10 gånger om dagen').click();
    await page.getByTestId('favorites').click();

    await page.waitForTimeout(500); // optional delay to ensure rendering

    await expect(page.getByText(/Kaffekokaren som visste för mycket/i)).toBeVisible();
    await expect(page.getByText(/Hur man tappar bort sin TV-fjärr/i)).toBeVisible();
  });

  //  User Story 2
  // As a user, I want to see only the books I have favorited when I go to the "Mina Böcker" section,
  // so that I don’t get distracted by books I’m not interested in.
  test('Only favorited books appear in Mina Böcker view', async ({ page }) => {
    // Favorite only one book
    await page.getByTestId('star-Min katt är min chef').click();

    // Go to Mina Böcker
    await page.getByTestId('favorites').click();
    await page.waitForTimeout(500);

    // Check that the favorited book is visible
    await expect(page.getByText(/Min katt är min chef/i)).toBeVisible();

    // Check that a non-favorited book does NOT appear
    await expect(page.getByText(/Gräv där du står/i)).not.toBeVisible();
  });

  // User Story 3
  // As a user, I want to remove a book from my favorites by clicking the heart icon again,
  // so that it no longer appears in the "Mina Böcker" section.
  test('User can unfavorite a book and it disappears from Mina Böcker view', async ({ page }) => {
    // Favorite and then unfavorite a book
    const bookTestId = 'star-100 sätt att undvika måndagar';

    await page.getByTestId(bookTestId).click(); // Favorite
    await page.getByTestId(bookTestId).click(); // Unfavorite

    // Go to Mina Böcker
    await page.getByTestId('favorites').click();
    await page.waitForTimeout(500);

    // Assert the book does not appear
    await expect(page.getByText(/100 sätt att undvika måndagar/i)).not.toBeVisible();
  });

});


