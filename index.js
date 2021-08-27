const deno = require('./performance/deno.performance');
const node = require('./performance/node.performance');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.resolve('./package')));

app.get('/my-custom-package', (req, res) => {
    res.type('.ts')
    res.sendFile(path.resolve('./package/mycustom.package.ts'));
});

app.listen(1337, () => {
    console.log(`app listens on port 1337`);
});

// deno.testDeno();
// deno.normalizeResults();
// deno.testDenoVanilla();
// deno.normalizeVanilla();

// node.testNodeVanilla();
// node.normalizeVanilla();
// node.testNodeAPI();
// node.correct();
// node.normalize();