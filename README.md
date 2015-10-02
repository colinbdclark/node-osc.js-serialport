node-osc.js-serialport
======================

osc.js-serialport is a module that adds serial port support to [osc.js](https://github.com/colinbdclark/osc.js) on Node.js.

Examples
--------

### Including osc.js-serialport in your Node.js app

Declare the dependency in <code>package.json</code>:
```json
dependencies: {
    "osc-serialport": "2.0.0"
}
```

Requiring <code>osc-serialport</code> provides a full, self-contained version of the <code>osc</code> namespace, including the <code>osc.SerialPort</code> transport object:

```javascript
var osc = require("osc-serialport");
```

### Connecting to the serial port and listening for OSC messages

```javascript
// Instantiate a new OSC Serial Port.
var serialPort = new osc.SerialPort({
    devicePath: "/dev/cu.usbmodem22131"
});

// Listen for the message event and map the OSC message to the synth.
serialPort.on("message", function (oscMsg) {
    console.log("An OSC message was received!", oscMsg);
});

// Open the port.
serialPort.open();
```
