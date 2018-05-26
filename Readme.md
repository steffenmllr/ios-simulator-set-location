# ios-simulator-set-location

> Set the location of the ios simulator via node or the command line


## Install

```
$ npm install ios-simulator-set-location
```

or if you want to use the cli

```
$ npm install ios-simulator-set-location -g
```


## Usage

```js
const setLocation = require('ios-simulator-set-location');

(async () => {
    const lat = 52.5243700; 
    const lat = 13.4105300;

    // set optional device Name, defaults to all running devices
    const deviceName = 'iphone X'; 
    await setLocation(lat, lat, deviceName);

})();
```


## CLI

```
Usage
  $ ios-set-location lat lng -n deviceName

Options
  --name, -n  specify the simulator name (optional, defaults to active running devices)

Examples
  $ ios-set-location 52.5243700 13.4105300
```


## License

MIT © [Steffen Müller](https://steffen.io)
