# angular-gapi
Bower component for loading gapi.client, gapi.auth and Google Cloud endpoints javascript library.


## Install
1. `bower install dinoboff/angular-gapi`
2. Include the `bower_componenents/angular-gapi/service.js` script.
3. Include `https://apis.google.com/js/api.js`
4. Add `dinoboff.gapi` as a module dependency to your app.

`dinoGapiClientLoader` services are now available.

### bower.json:
```javascript
{
  "name": "YourCoolProject",
  "description": "A great thing",
  "version": "0.0.1",
  "homepage": "http://www.example.org",
  "license": "GPL",
  "private": false,
  "dependencies": {
    "dinoboff-angular-gapi": "dinoboff/angular-gapi#0.3.0",
  }
}

```

## Usage

See `example/static/index.html`


## License
BSD


## References

* Google App Engine, https://developers.google.com/appengine/
* AngularJS, http://angularjs.org/
* Cloud Endpoints, https://developers.google.com/appengine/docs/python/endpoints/
