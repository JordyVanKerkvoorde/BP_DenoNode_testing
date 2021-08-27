const fs = require('fs');
const path = require('path');

const denoResults = JSON.parse(fs.readFileSync(path.resolve('./resultcopy/deno_results_10k.json')));
const nodeResults = JSON.parse(fs.readFileSync(path.resolve('./resultcopy/node_results_10k.json')));

const getAvgRuntime = () => {
    let denoAvg = 0;
    let nodeAvg = 0;

    Object.keys(denoResults.results).forEach(i => {
        denoAvg += denoResults.results[i];
    });

    Object.keys(nodeResults.results).forEach(i => {
        nodeAvg += nodeResults.results[i];
    });

    denoAvg = denoAvg / Object.keys(denoResults.results).length;
    nodeAvg = nodeAvg / Object.keys(nodeResults.results).length;

    return {
        denoAvg,
        nodeAvg
    }
}

function formatToLaTex() {
    const coordsDeno = Object.keys(denoResults.results).map(key => `(${key},${denoResults.results[key]})`).join(' ');
    const coordsNode = Object.keys(nodeResults.results).map(key => `(${key},${nodeResults.results[key]})`).join(' ');

    const obj = {
        coordsDeno, 
        coordsNode
    };
    //console.log(obj)

    fs.writeFileSync(path.resolve('./resultcopy/formated.json'), JSON.stringify(obj, null, 4));
}

function getNumberOfTimesNodeWasFaster() {
    let n = 0;
    Object.keys(denoResults.results).forEach(key => {
        if(denoResults.results[key] > nodeResults.results[key]) n += 1;
    });

    return n;
}

// console.log(getAvgRuntime());
// formatToLaTex();
console.log(getNumberOfTimesNodeWasFaster());
console.log(Object.keys(denoResults.results).length);
