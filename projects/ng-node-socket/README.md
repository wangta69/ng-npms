# ng-node-socket

Tested for angular10

## Installation
```
npm install ng-node-socket
```

## How to use
### single socket connection
-- app.module.ts
```
import { SocketService } from 'ng-node-socket';
@NgModule({
  providers: [  SocketService ]
})

```
-- app.componet.ts
```
import { SocketService } from 'ng-node-socket';

export class AComponent {
    constructor(protected socket:SocketService) {
        socket.init('http://xxx.xxx.xxx.xxx:yy', {
            withCredentials: false,
            extraHeaders: {
            }
        });

        this.socket.On('connection').subscribe(obj => {
           console.log(obj);
        });

        this.socket.Emit('someThing1');
        this.socket.Emit('someThing1', arg1, ....);
        this.socket.EmitCallback(function(data){console.log(data)}, 'someThing1');
        this.socket.On('someThing2').subscribe(obj => {
            console.log(obj);
		});
    }
}
```

### multi socket connection
-- app.module.ts
```
import { SocketService } from 'ng-node-socket';
@NgModule({
  providers: [  SocketService ]
})

```
-- app.componet.ts
```
import { SocketMultiService } from 'ng-node-socket';

export class AComponent {
    constructor(protected socket:SocketMultiService) {
        socket.init('name1', 'http://xxx.xxx.xxx.xxx:port1', {
            withCredentials: false,
            extraHeaders: {
            }
        });
        socket.init('name2', 'http://xxx.xxx.xxx.xxx:port2', {
            withCredentials: false,
            extraHeaders: {
            }
        });

        this.socket.On('name1', 'connection').subscribe(obj => {
           console.log(obj);
        });

        this.socket.Emit('name1','someThing1');
        this.socket.Emit('name2','someThing1', arg1, ....);
    }
}
```

##### if you got an error 'global is not defined' please put '(window as any).global = window;' to your polyfills.ts or elsewhere what you want
