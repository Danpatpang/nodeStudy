const fs = require(`fs`);

setInterval(() => {
    fs.unlink(`./abc.js`, err => {
        if(err) {
            console.error(err);
        }
    });
}, 1000);