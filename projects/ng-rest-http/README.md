# ng-rest-http
http client module for Angular [ tested for angular6 ]

## Installation
```
npm install ng-rest-http
```

## How to use
#### app.module.ts
```
import { RestHttpClientModule } from 'ng-rest-http'
@NgModule({
	imports: [ RestHttpClientModule ]
})

```
#### app.component.ts
```
import { RestHttpClient } from 'ng-rest-http'

export class AComponent{
	constructor(protected http:RestHttpClient){}

	const api_url = 'http://sample.domain.com/api/what';
	const params = {arg1: 'arg'.....};
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
		'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': '*'
	};

	private get_sample(){
		this.http.get({url: api_url, params, headers}).then((res) => {
			console.log(res)
			// HttpResponse {body, headers: {...}, ok, status, statusText, type, url}
		});
	}

	private post_sample(){
		this.http.post({url: api_url, params, headers}).then((res) => {
			console.log(res)
			// HttpResponse {body, headers: {...}, ok, status, statusText, type, url}
		});
	}

	private filedownload_sample(){
		this.http.filedownload({url: api_url, params, headers}).then((blob) => {
			console.log(blob)
			// this.file.writeFile(this.localDirectory, link.icon, blob, {replace: true})
		});
	}
}
```
[create user service for convenience](doc/create-new-service.md)