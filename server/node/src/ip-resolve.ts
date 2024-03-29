import { networkInterfaces } from 'os';

export function getIp() {

    const nets = networkInterfaces();
    const results = Object.create(null); // or just '{}', an empty object

    let lastIp = '';

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }

                results[name].push(net.address);
                lastIp = net.address;
            }
        }
    }

    console.log(results);
    return lastIp;
}