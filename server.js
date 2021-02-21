const { onepieceCrawl } = require('./targetURLs/onepieceCrawl');

let oneCrawl = onepieceCrawl();
oneCrawl.then(function (result) {
    console.log(result);
});


