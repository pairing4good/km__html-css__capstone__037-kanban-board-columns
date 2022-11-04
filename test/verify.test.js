const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the board class', () => {
  it('should display all cards horizontally', async () => {
    const matches = await page.$eval('style', (style) => {
      return style.innerHTML.match(/\.board.*{[\s\S][^}]*display.*:.*flex.*;/g).length;
    });
    
    expect(matches).toBe(1);
  });
});

describe('the cards with a status of todo', () => {
  it('should be grouped inside a div that has an id called todo-column', async () => {
    const cards = await page.$$('#todo-column > .card');
    expect(cards.length).toBe(3);
  });
});

describe('the cards with a status of doing', () => {
  it('should be grouped inside a div that has an id called doing-column', async () => {
    const cards = await page.$$('#doing-column > .card');
    expect(cards.length).toBe(2);
  });
});

describe('the cards with a status of done', () => {
  it('should be grouped inside a div that has an id called done-column', async () => {
    const cards = await page.$$('#done-column > .card');
    expect(cards.length).toBe(3);
  });
});