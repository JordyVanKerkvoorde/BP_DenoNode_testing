const axios = require('axios');
const fs = require('fs');


async function testNodeVanilla(){
        const testApi = async (nrOfRequests) => {
            const requests = new Array(nrOfRequests).fill(null);
    
            try {
                const reqs = requests.map(_ => axios.get('http://localhost:3030/'));
                const start = new Date();
                await Promise.all(reqs)
                const end = new Date();
    
                return end - start;
            } catch(err) {
                console.log(err)
            }
        }
    
        let tests = [];
    
        for(let i = 1; i <= 35; i++) {
            const time = await testApi(i ** 2);
    
            tests.push({
                nrOfCalls: i ** 2,
                time
            })
    
            await sleep(1000)
            console.log(i ** 2)
        }
    
        console.log(tests);
        fs.writeFileSync('./results/node.requests.vanilla.json',  JSON.stringify(tests, null, 2), 'utf8');
    }
    
    function normalizeVanilla() {
        const fileObject = JSON.parse(fs.readFileSync('./results/node.requests.vanilla.json', 'utf8'));
        const normalized = fileObject.map(x => {return {nrOfCalls: x.nrOfCalls, totalTime: x.time, timePerCall: (x.time / x.nrOfCalls)}});
        console.log(normalized);
    
        fs.writeFileSync('./results/node.requests.vanilla.normalized.json',  JSON.stringify(normalized, null, 2), 'utf8');
    
        const coords = normalized.map(x => `(${x.nrOfCalls},${x.timePerCall})`).join('');
    
        console.log(coords)
    }
    
    function sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
    } 


    async function testNodeAPI() {
    
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
                const reqs = requests.map(_ => axios.post('http://localhost:3000/venues', body, { headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1dWlkIjoiOTU3MjY4OWYtMDI3MS00MjY0LWFkNzYtMTgyOTA4MDg3ZGVjIiwiZmlyc3ROYW1lIjoiT3duZXIiLCJsYXN0TmFtZSI6Ik93bmVyIiwiZGF0ZU9mQmlydGgiOiIyMDIxLTA1LTAyIiwiZW1haWwiOiJvd25lckB0ZXN0LmJlIiwicGFzc3dvcmQiOiJmOTg1MjE0Y2U4MjNiMTE1MjM1ODQ4NDMyNzQ0MTg2NWZlYWYyOGIwNTk1Y2Q4MzEyM2I2YWQwMzQzZjY5YjFlM2M1NzkxNmVkNTgyYjhmZWUyZjljOGJkYWYyZjQxYTY5ZjE5NTdiYTg2ZTY4OTM1ZDE0NWVjN2E3YWQ3MmYwNSIsInNhbHQiOiIxOWI5YWZkOTA0Y2ZhMDE0Iiwicm9sZSI6Ik9XTkVSIiwiY3JlYXRlZEF0IjoiMjAyMS0wNS0wMlQxNDoxMzo0OC4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0wNS0wMlQxNDoxMzo0OC4wMDBaIn0sImlhdCI6MTYyMjExMzgxOCwiZXhwIjoxNjIyMjAwMjE4fQ.tuOZaX5Gedu-v3MECdaVvMBBALShbumgCh7l50z85TQ' }}));
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
                nrOfCalls: i ** 2,
                time
            })
            console.log(`${i ** 2}: ${time}`)
            // sleep(2000)
        }
    
        console.log(tests);
        fs.writeFileSync('./results/node.requests.results.json',  JSON.stringify(tests, null, 2), 'utf8');
    }
    
    function normalize() {
        const fileObject = JSON.parse(fs.readFileSync('./results/node.requests.results.json', 'utf8'));
        const normalized = fileObject.map(x => {return {nrOfCalls: x.nrOfCalls, totalTime: x.time, timePerCall: Math.ceil(x.time / x.nrOfCalls)}});
        console.log(normalized);
    
        fs.writeFileSync('./results/node.requests.normalized.results.json',  JSON.stringify(normalized, null, 2), 'utf8');
    
        const coords = normalized.map(x => `(${x.nrOfCalls},${x.timePerCall})`).join('');
    
        console.log(coords)
    }
    
    // function repair() {
    //     const fileObject = JSON.parse(fs.readFileSync('./results/deno.requests.results.json', 'utf8'));
    //     let repaired = [];
    //     fileObject.forEach((val, index) => {
    //         val.nrOfCalls = (index + 1) ** 2;
    //         repaired.push(val);
    //     })
    
    //     // console.log(repaired)
    
    //     fs.writeFileSync('./results/deno.requests.results.json',  JSON.stringify(repaired, null, 2), 'utf8');
    // }

    function sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
    } 

    async function correct() {
        const fileObject = JSON.parse(fs.readFileSync('./results/node.requests.results.json', 'utf8'));

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
                const reqs = requests.map(_ => axios.post('http://localhost:3000/venues', body, { headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1dWlkIjoiOTU3MjY4OWYtMDI3MS00MjY0LWFkNzYtMTgyOTA4MDg3ZGVjIiwiZmlyc3ROYW1lIjoiT3duZXIiLCJsYXN0TmFtZSI6Ik93bmVyIiwiZGF0ZU9mQmlydGgiOiIyMDIxLTA1LTAyIiwiZW1haWwiOiJvd25lckB0ZXN0LmJlIiwicGFzc3dvcmQiOiJmOTg1MjE0Y2U4MjNiMTE1MjM1ODQ4NDMyNzQ0MTg2NWZlYWYyOGIwNTk1Y2Q4MzEyM2I2YWQwMzQzZjY5YjFlM2M1NzkxNmVkNTgyYjhmZWUyZjljOGJkYWYyZjQxYTY5ZjE5NTdiYTg2ZTY4OTM1ZDE0NWVjN2E3YWQ3MmYwNSIsInNhbHQiOiIxOWI5YWZkOTA0Y2ZhMDE0Iiwicm9sZSI6Ik9XTkVSIiwiY3JlYXRlZEF0IjoiMjAyMS0wNS0wMlQxNDoxMzo0OC4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0wNS0wMlQxNDoxMzo0OC4wMDBaIn0sImlhdCI6MTYyMjExMzgxOCwiZXhwIjoxNjIyMjAwMjE4fQ.tuOZaX5Gedu-v3MECdaVvMBBALShbumgCh7l50z85TQ' }}));
                const start = new Date();
                await Promise.all(reqs)

                const end = new Date();
    
                return end - start;
            } catch(err) {
                console.log(err)
            }
        }

        let tests = []

        for(let i = 0; i < fileObject.length; i++){
            if(!fileObject[i].time) {
                const time = await testApi(fileObject[i].nrOfCalls);
    
                tests.push({
                    nrOfCalls: fileObject[i].nrOfCalls,
                    time
                })
                console.log(`${fileObject[i].nrOfCalls}: ${time}`)
                // sleep(2000)
            } else {
                tests.push(fileObject[i])
            }
        }
        
        // fileObject.forEach(async (x) => {
        //     if(!x.time) {
        //         const time = await testApi(x.nrOfCalls);
    
        //         tests.push({
        //             nrOfCalls: x.nrOfCalls,
        //             time
        //         })
        //         console.log(x.nrOfCalls)
        //         sleep(2000)
        //     } else {
        //         tests.push(x)
        //     }
        // })

        console.log(tests);

        fs.writeFileSync('./results/node.requests_corrected.results.json',  JSON.stringify(tests, null, 2), 'utf8');
    }

exports.testNodeVanilla = testNodeVanilla;
exports.normalizeVanilla = normalizeVanilla;
exports.normalize = normalize;
exports.testNodeAPI = testNodeAPI;
exports.correct = correct;