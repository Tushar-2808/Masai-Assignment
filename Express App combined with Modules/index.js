const express = require('express');
const os = require('os');
const dns = require('dns');
const { readFileContent } = require('./read.js');

const app = express();
const port = 3000; 

app.get('/test', (req, res) => {
    res.send("Test route is working!");
});

app.get('/readfile', (req, res) => {
    const content = readFileContent();
    if (content.startsWith("Error:")) {
        res.status(500).send(content);
    } else {
        res.send(content);
    }
});

app.get('/systemdetails', (req, res) => {
    const cpus = os.cpus();
    const platform = os.platform();
    const totalMemoryGB = (os.totalmem() / (1024 ** 3)).toFixed(2) + " GB";
    const freeMemoryGB = (os.freemem() / (1024 ** 3)).toFixed(2) + " GB";
    const cpuModel = cpus.length > 0 ? cpus[0].model : "N/A";
    const cpuCoreCount = cpus.length;

    res.json({
        platform: platform,
        totalMemory: totalMemoryGB,
        freeMemory: freeMemoryGB,
        cpuModel: cpuModel,
        cpuCoreCount: cpuCoreCount
    });
});

app.get('/getip', (req, res) => {
    const hostname = 'masaischool.com'; 

    dns.lookup(hostname, { all: true }, (err, addresses) => {
        if (err) {
            console.error(`DNS lookup error: ${err.message}`);
            return res.status(500).json({ error: `Failed to resolve IP for ${hostname}`, details: err.message });
        }

        const ipv4Addresses = addresses.filter(addr => addr.family === 4).map(addr => addr.address);
        const ipv6Addresses = addresses.filter(addr => addr.family === 6).map(addr => addr.address);
        
        res.json({
            hostname: hostname,
            ipv4Addresses: ipv4Addresses,
            ipv6Addresses: ipv6Addresses,
            firstIpAddress: addresses.length > 0 ? addresses[0].address : "N/A" 
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
