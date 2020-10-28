const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline')

/** @param {SerialPort} port */
module.exports.setup = function (port) {
    console.log('Connected!\n');

    port.on('data', buf => console.log('DADOS:', buf.toString()))

    // Setup data output
    const parser = new Readline()
    port.pipe(parser)
    parser.addListener('data', data => {
        console.log('DATA:', data);
    })

    // Setup data input
    process.stdin.addListener('data', data => {
        port.write(data);
    })

}
