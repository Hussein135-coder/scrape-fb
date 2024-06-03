const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

const { CHROME_EXECUTABLE_PATH } = require("./src/config");
const main = require("./src/main");

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ hi: "Hi" });
});

(async () => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });
  main(browser);
})();

module.exports = app;
