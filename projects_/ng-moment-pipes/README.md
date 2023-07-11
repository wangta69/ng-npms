# ng-moment-pipes
Tested for angular8

## Installation
```
npm install ng-moment-pipes
```
## How to use

### imports
``` app.module.ts
import { MomentPipesModule } from 'ng-moment-pipes';
@NgModule({
    imports: [ MomentPipesModule ]
})
```

###
``` app.html
{{datetime | moment : 'YYYY-MM-DD HH:mm'}} <!-- datetime is unixtime like 1592345678 -->
{{datetime | momentUnix : 'YYYY-MM-DD HH:mm'}}<!-- datetime is normal like 1592345678 -->
{{datetime | momentLocal : 'YYYY-MM-DD HH:mm'}}<!-- datetime is normal like 1592345678 -->
{{msg.created_at | momentRelative}}<!--out put will be a hour ago like that -->
```
