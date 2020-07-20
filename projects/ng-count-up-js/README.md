# ng-count-up-js

## refer
```
ng-countup is a rewritten version of https://github.com/inorganik/
```
## Installation
```
npm install ng-count-up-js
```

## How to use

### imports

#### app.module.ts
```
import { CountUpModule } from 'ng-count-up-js';
@NgModule({
  imports: [CountUpModule]
})
```
#### template.html
```
<span appCountUp [endVal]="myNumber" [duration]='0.1'></span> P</div>

```
