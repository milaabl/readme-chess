const { convert2img } = require("mdimg");
const fs = require("fs");
const axios = require('axios');

(async () => {
    const res = await axios.get("https://raw.githubusercontent.com/milaabl/readme-chess/master/README.md");

    fs.writeFileSync("./node_modules/mdimg/template/css/github.css", `@import "https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css";
    @import "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-light.min.css";
    .markdown-body {
      padding: 0;
    }`)

    const data = res.data;

    const readmeTextContents = data.split('<!-- BEGIN CHESS BOARD -->')[1].split('<!-- END CHESS BOARD -->')[0].replaceAll(`"img`, `"https://raw.githubusercontent.com/milaabl/readme-chess/master/img`);


    fs.writeFileSync('./file.md', readmeTextContents);


    await convert2img({
        mdFile: "./file.md",
        outputFilename: "./chess.png",
        cssTemplate: "github",
        width: 500
    });

})();