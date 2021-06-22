declare module 'rpi-ws281x-native' {
    type FullParams = {
        dma: number;
        freq: number;
        channels: ChannelParams[];
    };

    type ChannelParams = {
        count: number;
        gpio: number;
        invert: boolean;
        brightness: number;
        stripType: stripType | number;
    };

    type CombinedParams = ChannelParams & Pick<FullParams, 'dma' | 'freq'>;

    declare class Channel {
        public readonly count: number;
        public readonly stripType: stripType | number;
        public readonly invert: boolean;
        public readonly gpio: number;
        public brightness: number;
        public buffer: Buffer;
        public array: Uint32Array;

        private _id: number;
        private _params: ChannelParams;

        constructor(channelId: number, params: ChannelParams);

        private _reset(): void;

        private _init(): void;

        private _update(): void;
    }

    declare enum stripType {
        // 4 color R, G, B and W ordering
        SK6812_RGBW = 0x18100800,
        SK6812_RBGW = 0x18100008,
        SK6812_GRBW = 0x18081000,
        SK6812_GBRW = 0x18080010,
        SK6812_BRGW = 0x18001008,
        SK6812_BGRW = 0x18000810,

        // 3 color R, G and B ordering
        WS2811_RGB = 0x00100800,
        WS2811_RBG = 0x00100008,
        WS2811_GRB = 0x00081000,
        WS2811_GBR = 0x00080010,
        WS2811_BRG = 0x00001008,
        WS2811_BGR = 0x00000810,

        // predefined fixed LED types
        WS2812 = 0x00081000, // WS2811_STRIP_GRB,
        SK6812 = 0x00081000, // WS2811_STRIP_GRB,
        SK6812W = 0x18080010 // SK6812_STRIP_GRBW
    }

    /**
     * Submits the current state of the channel-buffers to the driver for rendering.
     */
    function init(params: Partial<FullParams>): Channel[];

    /**
     * Submits the current state of the channel-buffers to the driver for rendering.
     */
    function render(): void;

    /**
     * resets all color-values of all channels and renders.
     */
    function reset(): void;

    /**
     * Shuts down the library, freeing allocated memory and resources.
     * This should always be called when terminating the program.
     */
    function finalize(): void;

    /**
     * Simple initializer for single-channel usage.
     * @param {number} numLeds number of LEDs
     * @param {CombinedParams} options additional options.
     * @return {Channel}
     */
    export default function (numLeds: number, options?: Partial<CombinedParams>): Channel;

    export { init, render, reset, finalize, stripType };
}
