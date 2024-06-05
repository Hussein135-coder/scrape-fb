const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const { execSync } = require('child_process');

const main = require("./src/main");

process.env.LD_LIBRARY_PATH = '../chromium-libs/usr/lib/x86_64-linux-gnu';
process.env.LD_LIBRARY_PATH += ':../chromium-libs/lib/x86_64-linux-gnu';
process.env.LD_LIBRARY_PATH += ':../chromium-libs/usr/lib';
process.env.LD_LIBRARY_PATH += ':../chromium-libs/usr/lib/x86_64-linux-gnu/';



const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ hi: "Hi" });
});

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '../chromium/chrome-linux/chrome',
    headless: true // Ensure the browser runs in headless mode
  });
  main(browser);
})();

module.exports = app;
