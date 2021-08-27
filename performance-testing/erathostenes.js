// const fs = require('fs'); // uncomment for node run
// const path = require('path'); // uncomment for node run

var eratosthenes = function(n) {
    var array = [], upperLimit = Math.sqrt(n), output = [];

    for (var i = 0; i < n; i++) {
        array.push(true);
    }

    for (var i = 2; i <= upperLimit; i++) {
        if (array[i]) {
            for (var j = i * i; j < n; j += i) {
                array[j] = false;
            }
        }
    }

    for (var i = 2; i < n; i++) {
        if(array[i]) {
            output.push(i);
        }
    }

    return output;
};

//console.log(eratosthenes(700));

async function testPerformance(number) {
    const start = Date.now();
    let output = {};
    for(let i = 0; i <=number; i+=10000){
        console.log(i)
        const start = Date.now();
        const vals = eratosthenes(i);
        // console.log(vals)
        const end = Date.now();
        output[i] = end - start;
        // output[i] = i;
    }

    const end = Date.now();

    const summary = {
        totalTime: end - start,
        memory: `${Deno.memoryUsage().heapUsed / 1024 / 1024} MB used`,
        // memory: `${(process.memoryUsage().heapUsed) / 1024 / 1024} MB used`, // uncomment for node run
        // cpu: `${process.cpuUsage().system} μs`, //uncomment for node run
        results: output
    };
    console.log(summary);
    console.log(Deno.memoryUsage());
    await Deno.writeTextFile('./deno_results_10k2.json', JSON.stringify(summary, null, 4)); // uncomment for deno run
    // fs.writeFileSync(path.resolve('./node_results_10k2.json'), JSON.stringify(summary, null, 4)) // uncomment for node run
}

testPerformance(5000000);
