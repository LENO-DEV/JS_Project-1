const https = require("http");
const fs = require("fs");
const url = require("url");
const { replaceTemplate } = require("./Own_modules/replacefunction.js");
var PORT = process.env.PORT || 8000;

const temp_overview = fs.readFileSync("templates/overview.html", "utf-8");
const temp_single = fs.readFileSync("templates/single_overview.html", "utf-8");
const temp_product = fs.readFileSync("templates/product.html", "utf-8");

// Json Data.........................
const data = fs.readFileSync("dev-data/data.json", "utf-8");
const data_object = JSON.parse(data); //************************* Main Part *****************************

const server = https.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);


  //***************************** Overview Page ************************

  if (pathname === "/") {
    const html_data = data_object.map((el) => {
      // here callback func. call each element of array in orderwise.........
      return replaceTemplate(temp_single, el); // 'el' refers to a single product.........
    });
    const output = temp_overview.replace("{% Main Inserting %}", html_data);
    res.end(output);
  }

  //**************************** Product page ***************************
  else if (pathname === "/product") {
    const product_display = data_object[query.id]; // Parsing variables fsorm URL......................
    const output = replaceTemplate(temp_product, product_display);
    res.end(output);
  }

  // Not found Page......................................
  else {
    res.end("Okay cool !");
  }
});

server.listen(PORT, () => {
  console.log("Listening on port 8000.....");
});