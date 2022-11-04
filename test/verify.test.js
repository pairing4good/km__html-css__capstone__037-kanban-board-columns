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

describe('the class card', () => {
  it('should have a solid, black outline', async () => {
    const border = await page.$eval('.card', (card) => {
      var style = window.getComputedStyle(card);
      return style.getPropertyValue('border-style');
    });
      
    expect(border).toBe('solid');
  });
  
  it('should have a 10px margin', async () => {
    const margin = await page.$eval('.card', (card) => {
      var style = window.getComputedStyle(card);
      return style.getPropertyValue('margin');
    });
      
    expect(margin).toBe('10px');
  });
  
  it('should have a 3px, gray shadow', async () => {
    const shadow = await page.$eval('.card', (card) => {
      var style = window.getComputedStyle(card);
      return style.getPropertyValue('box-shadow');
    });
      
    expect(shadow).toBe('rgb(211, 211, 211) 3px 3px 0px 0px');
  });
  
  it('should be 175px wide', async () => {
    const width = await page.$eval('.card', (card) => {
      var style = window.getComputedStyle(card);
      return style.getPropertyValue('width');
    });
      
    expect(width).toBe('175px');
  });
});

describe('the row class', () => {
  it('should be removed from the tasks in the HTML', async () => {
    const rows = await page.$$('.row');
    
    expect(rows.length).toBe(0);
  });
});

describe('the row css declaration', () => {
      
  it('should be removed from the style element', async () => {
    const declarations = await page.$eval('style', (style) => {
      return (style.innerHTML.match(/.row/g) || []).length;
    });
    
    expect(declarations).toBe(0);
  });
});