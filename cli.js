#!/usr/bin/env node

const meow = require('meow');
const setLocation = require('.');

const cli = meow(
    `
    Usage
      $ ios-set-location lat lng -n deviceName

    Options
      --name, -n  specify the simulator name (optional, defaults to active running devices)

    Examples
      $ ios-set-location 52.5243700 13.4105300

`,
    {
        flags: {
            name: {
                type: 'string',
                alias: 'n'
            }
        }
    }
);

const lat = cli.input[0];
const lng = cli.input[1];
if (!lat || !lng) {
    cli.showHelp();
}

setLocation(lat, lng, cli.flags.name).then((devices) => {
    devices.forEach(device => {
        console.log(`Updated location to ${lat} ${lng} for ${device}`);
    });
}).catch(err => {
    console.log(err.message)
    process.exit(1);
});
