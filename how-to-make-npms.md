## 신규 프로젝트 생성
	1. ng new ProjectName
	2. cd ProjectName
##  라이브러리 생성 (여기서 부터)
3. ng generate library LibraryName --prefix=enl			
	기존 프로젝트는 아래부터 진행			
## 라이브러리 빌드
4. ng build --prod LibraryName		
현재 프로젝트의 module에서 import 할 수 있음 (projects 디렉토리에서 실행)
	above angular 7 remove --prod			
	여기 까지 마쳤으면 신규프로젝트에서 Library를 import 하여 테스트할 수 있다.			


## 내부 실서버 테스트용	5.1. cd dist/LibraryName			
	5.2. npm pack			
	5.3.. 생성된 .tgz 파일을 작업중인 실 프로젝트 에서 npm i path to tgz 하여 처리하면된다.			


## npm publish	(기존 것 처리)
"6.1. npm init (projects/만들려는 프로젝트 폴더/ 에서 해주는 것이 두번 손 안감) (첫 1회 이후에는 하지 않아도 됨)
6.1.1. ng build --prod LibraryName (projects/  프로젝트 root에서 실행)
6.2. cd dist/LibraryName
6.3. npm publish"			

	"cd ./projects\ng-rest-http
npm init
cd C:\Users\Administrator\project\npm\ng-npms
ng build --prod ng-rest-http
cd C:\Users\Administrator\project\npm\ng-npms\dist/ng-rest-http
npm publish"			

	"ng build my-lib --prod
cd dist/my-lib
npm publish"			

	npm login	<!- 1회 만 처리 npm publish 전		

ng build my-lib	<!-- projects 디렉토리에서 실행			
import { myExport } from 'my-lib';				