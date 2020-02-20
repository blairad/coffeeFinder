const fs = require('fs');
const http = require('http');
const url = require('url');


const replaceTemplate = (template, cafe) => {
    let output = template.replace(/{%NAME%}/g, cafe.cafeName);
    output = output.replace(/{%ADDRESS%}/g, cafe.address);
    output = output.replace(/{%WEBSITE%}/g, cafe.website);

    // if (!cafe.roaster)
    //     output = output.replace(/{%NOT_ROASTER%}/g, 'not-roaster');
    // return output;

    if (cafe.roaster) {
        output = output.replace(/{%ROASTER%}/g, 'Roaster');
        return output;
    } else {
        return output = output.replace(/{%NOT_ROASTER%}/g, 'not-roaster');;
    }
}


const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/cafe-template-card.html`, 'utf-8');
//const templateCafe = fs.readFileSync(`%{__dirname}/templates/template-cafe.html`, 'uts-8')

const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8")
const dataObject = JSON.parse(data);
// console.log(data)


const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === 'overview') {
        res.writeHead(200, {
            "content-type": "text/html"
        });

        const cardsHtml = dataObject.map(element => replaceTemplate(templateCard, element)).join('');
        const output = templateOverview.replace('{%COFFEE_CARDS%}', cardsHtml)
        res.end(output);

    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h3>Page Not Found</h3>');
    }
})
server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on port 3000')
});