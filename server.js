const { onepieceCrawl } = require('./targetURLs/onepieceCrawl');
const fs = require('fs');

let oneCrawl = onepieceCrawl();
oneCrawl.then(function (result) {
    fs.writeFileSync('onepieceData.json', JSON.stringify(result));
    // console.log(result)
});


