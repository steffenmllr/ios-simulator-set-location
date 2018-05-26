const execa = require('execa');
const { flatten, values, first } = require('lodash');
const electronUtil = require('electron-util/node');
const path = require('path');

const bin = path.join(electronUtil.fixPathForAsarUnpack(__dirname), 'simulator-set-location');

const getRunningDevices = async () => {
    try {
        const getDevices = await execa('xcrun', ['simctl', 'list', '-j', 'devices']);
        const { devices } = JSON.parse(getDevices.stdout);
        const flatDevices = flatten(values(devices));
        return flatDevices.filter(d => d.state === 'Booted');
    } catch (e) {
        throw new Error('Could not get running devices - make sure you can have `xcrun` in your path');
    }
};

const setLocation = async (lat, lng, name) => {
    const devices = await getRunningDevices();
    if (devices.length === 0) {
        throw new Error('There are not devices running');
    }
    const deviceIds = devices.map(d => d.udid);
    const setLoc = await execa(bin, [lat, lng, deviceIds.join(',')]);
    if (setLoc.stdout === 'OK') {
        return deviceIds;
    } else {
        throw new Error('Could not set location')
    }
};

module.exports = setLocation;
