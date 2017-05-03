# user-config
Easy user application configuration management

[![Build Status](https://travis-ci.org/perry-mitchell/user-config.svg?branch=master)](https://travis-ci.org/perry-mitchell/user-config)

## Usage
When requiring the library, **user-config** returns a function which is used to instantiate a config object that allows getting and setting of config values:

```javascript
const createConfig = require("user-config");

const config = createConfig("my-app");

// items in config are stored in objects and must be serialisable
config.set("some.config.item", 123);
```

Configuration changes should be saved after being changed:

```javascript
const config = require("user-config")("my-app");

config.set("port", 443);
config.save();
```

Values can easily be retrieved from the store, including entire objects:

```javascript
const config = require("user-config")("my-app");

console.log(`Application running on interface ${config.get("listen.ip")}`);
```

### Templating
Outdated configurations can be updated using a templating system. By passing a template to the creation of the config store, old configurations can be merged with the template to ensure the presence of keys and structures:

```javascript
const createConfig = require("user-config");

const TEMPLATE = {
    ip: "0.0.0.0",
    encryption: {
        mode: "aes-gcm"
    }
}
const config = createConfig("my-app", TEMPLATE);
config.get("encryption.mode"); // "aes-gcm"
```

## Browser usage
When being used in the context of a browser, **user-config** knows to use `localStorage` instead of the filesystem. Storage switching is transparent.
