const path = require(`path`);

const string = __filename;

console.log(path.sep);
console.log(path.delimiter);
console.log(`========================`);

console.log(path.dirname(string));
console.log(path.extname(string));
console.log(path.basename(string));
console.log(path.basename(string, path.extname(string)));
console.log(`========================`);

console.log(path.parse(string));
console.log(path.format({
    dir: `C:\\users\\zerocho`,
    name: `path`,
    ext: `.js,`
}));

console.log(path.normalize(`C://users\\\\zerocho\\\path.js`));
console.log(`========================`);
console.log(path.isAbsolute(`C:\\`));
console.log(path.isAbsolute(`.\home`));
console.log(`========================`);

console.log(path.relative(`C:\\users\\zerocho\\path.js`, `C:\\`));
console.log(path.join(__dirname, `..`, `..`, `/users`, `.`, `/zerocho`));
console.log(path.resolve(__dirname, `..`, `users`, `.`, `/zerocho`));