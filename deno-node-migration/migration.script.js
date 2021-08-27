const fs = require('fs');
const path = require('path');
const http = require('http');

const deno_deps = []

function copyFile() {
    fs.mkdirSync(path.resolve('./node'));
    fs.copyFileSync(path.resolve('./deno/index.js'), path.resolve('./node/index.js'));
    fs.mkdirSync(path.resolve('./node/deno_deps'));
}


function addDeps() {
    const depsts = fs.readFileSync(path.resolve('./deno/deps.ts')).toString().split(';'); // pop is to remove the empty string in this proof of concept
    depsts.pop();
    console.log(depsts);

    depsts.forEach(async deps => {
        const resolveUrl = deps.split('from ')[1].replace(/"/g, '');
        const exports = deps.split('{')[1].split('}')[0].trim() // split on , if multiple not needed for poc
        console.log(resolveUrl)
        console.log(exports);
        const file = fs.createWriteStream(path.resolve(`./node/deno_deps/${exports}.js`));
        const request = http.get(resolveUrl, function(response) {
            response.pipe(file);
        });

        deno_deps.push({
            path: `./node/deno_deps/${exports}.js`,
            file: `${exports}.js`,
            name: exports
        });

        console.log(file)
    })
}

function updateCode() {
    // this should be implemented more dynamicaly and complex but as a poc this proves the point
    let dep = fs.readFileSync(path.resolve(`./node/deno_deps/myCustomFunction.js`)).toString();
    dep = dep.replace(
        'export { myCustomFunction };',
        `module.exports = { myCustomFunction };`
    );
    console.log(dep);
    fs.writeFileSync(path.resolve(`./node/deno_deps/myCustomFunction.js`), dep);

    let index = fs.readFileSync(path.resolve(`./node/index.js`)).toString();
    index = index.replace(
        'import { myCustomFunction } from \'./deps.ts\';',
        'const myCustomFunction = require(\'./deno_deps/myCustomFunction.js\').myCustomFunction;'
        
    );
    fs.writeFileSync(path.resolve(`./node/index.js`), index);
}

copyFile();
addDeps();
updateCode();
