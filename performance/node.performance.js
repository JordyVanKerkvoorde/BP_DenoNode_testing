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

exports.testNodeVanilla = testNodeVanilla;
exports.normalizeVanilla = normalizeVanilla;