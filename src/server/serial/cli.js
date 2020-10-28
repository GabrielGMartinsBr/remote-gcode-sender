const SerialPort = require('serialport');

const BasicInterface = require('./basic-interface');

// This func must find the best device to interact with
async function findDevice() {
    const devices = await SerialPort.list();
    for (const device of devices) {
        if (device && device.manufacturer && /arduino|silicon labs/gi.test(device.manufacturer)) {
            return device;
        } else console.log(device)
    }
    return null;
}

// This func should start everything
async function initCli() {

    const device = await findDevice();

    if (!device) {
        console.warn('No interesting devices found.');
        return;
    }

    const port = new SerialPort(device.path, { autoOpen: true, baudRate: 9600 }, err => {
        if (err) {
            console.log(err.message);
            return;
        }
        BasicInterface.setup(port);
    });
}

module.exports.initCli = initCli;

initCli()