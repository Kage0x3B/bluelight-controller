import { loadLogger } from './bootstrap/LoggerBootstrap';
import { Server } from './Server';
import { Logger } from './util/Logger';
import { finalize, init, render, reset, stripType } from 'rpi-ws281x-native';
import { colorWheel } from './util/colorUtil';

const NUM_LEDS = 202;

let log: Logger;

async function initialize() {
    loadLogger();

    log = new Logger(__filename);

    const server = new Server();
    server.start();

    log.info('Initialization complete!');

    testLights();
}

initialize();

const colors = [0xff0000, 0x00ff00, 0x0000ff];

function testLights() {
    const channel = init({
        dma: 10,
        freq: 800000,
        channels: [
            {
                gpio: 18,
                brightness: 255,
                count: NUM_LEDS,
                invert: false,
                stripType: stripType.WS2811_RGB
            }
        ]
    })[0];

    let offset = 0;
    setInterval(function() {
        for (let i = 0; i < 3 * NUM_LEDS; i++) {
            channel.array[i] = colorWheel((offset + i) % 256);
        }

        offset = (offset + 1) % 256;
        render();
    }, 1000 / 30);

    log.info('Press <ctrl>+C to exit.');
}

process.on('SIGINT', function () {
    reset();
    finalize();

    process.nextTick(function () {
        process.exit(0);
    });
});
