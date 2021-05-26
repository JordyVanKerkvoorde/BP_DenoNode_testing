const axios = require('axios');
const fs = require('fs');

async function testDenoAPI() {
    
    const testApi = async (nrOfRequests) => {
        const requests = new Array(nrOfRequests).fill(null);

        let body = {
            name: "VenueTester",
            longitude: 3.5,
            latitude: 51.5,
            address: "venueroad 123",
            availableSpots: 1535
        }
        try {
            const reqs = requests.map(_ => axios.post('http://localhost:3001/venues', body, { headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXVpZCI6ImNiMjIzZDQxLTkxZDctNDhlMC04OGRjLTFlNzMxNDc0M2U3OCIsImZpcnN0TmFtZSI6IlRlc3QiLCJsYXN0TmFtZSI6IlRlc3RlciIsImRhdGVPZkJpcnRoIjoiMjAyMS0wNS0yNVQwMDowMDowMC4wMDBaIiwiZW1haWwiOiJ0ZXN0QHRlc3QudGUiLCJwYXNzd29yZCI6IjY2MzdkZDNkNDQ5MTVhMjc1NDA0M2NmMDVmNzdjODFhMWI0YTZjN2ViM2UyODQyZGIzODMyMDEzNjdlNTg5Mzk5YzE0MWZlMTI5ODYzOThiMDI4YTc2MDkzMjI2MzIwM2ExZjk4NzQ4MzI1MGUzMWMxYjNlZjhkMDJhNWVkNDBkIiwic2FsdCI6IjlscG83ODRvZXR5dHR3ZnAiLCJyb2xlIjoiT1dORVIiLCJjcmVhdGVkQXQiOiIyMDIxLTA1LTI1VDExOjM5OjAxLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA1LTI1VDExOjM5OjAxLjAwMFoifQ.Pi7VIKgJYD_hZegfXbSYhUO93e7Ze7pjbt9rUAr7L7Te4qU57tZoovFdC3KXovSXugD4fqY028_qvFWrS2NUSw' }}));
            const start = new Date();
            await Promise.all(reqs)
                // .then(() => {
                //     console.log('reqs done')
                //     const end = new Date();
                //     console.log(end-start)
                //     return (end - start);
                // })
            const end = new Date();

            return end - start;
        } catch(err) {
            console.log(err)
        }
        
        // const start = new Date();

        // axios.all()

        // const end = new Date();
        // return end - start;
        
    }

    let tests = [];

    for(let i = 1; i <= 30; i++) {
        const time = await testApi(i ** 2);

        tests.push({
            nrOfCalls: i,
            time
        })
        console.log(i ** 2)
    }

    console.log(tests);
    fs.writeFileSync('./results/deno.requests.results.json',  JSON.stringify(tests, null, 2), 'utf8');
}

function normalize() {
    const fileObject = JSON.parse(fs.readFileSync('./results/deno.requests.results.json', 'utf8'));
    const normalized = fileObject.map(x => {return {nrOfCalls: x.nrOfCalls, totalTime: x.time, timePerCall: Math.ceil(x.time / x.nrOfCalls)}});
    console.log(normalized);

    fs.writeFileSync('./results/deno.requests.normalized.results.json',  JSON.stringify(normalized, null, 2), 'utf8');

    const coords = normalized.map(x => `(${x.nrOfCalls},${x.timePerCall})`).join('');

    console.log(coords)
}

function repair() {
    const fileObject = JSON.parse(fs.readFileSync('./results/deno.requests.results.json', 'utf8'));
    let repaired = [];
    fileObject.forEach((val, index) => {
        val.nrOfCalls = (index + 1) ** 2;
        repaired.push(val);
    })

    // console.log(repaired)

    fs.writeFileSync('./results/deno.requests.results.json',  JSON.stringify(repaired, null, 2), 'utf8');
}

async function testDenoVanilla(){
    const testApi = async (nrOfRequests) => {
        const requests = new Array(nrOfRequests).fill(null);

        try {
            const reqs = requests.map(_ => axios.get('http://localhost:3031/'));
            const start = new Date();
            await Promise.all(reqs)
            const end = new Date();

            return end - start;
        } catch(err) {
            console.log(err)
        }
    }

    let tests = [];

    for(let i = 1; i <= 50; i++) {
        const time = await testApi(i ** 2);

        tests.push({
            nrOfCalls: i ** 2,
            time
        })

        await sleep(1000)
        console.log(i ** 2)
    }

    console.log(tests);
    fs.writeFileSync('./results/deno.requests.vanilla.json',  JSON.stringify(tests, null, 2), 'utf8');
}

function normalizeVanilla() {
    const fileObject = JSON.parse(fs.readFileSync('./results/deno.requests.vanilla.json', 'utf8'));
    const normalized = fileObject.map(x => {return {nrOfCalls: x.nrOfCalls, totalTime: x.time, timePerCall: (x.time / x.nrOfCalls)}});
    console.log(normalized);

    fs.writeFileSync('./results/deno.requests.vanilla.normalized.json',  JSON.stringify(normalized, null, 2), 'utf8');

    const coords = normalized.map(x => `(${x.nrOfCalls},${x.timePerCall})`).join('');

    console.log(coords)
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
} 

exports.testDeno = testDenoAPI;
exports.normalizeResults = normalize;
exports.repair = repair;
exports.testDenoVanilla = testDenoVanilla;
exports.normalizeVanilla = normalizeVanilla;
