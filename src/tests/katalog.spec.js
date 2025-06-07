import { test, expect } from '@playwright/test'

// Group: Katalog view and favoriting books
test.describe('Katalog and Favorites Functionality in Läslistan App', () => {

  // Run before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');
  });

  // User Story:
  // As a user, I want to open the Katalog view and see a list of available books,
  // so that I can explore titles and decide which ones interest me.
  test('User can view a list of available books on Katalog view', async ({ page }) => {
    await expect(page.getByText('Sidan för dig som gillar att läsa. Välj dina favoriter.')).toBeVisible();
    await expect(page.getByText('"Hur man tappar bort sin TV-fjärr 10 gånger om dagen", Bertil Flimmer')).toBeVisible()
    await expect(page.getByText('"Kaffekokaren som visste för mycket", Saga Espresson')).toBeVisible();
    await expect(page.getByText('"Min katt är min chef", Kattis Jamsson')).toBeVisible();
    await expect(page.getByText('"100 sätt att undvika måndagar", Göran Snooze')).toBeVisible();
    await expect(page.getByText('"Gräv där du står – och hitta en pizzameny", Maja Skruv')).toBeVisible();
    await expect(page.getByText('"Jag trodde det var tisdag", Kim Vilsen')).toBeVisible();
    await expect(page.getByText('"Att prata med växter – och vad de egentligen tycker om dig", Flora Tistel')).toBeVisible();
  });

  // User Story:
  // As a user, I want to mark books as favorites using the heart icon in the Katalog view,
  // so that I can save them to the "Mina Böcker" section and easily find them later.
  test('User can favorite books and see them in Mina Böcker view', async ({ page }) => {
    await page.getByTestId('star-Kaffekokaren som visste för mycket').click();
    await page.getByTestId('star-Hur man tappar bort sin TV-fjärr 10 gånger om dagen').click();

    await page.getByTestId('favorites').click();
    await page.waitForTimeout(500); 

    await expect(page.getByText(/Kaffekokaren som visste för mycket/i)).toBeVisible();
    await expect(page.getByText(/Hur man tappar bort sin TV-fjärr/i)).toBeVisible();
  });

});


