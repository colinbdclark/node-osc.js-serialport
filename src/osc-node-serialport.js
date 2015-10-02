var serialport = require("serialport"),
    osc = require("osc");

/**********
 * Serial *
 **********/

osc.SerialPort = function (options) {
    this.on("open", this.listen.bind(this));
    osc.SLIPPort.call(this, options);
    this.options.bitrate = this.options.bitrate || 9600;

    this.serialPort = options.serialPort;
    if (this.serialPort) {
        this.emit("open", this.serialPort);
    }
};

var p = osc.SerialPort.prototype = Object.create(osc.SLIPPort.prototype);
p.constructor = osc.SerialPort;

p.open = function () {
    if (this.serialPort) {
        // If we already have a serial port, close it and open a new one.
        this.once("close", this.open.bind(this));
        this.close();
        return;
    }

    var that = this;

    this.serialPort = new serialport.SerialPort(this.options.devicePath, {
        baudrate: this.options.bitrate
    }, false);

    this.serialPort.open(function() {
        that.emit("open", that.serialPort);
    });
};

p.listen = function () {
    var that = this;

    this.serialPort.on("data", function (data) {
        that.emit("data", data);
    });

    this.serialPort.on("error", function (err) {
        that.emit("error", err);
    });

    this.serialPort.on("close", function (err) {
        if (err) {
            that.emit("error", err);
        } else {
            that.emit("close");
        }
    });

    that.emit("ready");
};

p.sendRaw = function (encoded) {
    if (!this.serialPort) {
        return;
    }

    var that = this;
    this.serialPort.write(encoded, function (err) {
        if (err) {
            that.emit("error", err);
        }
    });
};

p.close = function () {
    if (this.serialPort) {
        this.serialPort.close();
    }
};

module.exports = osc;
