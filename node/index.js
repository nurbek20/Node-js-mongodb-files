// const hello = 'Hello World'
// console.log(hello)

const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

////////////////////////// ? FILES
//? npm пакеты https://www.npmjs.com/
//? Blocking, synchronous way
//! npm i slugify package-lock.json
//! npm i nodemon --save-dev node_modules
//! sudo npm i nodemon --global
//? npm outdated  устаревший
//? npm i slugify@1.0.0
//? npm update slugify
//? npm i express  для скачивания екпресс
//? npm unistall express  для удаления експресс

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

//? Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('ERROR! 💥');

//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3);

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('Your file has been written 😁');
//       })
//     });
//   });
// });
// console.log('Will read file!');

////////////////////////// ? SERVER

// const replaceTemplate=(temp, product)=>{
//     let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//     output = output.replace(/{%IMAGE%}/g, product.image);
//     output = output.replace(/{%PRICE%}/g, product.price);
//     output = output.replace(/{%FROM%}/g, product.from);
//     output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//     output = output.replace(/{%QUANTITY%}/g, product.quantity);
//     output = output.replace(/{%DESCRIPTION%}/g, product.description);
//     output = output.replace(/{%ID%}/g, product.id);

//     if(!product.organic) output = output.replace(/{% NOT_ORGANIC %}/g, 'not-organic');
//     return output;
// }

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) =>
  slugify(el.productName, {
    lower: true,
  })
);
console.log('slugify', slugs);

// console.log(slugify('Fresh Avocados', { lower: true }));

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  // console.log(req.url);
  // console.log(url.parse(req.url, true));
  // const pathName = req.url;
  //? Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(output);
    // console.log(cardsHtml)

    // res.end('This is the OVERVIEW');

    //? Product page
  } else if (pathname === '/product') {
    // console.log(query)
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // res.end('This is the Product');

    //? API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);
    // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
    //     const productData = JSON.parse(data);
    //     res.writeHead(200, {'Content-type':'application/json'})
    //     // console.log(productData);
    //     res.end(data);
    // })
    // res.end('API');

    //? Not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text.html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page not found!</h1>');
  }
  // res.end('Hello from the server! ');
});
server.listen(8000, '127.0.0.1', () => {
  console.log('Listen to requests on port 8000');
});
