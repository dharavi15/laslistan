import { test, expect } from '@playwright/test'

// Group: Add Book Functionality
test.describe('Add Book Functionality in Läslistan App', () => {

  // This runs before each test to navigate to the app
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');
  });

  // User Story:User can add a new book using the form
  // As a user, I want to add a new book by entering its title and author in the form,
  // so that I can save it to the catalog and keep track of the books I want to read.
  test('User can add a new book using the form', async ({ page }) => {
    await page.getByTestId('add-book').click();
    await page.getByTestId('add-input-title').click();
    await page.getByTestId('add-input-title').fill('bbbb');
    await page.getByTestId('add-input-author').click();
    await page.getByTestId('add-input-author').fill('gggg');
    await page.getByTestId('add-submit').click();
  });

  // User Story:
  // As a user, I want the "Lägg till ny bok" button to remain disabled if I only enter the title and leave the author blank,
  // so that I don’t accidentally submit an incomplete book entry.
  test('Submit button is disabled if only title is filled', async ({ page }) => {
    await page.getByTestId('add-book').click();
    await page.getByTestId('add-input-title').fill('Bok utan författare');
    await expect(page.getByTestId('add-input-author')).toHaveValue('');
    await expect(page.getByTestId('add-submit')).toBeDisabled();
  });

  // User Story: Book is added to catalog when both title and author are filled
  // As a user, I want to verify that a newly added book appears in the Katalog view after submission,
  // so that I know the book was successfully saved to my reading list.
  test('Book is added to catalog when both title and author are filled', async ({ page }) => {
    await page.getByTestId('add-book').click();

    const title = 'Min testbok';
    const author = 'Test Författare';

    await page.getByTestId('add-input-title').fill(title);
    await page.getByTestId('add-input-author').fill(author);

    const submitButton = page.getByTestId('add-submit');
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    await page.getByTestId('catalog').click();
    await expect(page.getByText(title)).toBeVisible();
    await expect(page.getByText(author)).toBeVisible();
  });

});


//user story
//As a user, I want the title and author input fields to be cleared after I submit a book,
//so that I can easily add a new book without manually clearing the form.
test('Input fields are cleared after adding a book', async ({ page }) => {
  await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');

  // Step 1: Open form by clicking lägg till bok
  await page.getByTestId('add-book').click();

  // Step 2: Fill and submit
  const title = 'Form Clear Test';//I created two variables: title and author,
  const author = 'Clear Author'; 
  await page.getByTestId('add-input-title').fill(title);
  await page.getByTestId('add-input-author').fill(author);
  await page.getByTestId('add-submit').click();

  // Step 3: Go to "Katalog" first, then back to form (ensures nav works)
  await page.getByTestId('catalog').click();
  await page.getByTestId('add-book').click();

  // Step 4: Check that form fields are cleared
  await expect(page.getByTestId('add-input-title')).toHaveValue('');
  await expect(page.getByTestId('add-input-author')).toHaveValue('');
});

//user story
//As a user, I want to be able to enter Swedish characters like å, ä, ö in the title and author fields,
//so that I can correctly spell Swedish book titles and names.
test('Form accepts Swedish characters in title and author', async ({ page }) => {
  await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');
  await page.getByTestId('add-book').click();

  const title = 'En dröm om blåbärssoppa';
  const author = 'Åke Ängström';

  await page.getByTestId('add-input-title').fill(title);
  await page.getByTestId('add-input-author').fill(author);
  await page.getByTestId('add-submit').click();

  await page.getByTestId('catalog').click();

  await expect(page.getByText(title)).toBeVisible();
  await expect(page.getByText(author)).toBeVisible();
});







