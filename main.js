const { convert2img } = require("mdimg");
const fs = require("fs");
const axios = require('axios');

(async () => {
    const res = await axios.get("https://raw.githubusercontent.com/milaabl/readme-chess/master/README.md");

    const data = res.data;

    const readmeTextContents = data.split('<!-- BEGIN CHESS BOARD -->')[1].split('<!-- END CHESS BOARD -->')[0].replaceAll(`"img`, `"https://raw.githubusercontent.com/milaabl/readme-chess/master/img`);

    console.log({readmeTextContents});


    fs.writeFileSync('./file.md', readmeTextContents);


    await convert2img({
        mdFile: "./file.md",
        outputFilename: "./chess.png",
        width: 600,
        cssTemplate: "github",
    });

})();