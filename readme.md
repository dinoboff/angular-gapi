# angular-gapi
Bower component for loading gapi.client, gapi.auth and Google Cloud endpoints javascript library.


## Install
1. `bower install dinoboff/angular-gapi`
2. Include the `bower_componenents/angular-gapi/service.js` script.
3. Include `https://apis.google.com/js/api.js`
4. Add `dinoboff.gapi` as a module dependency to your app.

`dinoGapi` and `dinoGapiClientLoader` services are now available.


## Usage

```javascript
function CtrlExample($scope, dinoGapiClientLoader) {
	var gapi;
	
	$scope.backendReady = false;
	$scope.results = [];
	dinoGapiClientLoader({
			name: 'some_api_name',
			version: 'v1',
			root: 'https://some-app.appspot.com/_ah/api'
		},
		function(readyApi){
			gapi = readyApi;
			$scope.results = gapi.client.some.rpc.call();
			$scope.backendReady = true;
			$scope.$apply();
		}
	);
}
```


## License
BSD
