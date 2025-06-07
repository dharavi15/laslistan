import { test, expect } from '@playwright/test'

// Group all navigation tests
test.describe('Navigation Tests for Läslistan App', () => {

  // This runs before each test in this describe block
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/');
  });


  //User story
  //As a user, I want to see any message or text when I open the app, so that I know I’m in the right place.
  test('User sees message on initial load', async ({ page }) => {
    await expect(page.getByText('Sidan för dig som gillar att läsa')).toBeVisible();
  });


  //User story
  //As a user, I want to go to the “Lägg till bok” view, so that I can add a new book I like.
  test('User can open Lägg till bok form', async ({ page }) => {
    await page.getByTestId('add-book').click();
    await expect(page.getByTestId('add-submit')).toBeVisible();
  });


//User story
//As a user, I want to switch between the views (Katalog, Mina Böcker, Lägg till bok), so that I can use all the features of the app.
  test('User can navigate between views', async ({ page }) => {
    await page.getByTestId('add-book').click();
    await expect(page.getByTestId('add-submit')).toBeVisible();

    await page.getByTestId('favorites').click();
    await expect(page.getByText('Mina Böcker')).toBeVisible();

    await page.getByTestId('catalog').click();
    await expect(page.getByText('Sidan för dig som gillar att läsa')).toBeVisible();
  });

});
