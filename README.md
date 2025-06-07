# Läslistan E2E Testing with Playwright

This project tests the key features of the Läslistan app using Playwright.

## What is tested
- Navigation between views
- Adding a new book
- Favoriting a book
- Displaying favorited books

## Folder structure
- `src/tests`: Contains E2E test files
- `STORIES.md`: User stories
- `README.md`: This file

## How to run tests
Install dependencies and run:

```bash
npm install
npx playwright install
npx playwright test
npx playwright show-report