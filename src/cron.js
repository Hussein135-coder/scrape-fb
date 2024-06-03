const { URLS, TELEGRAM_BOT_TOKEN } = require("./config");
const login = require("./login");
const { scrapeAllPages } = require("./scraper");
const { delay } = require("./utils");
const TelegramBot = require("node-telegram-bot-api");
let bot;
async function cronScrape(browser) {
  console.log("Croning...");
  const page = await browser.newPage();
  try {
    bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

    await page.goto(URLS[0], { waitUntil: "networkidle2" });
    if (page.url().includes("login")) {
      console.log("Session expired, logging in again...");
      await login(page, browser);
    }
    await page.close();
    scrapeAllPages(browser, bot);
  } catch (error) {
    console.error("Error during scraping Cron:", error);
    console.log("Retrying Cron...");
    await delay(3000); // Delay before retrying
    await page.close();
    return cronScrape(browser); // Retry main function
  }
}

module.exports = cronScrape;
